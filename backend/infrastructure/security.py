import datetime

from jose import jwt

from backend.infrastructure.config import settings


def create_token(claims: dict):
    if "iss" not in claims:
        claims["iss"] = settings.SERVER_HOST

    if "exp" not in claims:
        claims["exp"] = settings.JWT_EXPIRE_TIMEOUT

    claims["iat"] = datetime.datetime.now()

    return jwt.encode(claims, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
