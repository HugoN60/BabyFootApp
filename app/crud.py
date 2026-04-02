from passlib.context import CryptContext
from sqlalchemy import select, delete 
from app.models import Joueur, Match
from app.schemas import CreateJoueur

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(plain_password: str) -> str:
    return pwd_context.hash(plain_password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

async def create_joueur(db: AsyncSession, joueur: CreateJoueur) -> Joueur:
    jdict = joueur.model_dump()
    joueur = Joueur(name=jdict["name"],
                    email=jdict["email"],
                    hashed_password=hash_password(jdict["password"]), 
                    elo=500)
    db.add(joueur)
    await db.commit()
    await db.refresh(joueur)
    return joueur

async def get_joueur(db: AsyncSession, id: int) -> Joueur:
    result = await db.execute(select(Joueur).where(id == Joueur.id))
    return result.scalar_one_or_none()

async def create_match(jr1: int, jr2, jb1: int, jb2, scoreBleu: int, scoreRouge: int) -> Match:
    match = Match(joueur_rouge1=jr1,
                  joueur_rouge2=jr2,
                  joueur_bleu1=jb1,
                  joueur_bleu2=jb2,
                  scoreRouge=scoreRouge,
                  scoreBleu=scoreBleu)
    db.add(match)
    await db.commit()
    await db.refresh(match)
    return match
