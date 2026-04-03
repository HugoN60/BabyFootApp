from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.crud import user as crud_user
from app.schemas.user import CreateJoueur

router = APIRouter()


@router.get("/")
async def index():
    return RedirectResponse(url="/static/main.html")


@router.post("/new_joueur")
async def new_joueur(joueur: CreateJoueur, db: AsyncSession = Depends(get_db)):
    print(joueur.name)
    return await crud_user.create_joueur(db, joueur)


@router.post("/get_joueur/{joueur_id}")
async def get_joueur(joueur_id: int, db: AsyncSession = Depends(get_db)):
    joueur = await crud_user.get_joueur(db=db, id=joueur_id)
    if not joueur:
        raise HTTPException(status_code=404, detail="Joueur non trouvé")
    return joueur
