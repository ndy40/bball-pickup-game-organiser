from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from backend.infrastructure.rest import api_route
from backend.infrastructure.graphql import gql_route


def create_app():
    app = FastAPI()
    app.include_router(api_route)
    app.include_router(gql_route)

    @app.get('/', response_class=HTMLResponse)
    def hello():
        return """
        <html>
        <body>
        <h1>Hello world</h1>
        </body>
        </html>
        """

    return app
