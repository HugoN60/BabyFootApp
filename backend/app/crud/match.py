from sqlalchemy import select, desc, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.match import CreateMatch
from app.models.match import Match
from app.crud.user import get_joueur

async def create_match(db: AsyncSession, match: CreateMatch) -> Match:
    mdict = match.model_dump()
    db_match = Match(
        jr1=mdict["jr1"],
        jr2=mdict["jr2"],
        jb1=mdict["jb1"],
        jb2=mdict["jb2"],
        scoreRouge=mdict["scoreRouge"],
        scoreBleu=mdict["scoreBleu"])
    
    db.add(db_match)
    await db.commit()
    await db.refresh(db_match)
    return db_match

async def get_match(db: AsyncSession, id: int) -> Match | None:
    """
    INPUT: id -> id du match demandé
    OUTPUT: Match -> match correspondant a l'id
    """
    result = await db.execute(select(Match).where(Match.id == id))
    return result.scalar_one_or_none()

async def get_all_match(db: AsyncSession):
    """
    INPUT: rien
    OUTPUT: Match[] etant tout les matchs triés du plus recent au plus vieux
    """
    result = await db.execute(select(Match).order_by(Match.date))
    return result.scalars().all()

async def get_match_joueur(db: AsyncSession, idJoueur: int):
    """
    INPUT: idJoueur id d'un joueur
    OUTPUT: Match[] -> matchs joués par les joueur idJoueur
    """
    joueur = await get_joueur(db=db, id=idJoueur)
    if joueur == None:
        return None
    else:
        result = await db.execute(select(Match).where(or_(
                                                Match.jr1==idJoueur,
                                                Match.jr2==idJoueur,
                                                Match.jb1==idJoueur,
                                                Match.jb2==idJoueur)))
        return result.scalars().all()


async def get_recent_match(db: AsyncSession, nb: int):
    """
    INPUT: nb -> nombre de matchs demandés
    OUTPUT: Match[] -> Liste contenant les nb matchs plus récents
    """
    result = await db.execute(select(Match).order_by(Match.date)).limit(nb)
    return result.scalars().all()


    

