from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.crud import match as crud_match
from app.schemas.match import CreateMatch, ResponseMatch

router = APIRouter()

@router.post("/new_match", response_model=ResponseMatch)
async def new_match(match: CreateMatch, db: AsyncSession = Depends(get_db)):
    return await crud_match.create_match(db=db, match=match)

@router.get("/get_match/{match_id}", response_model=ResponseMatch)
async def get_match(match_id: int, db: AsyncSession = Depends(get_db)):
    result = await crud_match.get_match(db=db, id=match_id)
    if not result:
        raise HTTPException(status_code=404, detail="Match non trouvé")
    return result

@router.get("get_match/", response_model=list[ResponseMatch])
async def get_all_match(db: AsyncSession = Depends(get_db)):
    return await crud_match.get_all_match(db=db)

@router.get("/get_match_joueur/{id_joueur}", response_model=list[ResponseMatch])
async def get_match_joueur(id_joueur: int, db: AsyncSession = Depends(get_db)):
    return await crud_match.get_match_joueur(db=db, idJoueur=id_joueur)  

@router.get("/get_recent_match/{nb_match}", response_model=list[ResponseMatch])
async def get_recent_match(nb_match: int, db: AsyncSession = Depends(get_db)):
    return await crud_match.get_recent_match(db=db, nb=nb_match)

