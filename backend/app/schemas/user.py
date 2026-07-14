from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    company_id: Optional[int] = None


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    company_id: Optional[int] = None

    class Config:
        from_attributes = True
class UserLogin(BaseModel):
    email:EmailStr
    password: str