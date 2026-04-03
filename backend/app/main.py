from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .api import production
from .config import settings

# Création automatique des tables au démarrage
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Herbier Digital API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(production.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "database": "MySQL Connected"}
