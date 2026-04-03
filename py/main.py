from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routes import router
from app.database import engine, Base
import app.models
app = FastAPI()
app.include_router(router)

app.mount("/static", StaticFiles(directory="app/templates", html=True), name="templates")

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
