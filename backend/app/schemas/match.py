from pydantic import BaseModel, EmailStr

class CreateMatch(BaseModel):
    jr1: int
    jr1: int

    jb1: int
    jb2: int

    scoreRouge: int
    scoreBleu: int

class ResponseMatch(BaseModel):
    id: int 
    date: datetime
    jr1: int
    jr1: int

    jb1: int
    jb2: int

    scoreRouge: int
    scoreBleu: int
