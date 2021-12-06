from datetime import datetime, timezone
import random
from urllib.parse import quote
from typing import Callable, Dict

from backend.domain.exceptions import UserExistsError
from backend.infrastructure.rest import CreateUserRequest, LoginRequest
from backend.domain.models import User, Token
from backend.repositories.user_repo import UserRepo
from backend.infrastructure.security import create_token, JWT_AUDIENCE_EVENTS


PROFILE_COLOURS = ["87fc93", "359b3b", "5e2b6a", "473e54", "6113c9"]
AVATAR_URL = "https://eu.ui-avatars.com/api/?format=svg&name={}&rounded=true&color=ffffff&background={}"  # noqa: E501


def register_user_use_case(request: CreateUserRequest, repo: UserRepo) -> User or Token:
    if repo.user_exists(username=request.username):
        raise UserExistsError(f"username {request.username} is not available")

    params = {
        "username": request.username.lower(),
        "profile_colour": random.choice(PROFILE_COLOURS),
        "first_seen": datetime.now(tz=timezone.utc),
    }

    params["avatar"] = AVATAR_URL.format(
        quote(request.username.title()), params["profile_colour"]
    )

    user = repo.create(User(**params))

    if user:
        if request.auto_login:
            return login_user_use_case(user, repo, token_factory=create_token)

    return user


def login_user_use_case(
    request: LoginRequest, repo: UserRepo, token_factory: Callable[[Dict], str]
) -> Token:
    if not repo.user_exists(username=request.username):
        raise ValueError("User does not exists")

    user = repo.find_user(username=request.username.lower())
    user.token = token_factory({"sub": str(user.id), "aud": JWT_AUDIENCE_EVENTS})
    user.last_login = datetime.now(tz=timezone.utc)

    updated_user = repo.update(user)

    if not updated_user:
        raise ValueError("error logging user")

    return Token(access_token=updated_user.token)
