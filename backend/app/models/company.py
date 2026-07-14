import sqlalchemy
from sqlalchemy.orm import relationship
from app.database.database import Base

class Company(Base):
    __tablename__ = "companies"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, index=True)
    name= sqlalchemy.Column(sqlalchemy.String, nullable=False)
    cnpj = sqlalchemy.Column(sqlalchemy.String, unique=True)
    users = relationship(
        "User",
         back_populates="company")
    projects = relationship(
    "Project",
    back_populates="company"
    )

