from fastapi import FastAPI, Depends

from backend.infrastructure.rest import api_route
from backend.infrastructure.graphql import gql_route


def create_app():
    app = FastAPI()
    app.include_router(api_route)
    app.include_router(gql_route)
    return app
