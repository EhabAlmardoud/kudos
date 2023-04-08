from fastapi import APIRouter

import uuid
from app_db.db_helpers import get_db_connection


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

conn = get_db_connection()


@router.post("/users")
async def post_new_user(user_name: str):
    with conn.cursor() as curs:
        new_user_id = uuid.uuid4()
        curs.execute(
            """INSERT INTO users (id, name) VALUES (%s, %s)""",
            (str(new_user_id), user_name),
        )
        conn.commit()
