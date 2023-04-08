from fastapi import APIRouter

import uuid
from app_db.db_helpers import get_db_connection


router = APIRouter(
    prefix="/person",
    tags=["person"],
    responses={404: {"description": "Not found"}},
)

conn = get_db_connection()


@router.post("/")
async def post_new_person(person_name: str):
    with conn.cursor() as curs:
        new_person_id = uuid.uuid4()
        curs.execute(
            """INSERT INTO person (id, name) VALUES (%s, %s)""",
            (str(new_person_id), person_name),
        )
        conn.commit()


@router.get("/")
async def get_all_people(user_id: str):
    with conn.cursor() as curs:
        curs.execute("SELECT * FROM person WHERE person.user_id = %s", (user_id,))
        people = curs.fetchall()
        return people
