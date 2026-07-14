from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.company import Company
from app.database.database import Base, engine
from app.models.user import User 
from app.models.company import Company
from app.routes.user import router as user_router
from app.models.chat import Chat
from app.schemas.message import MessageCreate
from app.routes.company import router as company_router
from app.routes.chat import router as chat_router

from app.models.project import Project
from app.routes.project import router as project_router
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Aether API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(project_router)
app.include_router(user_router)
app.include_router(company_router)
app.include_router(chat_router)

@app.get("/")
def home():
    return {"message": "Welcome to Aether"}
