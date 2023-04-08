import psycopg2
from psycopg2.extras import RealDictCursor

from config import settings


def get_db_connection():
    DATABASE_URI = f"postgresql://postgres:{settings.postgres_pass}@{settings.postgres_url}/{settings.postgres_db}"
    conn = psycopg2.connect(DATABASE_URI, cursor_factory=RealDictCursor)
    return conn
