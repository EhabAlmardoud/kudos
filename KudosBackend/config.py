from pydantic import BaseSettings


class Settings(BaseSettings):
    postgres_url: str
    postgres_pass: str
    postgres_db: str

    class Config:
        env_file = ".env"


settings = Settings()
