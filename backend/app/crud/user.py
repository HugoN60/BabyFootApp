from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password
from app.models.user import Joueur
from app.schemas.user import CreateJoueur


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
    result = await db.execute(select(Joueur).where(Joueur.id == id))
    return result.scalar_one_or_none()
