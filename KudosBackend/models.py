from pydantic import BaseModel
from datetime import datetime


class User(BaseModel):
    id: str
    name: str


class Person(BaseModel):
    id: str
    name: str
    user: str


class KudosRoom(BaseModel):
    id: str
    name: str
    user: str
    public_link_id: str
    created_at: str


class Kudo(BaseModel):
    id: str
    room_id: str
    sender: str
    receiver: str
    message: str
    is_marked_as_seen: bool
    created_at: datetime
