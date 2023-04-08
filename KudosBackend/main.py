from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


import uuid
import datetime
from app_db.db_helpers import get_db_connection

from endpoints import kudso, rooms, users, person


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(kudso.router)
app.include_router(rooms.router)
app.include_router(users.router)
app.include_router(person.router)


conn = get_db_connection()


@app.get("/")
async def root():
    return {"message": "Server is live!"}
