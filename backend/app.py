from typing import Optional

from fastapi import FastAPI


def create_app():
    app = FastAPI()

    @app.get('/')
    def hello():
        return "Hello world"

    return app
