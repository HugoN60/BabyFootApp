from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import RedirectResponse
from app.schemas import CreateJoueur
from app.database import get_db
from app import crud
router = APIRouter()

@router.get("/")
async def index():
    return RedirectResponse(url="/static/main.html")

@router.post("/new_joueur")
async def new_joueur(joueur: CreateJoueur, db: AsyncSession = Depends(get_db)):
    print(joueur.name)
    return await crud.create_joueur(db, joueur)

@router.post("/get_joueur/{joueur_id}")
async def get_joueur(joueur_id: int, db: AsyncSession = Depends(get_db)):
    joueur = await crud.get_joueur(id=joueur_id, db=db)
    if not joueur:
        return HTTPException(status_code=404, detail="Joueur non trouvé")
    return joueur
