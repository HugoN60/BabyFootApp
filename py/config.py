from pydantic_settings import BaseSettings
from pathlib import Path 

ENV_FILE = Path(__file__).parent.parent / ".env"

class Settings(BaseSettings):
    database_url: str
    secret_key: str = "dev"

    class Config:
        env_file = str(ENV_FILE)

settings = Settings()