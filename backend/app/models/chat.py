import sqlalchemy
from sqlalchemy.orm import relationship
from app.database.database import Base

class Chat(Base):
    __tablename__ = "chats"

    id = sqlalchemy.Column(
        sqlalchemy.Integer,
        primary_key=True,
        index=True
    )
    project_id = sqlalchemy.Column(
        sqlalchemy.Integer,
        sqlalchemy.ForeignKey("projects.id")
    )
    messages = relationship(
        "Message",
        back_populates="chat",
        cascade="all,"
    )