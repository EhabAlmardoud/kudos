from fastapi import APIRouter

import uuid
import datetime
from app_db.db_helpers import get_db_connection


router = APIRouter(
    prefix="/rooms",
    tags=["rooms"],
    responses={404: {"description": "Not found"}},
)

conn = get_db_connection()


@router.get("/")
async def get_all_rooms(user_id: str):
    with conn.cursor() as curs:
        curs.execute(
            "SELECT * FROM kudosRooms WHERE kudosRooms.user_id = %s", (user_id,)
        )
        rooms = curs.fetchall()
        return rooms


@router.post("/")
async def post_new_room(name: str, user_id: str):
    with conn.cursor() as curs:
        new_room_id = uuid.uuid4()
        current_datetime = datetime.datetime.now()
        public_link_id = uuid.uuid4()
        curs.execute(
            """INSERT INTO kudosRooms (id ,name, user_id, public_link_id, created_at) VALUES (%s, %s, %s, %s, %s)""",
            (
                str(new_room_id),
                name,
                user_id,
                str(public_link_id),
                current_datetime,
            ),
        )
        conn.commit()
