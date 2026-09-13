from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import datetime
from typing import Optional

class CreateMatch(BaseModel):
    jr1: int
    jr2: Optional[int] = None

    jb1: int
    jb2: Optional[int] = None

    scoreRouge: int
    scoreBleu: int

class ResponseMatch(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    date: datetime

    jr1: int = Field(validation_alias="jrouge1")
    jr2: Optional[int] = Field(default=None, validation_alias="jrouge2")

    jb1: int = Field(validation_alias="jbleu1")
    jb2: Optional[int] = Field(default=None, validation_alias="jbleu2")

    scoreRouge: int
    scoreBleu: int