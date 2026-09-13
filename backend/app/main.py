from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

import app.models  # noqa: F401 — enregistre les modèles pour create_all
from app.api.routes import auth, items, users, match
from app.db.base import Base
from app.db.session import engine

from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()
app.include_router(users.router)
app.include_router(match.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(items.router, prefix="/items", tags=["items"])

templates_dir = Path(__file__).resolve().parent.parent.parent / "frontend"
app.mount("/static", StaticFiles(directory=str(templates_dir), html=True), name="frontend")

app.add_middleware(
    SessionMiddleware,
    secret_key="CHANGE-MOI-EN-UNE-VRAIE-CLE-SECRETE-LONGUE",  # à mettre dans une variable d'env !
    session_cookie="babyfoot_session",
    max_age=60 * 60 * 24 * 7,  # 7 jours
    same_site="lax",
    https_only=False,  # True en production (HTTPS)
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
