from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
import sqlalchemy
from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    company_id = sqlalchemy.Column(
        sqlalchemy.Integer,
        sqlalchemy.ForeignKey("companies.id")
    )
    company = relationship(
        "Company",
        back_populates="users"
    )
    messages = relationship(
        "Message",
        back_populates="user"
    )
