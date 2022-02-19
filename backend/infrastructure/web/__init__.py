from fastapi import FastAPI

from .home import home_route


web = FastAPI()
web.include_router(router=home_route)
