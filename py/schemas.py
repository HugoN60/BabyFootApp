from pydantic import BaseModel, EmailStr

class CreateJoueur(BaseModel):
    name: str
    email: EmailStr
    password: str
    