from fastapi import APIRouter

from pydantic import BaseModel

import uuid
import datetime
from app_db.db_helpers import get_db_connection


router = APIRouter(
    prefix="/kudos",
    tags=["items"],
    responses={404: {"description": "Not found"}},
)

conn = get_db_connection()


@router.get("/")
async def get_all_kudos(room_id: str):
    with conn.cursor() as curs:
        curs.execute("SELECT * FROM kudos WHERE kudos.room_id = %s", (room_id,))
        rooms = curs.fetchall()
        return rooms


class CreateNewKudoBody(BaseModel):
    public_link_id: str
    sender: str
    receiver: str
    message: str


@router.put("/")
async def post_new_kudo(kudo: CreateNewKudoBody):
    with conn.cursor() as curs:
        curs.execute(
            "SELECT id FROM kudosRooms WHERE kudosRooms.public_link_id = %s",
            (kudo.public_link_id,),
        )
        room = curs.fetchone()
        room_obj = dict(room)

        new_kudo_id = uuid.uuid4()
        current_datetime = datetime.datetime.now()
        curs.execute(
            """INSERT INTO kudos (id, room_id, sender, receiver, message, is_marked_as_seen, created_at) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)""",
            (
                str(new_kudo_id),
                room_obj["id"],
                kudo.sender,
                kudo.receiver,
                kudo.message,
                False,
                current_datetime,
            ),
        )
        conn.commit()


class CreatePatchKudoMarkedBody(BaseModel):
    kudo_id: str
    is_marked_as_seen: str


@router.patch(":marked")
async def patch_mark_kudo(body: CreatePatchKudoMarkedBody):
    with conn.cursor() as curs:
        curs.execute(
            "UPDATE kudos SET is_marked_as_seen = %s WHERE id = %s",
            (body.is_marked_as_seen, body.kudo_id),
        )

        conn.commit()
