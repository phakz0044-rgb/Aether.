from pydantic import BaseModel
class MessageCreate(BaseModel):
    chat_id: int
    content: str
class MessageOut(BaseModel):
    id:int
    role:str
    content:str
    class Config:
        from_attributes = True
