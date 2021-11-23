from typing import Optional

from pydantic import BaseModel


# Http Requests
class CreateUserRequest(BaseModel):
    username: str
    auto_login: Optional[bool] = True


class LoginRequest(BaseModel):
    username: str
