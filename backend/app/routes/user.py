from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.security import hash_password
from app.database.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserOut
from app.core.security import verify_password
from app.schemas.user import UserLogin
from app.services.auth_service import authenticate_user

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        company_id=user.company_id,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.get("/", response_model=list[UserOut])
def list_users(company_id: int | None = None, db: Session = Depends(get_db)):
    query = db.query(User)
    if company_id is not None:
        query = query.filter(User.company_id == company_id)
    return query.all()


@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    token = authenticate_user(
        db,
        user.email,
        user.password
    )
    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    return{
        "access_token": token,
        "token_type": "bearer"
    }