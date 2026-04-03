from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

import app.models  # noqa: F401 — enregistre les modèles pour create_all
from app.api.routes import auth, items, users
from app.db.base import Base
from app.db.session import engine

app = FastAPI()
app.include_router(users.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(items.router, prefix="/items", tags=["items"])

templates_dir = Path(__file__).resolve().parent / "templates"
app.mount("/static", StaticFiles(directory=str(templates_dir), html=True), name="templates")


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
