from fastapi import APIRouter, Depends, FastAPI

from backend.infrastructure.rest.user import user_routes
from backend.infrastructure.security import JWTKey

api_route = APIRouter(prefix="/api")
api_route.include_router(user_routes, dependencies=[Depends(JWTKey(name="x-api-key"))])


def create_app():
    app = FastAPI()
    app.include_router(api_route, tags=["api"])
    return app
