import secrets
from typing import Optional

from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    MONGO_USERNAME: str
    MONGO_PASSWORD: str
    MONGO_SERVER: str = "db"
    MONGO_SERVER_PORT: int = 27017
    APP_DATABASE: str

    app_secrets: str = Field(env="secrets", default=secrets.token_urlsafe(32))

    JWT_EXPIRE_TIMEOUT: Optional[str] = 30
    JWT_ALGORITHM: str = "HS256"
    JWT_SECRET_KEY: str

    SERVER_HOST: str = "http://localhost"

    def mongo_config(self):
        return {
            "host": self.MONGO_SERVER,
            "port": self.MONGO_SERVER_PORT,
            "username": self.MONGO_USERNAME,
            "password": self.MONGO_PASSWORD,
            "authSource": "admin",
            "app_db": self.APP_DATABASE,
        }


settings = Settings()
