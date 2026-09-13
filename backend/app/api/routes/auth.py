from fastapi import APIRouter, Request, HTTPException, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.user import LoginJoueur
from app.crud import user as crud_user
from app.api.deps import get_db

router = APIRouter()


@router.post("/login")
async def login(credentials: LoginJoueur, request: Request, db: AsyncSession = Depends(get_db)):
    joueur = await crud_user.authenticate_joueur(db, credentials.email, credentials.password)

    if joueur is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
        )

    request.session["joueur_id"] = joueur.id

    return {"id": joueur.id, "name": joueur.name, "email": joueur.email}


@router.get("/me")
async def me(request: Request, db: AsyncSession = Depends(get_db)):
    current_joueur = await crud_user.get_current_joueur(request, db)

    classement = await crud_user.get_joueur_classement(current_joueur.id, db)

    winrate = (
        current_joueur.match_gagne / current_joueur.match_joues * 100
        if current_joueur.match_joues > 0
        else 0
    )

    return {
        "id": current_joueur.id,
        "name": current_joueur.name,
        "email": current_joueur.email,
        "elo": current_joueur.elo,
        "winrate": round(winrate),
        "classement": classement,
        "match_gagnes": current_joueur.match_gagne,
        "match_joues": current_joueur.match_joues
    }
@router.post("/logout")
async def logout(request: Request):
    request.session.clear()
    return {"message": "Déconnecté"}