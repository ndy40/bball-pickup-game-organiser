from fastapi import FastAPI

from backend.infrastructure.rest import api_route
from backend.infrastructure.graphql import gql_route
from backend.infrastructure.web import web


def create_app():
    app = FastAPI()
    app.include_router(api_route)
    app.include_router(gql_route)
    app.mount('/', web)

    return app
