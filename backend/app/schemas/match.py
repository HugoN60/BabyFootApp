from pydantic import BaseModel, EmailStr

class CreateMatch(BaseModel):
    jr1: int
    jr1: int

    jb1: int
    jb2: int

    scoreRouge: int
    scoreBleu: int
