from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "mysql+pymysql://herbier_user:herbier_pass@mysql:3306/herbier_db"
    CORS_ORIGINS: List[str] = ["http://localhost:8080", "http://localhost:5173"]
    
    class Config:
        env_file = ".env"

settings = Settings()
