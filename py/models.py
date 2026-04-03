from sqlalchemy import String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base



class Match(Base):
    __tablename__ = "match"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    jrouge1 : Mapped[int] = mapped_column(Integer, ForeignKey("joueur.id"))
    jrouge2 : Mapped[int] = mapped_column(Integer, ForeignKey("joueur.id"), nullable=True)
    jbleu1 : Mapped[int] = mapped_column(Integer, ForeignKey("joueur.id"))
    jbleu2 : Mapped[int] = mapped_column(Integer, ForeignKey("joueur.id"), nullable=True)
    scoreRouge : Mapped[int] = mapped_column(Integer)
    scoreBleu : Mapped[int] = mapped_column(Integer)

    joueur_rouge1 : Mapped[Joueur] = relationship(foreign_keys=[jrouge1])
    joueur_rouge2 : Mapped[Joueur] = relationship(foreign_keys=[jrouge2])
    joueur_bleu1 : Mapped[Joueur] = relationship(foreign_keys=[jbleu1])
    joueur_bleu2 : Mapped[Joueur] = relationship(foreign_keys=[jbleu2])


class Joueur(Base):
    __tablename__ = "joueur"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    elo : Mapped[int] = mapped_column(Integer, nullable=False)
