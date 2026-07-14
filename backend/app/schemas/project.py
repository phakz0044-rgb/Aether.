from pydantic import BaseModel

class ProjectCreate(BaseModel):
    name:str
    description:str
    company_id:int
class ProjectOut(BaseModel):
    id:int
    name:str
    description:str
    company_id:int
    class Config:
        from_attributes = True