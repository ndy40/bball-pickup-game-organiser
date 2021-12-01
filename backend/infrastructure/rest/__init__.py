from .requests import *  # noqa
from .user import *  # noqa
from .venue import * #noqa

from fastapi import Depends
from backend.infrastructure.security import JWTKey


api_route = APIRouter(prefix="/api")
api_route.include_router(user_routes, dependencies=[Depends(JWTKey(name="x-api-key"))])
api_route.include_router(venue_route, tags=['venue'])

