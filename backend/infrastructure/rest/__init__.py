from .requests import *  # noqa
from .user import user_routes
from .venue import venue_route
from .events import events_route

from fastapi import APIRouter, Depends
from backend.infrastructure.security import JWTKey


api_route = APIRouter(prefix="/api", dependencies=[Depends(JWTKey(name="x-api-key"))])
api_route.include_router(user_routes, tags=["users"])
api_route.include_router(venue_route, tags=["venue"])
api_route.include_router(events_route, tags=["events"])
