from typing import Optional
from pydantic import BaseModel
from app.schemas.message import MessageOut


class ChatCreate(BaseModel):
    project_id: Optional[int] = None


class ChatOut(BaseModel):
    id: int
    project_id: Optional[int] = None

    class Config:
        from_attributes = True


class ChatWithMessages(ChatOut):
    messages: list[MessageOut] = []
