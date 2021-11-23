from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI, Request, APIRouter, Response, status

from backend.infrastructure.rest.user import user_routes


api_route = APIRouter(prefix="/api")
api_route.include_router(user_routes)


@api_route.get("/")
def hello(request: Request):
    return Response(content="Hello world", status_code=status.HTTP_200_OK)


class Filter(BaseModel):
    age__lt: Optional[int]
    date_gt: Optional[int]


def create_app():
    app = FastAPI()
    app.include_router(api_route, tags=["api"])
    return app
