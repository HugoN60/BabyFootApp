from sqlalchemy import select, desc, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password
from app.models.user import Joueur
from app.schemas.user import CreateJoueur

from app.core.security import verify_password

from fastapi import HTTPException, status, Depends, Request


async def create_joueur(db: AsyncSession, joueur: CreateJoueur) -> Joueur:
    jdict = joueur.model_dump()
    db_joueur = Joueur(
        name=jdict["name"],
        email=jdict["email"],
        hashed_password=hash_password(jdict["password"]),
        elo=500,
    )
    db.add(db_joueur)
    await db.commit()
    await db.refresh(db_joueur)
    return db_joueur


async def get_joueur(db: AsyncSession, id: int) -> Joueur | None:
    """
    INPUT: id -> id du joueur demandé
    OUTPUT: Joueur -> joueur correspondant a l'id
    """
    result = await db.execute(select(Joueur).where(Joueur.id == id))
    return result.scalar_one_or_none()

async def get_all_joueur(db: AsyncSession):
    result = await db.execute(select(Joueur))
    return result.scalars().all()

async def get_rank_joueur(db: AsyncSession, nb: int):
    result = await db.execute(select(Joueur).order_by(Joueur.elo.desc()).limit(nb))
    return result.scalars().all()


async def authenticate_joueur(db: AsyncSession, email: str, password: str):

    result = await db.execute(select(Joueur).where(Joueur.email == email))
    joueur = result.scalar_one_or_none()
    print("in crud")
    if joueur is None:
        return None
 
    if not verify_password(password, joueur.hashed_password):
        print("password not okay")
        return None
 
    return joueur

async def get_current_joueur(request: Request, db: AsyncSession):
    """
    Lit le cookie de session, retrouve le joueur en base.
    Lève 401 si pas de session ou session invalide.
    """
    joueur_id = request.session.get("joueur_id")
    if joueur_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Non connecté")
 
    result = await db.execute(select(Joueur).where(Joueur.id == joueur_id))
    joueur = result.scalar_one_or_none()
 
    if joueur is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session invalide")
 
    return joueur


async def get_joueur_classement(id: int, db: AsyncSession):
    joueur = await db.get(Joueur, id)

    if joueur is None:
        return None

    classement = await db.scalar(
        select(func.count())
        .select_from(Joueur)
        .where(Joueur.elo > joueur.elo)
    )

    return classement + 1