from typing import Dict, Optional
from pydantic import BaseModel
from fastapi import FastAPI, Query, Request, APIRouter, Response, status


api_route = APIRouter(prefix='/api')


@api_route.get('/')
def hello(request: Request):
    return Response(content="Hello world", status_code=status.HTTP_200_OK)


class Filter(BaseModel):
    age__lt: Optional[int]
    date_gt: Optional[int]


def create_app():
    app = FastAPI()
    app.include_router(api_route, tags=['api'])
    return app
