import datetime
import re

from fastapi import Request, HTTPException, status
from fastapi.security import APIKeyHeader
from jose import jwt, JWTError

from backend.infrastructure.config import settings

JWT_AUDIENCE_EVENTS = "Events API"


def create_token(claims: dict):

    exp_time = datetime.datetime.now() + datetime.timedelta(
        hours=int(settings.JWT_EXPIRE_TIMEOUT)
    )

    claims.update(
        {
            "iss": settings.SERVER_HOST,
            "exp": exp_time,
            "iat": datetime.datetime.now(),
        }
    )

    return jwt.encode(claims, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def decode_jwt(token: str):
    return jwt.decode(
        token=token,
        key=settings.JWT_SECRET_KEY,
        algorithms=settings.JWT_ALGORITHM,
        audience=JWT_AUDIENCE_EVENTS,
    )


class JWTKey(APIKeyHeader):
    def __init__(self, name: str, auto_error: bool = True):
        super(JWTKey, self).__init__(name=name, auto_error=auto_error)

    async def __call__(self, request: Request):
        try:
            for route in settings.INSECURE_ROUTES:
                method, pattern = route.split(":")
                if method.lower() == request.method.lower() and re.search(
                    str(pattern), request.url.path
                ):
                    return

            return decode_jwt(await super(JWTKey, self).__call__(request=request))
        except JWTError as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token"
            )
