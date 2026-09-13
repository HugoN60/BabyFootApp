from sqlalchemy import select, desc, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.match import CreateMatch
from app.models.match import Match
from app.models.user import Joueur
from app.crud.user import get_joueur

async def create_match(db: AsyncSession, match: CreateMatch) -> Match:
    mdict = match.model_dump()

    # Récupération des joueurs
    joueur_r1 = await db.get(Joueur, mdict["jr1"])
    joueur_b1 = await db.get(Joueur, mdict["jb1"])

    joueur_r2 = None
    joueur_b2 = None

    if mdict["jr2"] is not None and mdict["jb2"] is not None:
        joueur_r2 = await db.get(Joueur, mdict["jr2"])
        joueur_b2 = await db.get(Joueur, mdict["jb2"])

    # Création du match
    db_match = Match(
        jrouge1=mdict["jr1"],
        jrouge2=mdict["jr2"],
        jbleu1=mdict["jb1"],
        jbleu2=mdict["jb2"],
        scoreRouge=mdict["scoreRouge"],
        scoreBleu=mdict["scoreBleu"]
    )

    
    # Calcul ELO
    if joueur_r2 is not None and joueur_b2 is not None:
        delta_r1, delta_r2, delta_b1, delta_b2 = calculate_elo_2v2(
            joueur_r1.elo,
            joueur_r2.elo,
            joueur_b1.elo,
            joueur_b2.elo,
            mdict["scoreRouge"],
            mdict["scoreBleu"]
        )

        joueur_r1.elo += delta_r1
        joueur_r2.elo += delta_r2
        joueur_b1.elo += delta_b1
        joueur_b2.elo += delta_b2


        #Ajout match gagne
        joueur_r1.match_joues += 1
        joueur_r2.match_joues += 1
        joueur_b1.match_joues += 1
        joueur_b2.match_joues += 1
    
        if mdict["scoreRouge"] > mdict["scoreBleu"]:
            joueur_r1.match_gagne += 1
            joueur_r2.match_gagne += 1
        elif mdict["scoreRouge"] < mdict["scoreBleu"]:
            joueur_b1.match_gagne += 1
            joueur_b2.match_gagne += 1
    

    else:
        delta_r1, delta_b1 = calculate_elo_1v1(
            joueur_r1.elo,
            joueur_b1.elo,
            mdict["scoreRouge"],
            mdict["scoreBleu"]
        )

        joueur_r1.elo += delta_r1
        joueur_b1.elo += delta_b1


        #Ajout match gagne
        joueur_r1.match_joues += 1
        joueur_b1.match_joues += 1
    
        if mdict["scoreRouge"] > mdict["scoreBleu"]:
            joueur_r1.match_gagne += 1
        elif mdict["scoreRouge"] < mdict["scoreBleu"]:
            joueur_b1.match_gagne += 1
        




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


    
#===============
import math


def calculate_elo_2v2(
    elo_r1: float,
    elo_r2: float,
    elo_b1: float,
    elo_b2: float,
    score_r: int,
    score_b: int,
    k: int = 32
):
    elo_red = (elo_r1 + elo_r2) / 2
    elo_blue = (elo_b1 + elo_b2) / 2

    result_red = (score_r > score_b) - (score_r < score_b)
    result_red = result_red / 2 + 0.5

    expected_red = 1 / (
        1 + math.pow(10, (elo_blue - elo_red) / 400)
    )

    margin = 1 + math.log(abs(score_r - score_b) + 1)

    delta_red = k * margin * (result_red - expected_red)

    return (
        round(delta_red),
        round(delta_red),
        round(-delta_red),
        round(-delta_red)
    )

def calculate_elo_1v1(
    elo_a: float,
    elo_b: float,
    score_a: int,
    score_b: int,
    k: int = 32
):
    result_a = (score_a > score_b) - (score_a < score_b)
    result_a = result_a / 2 + 0.5

    expected_a = 1 / (
        1 + math.pow(10, (elo_b - elo_a) / 400)
    )

    margin = 1 + math.log(abs(score_a - score_b) + 1)

    delta_a = k * margin * (result_a - expected_a)

    return round(delta_a), round(-delta_a)