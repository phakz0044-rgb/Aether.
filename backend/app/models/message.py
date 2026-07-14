import sqlalchemy
from sqlalchemy.orm import relationship
from app.database.database import Base

class Message(Base):
    __tablename__ = "messages"
    id = sqlalchemy.Column(
        sqlalchemy.Integer,
        primary_key=True,
        index=True
    )
    role = sqlalchemy.Column(sqlalchemy.String)
    content = sqlalchemy.Column(sqlalchemy.Text)
    chat_id = sqlalchemy.Column(
        sqlalchemy.Integer,
        sqlalchemy.ForeignKey("chats.id")
    )
    user_id = sqlalchemy.Column(
        sqlalchemy.Integer,
        sqlalchemy.ForeignKey("users.id")
    )
    chat = relationship(
        "Chat",
        back_populates="messages"
    )
    user = relationship(
        "User",
        back_populates="messages"
    )