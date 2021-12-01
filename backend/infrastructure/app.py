from fastapi import FastAPI

from backend.infrastructure.rest import api_route


def create_app():
    app = FastAPI()
    app.include_router(api_route, tags=['user'])
    return app
