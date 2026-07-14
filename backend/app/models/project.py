import sqlalchemy
from sqlalchemy.orm import relationship
from app.database.database import Base

class Project(Base):
    __tablename__ = "projects"
    id= sqlalchemy.Column(
        sqlalchemy.Integer,
        primary_key=True,
        index = True
    )
    name = sqlalchemy.Column(
        sqlalchemy.String,
        nullable=False
    )
    description = sqlalchemy.Column(
        sqlalchemy.Text
    )
    company_id = sqlalchemy.Column(
        sqlalchemy.Integer,
        sqlalchemy.ForeignKey("companies.id")
    )
    company = relationship(
        "Company",
        back_populates="projects"
    )
    chat = relationship(
        "Chat",
        uselist = False,
    )