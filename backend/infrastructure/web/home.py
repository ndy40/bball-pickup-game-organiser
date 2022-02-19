import os


from fastapi import Request, APIRouter
from fastapi.templating import Jinja2Templates

home_route = APIRouter()

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), 'templates')
templates = Jinja2Templates(directory=TEMPLATE_DIR)


@home_route.get('/')
def welcome(request: Request):
    return templates.TemplateResponse('home.html', {'request': request})
