from datetime import datetime
from typing import Optional, Union

from bson import ObjectId
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from backend.use_cases.user_use_cases import login_user_use_case, register_user_use_case
from backend.infrastructure.dependency import user_repo
from backend.repositories.user_repo import UserRepo
from backend.domain.models import OID, Token
from backend.infrastructure.security import create_token

from .requests import CreateUserRequest, LoginRequest


# Http Response
class UserCreatedResponse(BaseModel):
    id: OID = Field(None, alias="_id")
    username: str
    avatar: Optional[str]
    profile_colour: str
    first_seen: Optional[datetime]
    token: Optional[str] = None

    class Config:
        extra = "ignore"
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: lambda oid: str(oid)}


# Routes
user_routes = APIRouter(prefix="/users")


@user_routes.post(
    "/", response_model=Union[UserCreatedResponse, Token], response_model_by_alias=False
)
def create_user(user: CreateUserRequest, repo=Depends(user_repo)):
    return register_user_use_case(user, repo=repo)


@user_routes.post("/login", response_model=Token)
def login_user(login: LoginRequest, repo: UserRepo = Depends(user_repo)):
    return login_user_use_case(login, repo, create_token)
