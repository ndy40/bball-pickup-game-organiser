import strawberry
from strawberry.types import Info

from backend.domain.models import Token
from backend.domain.exceptions import UserExistsError
from backend.infrastructure.dependency import user_repo
from backend.infrastructure.security import create_token
from backend.use_cases.user_use_cases import login_user_use_case, register_user_use_case
from .permissions import RequiresAuthentication
from .types import LoginResult, TokenSchema, ErrorResponse, UserSchema
from .helpers import get_user_id_from_context


@strawberry.type
class Mutation:
    @strawberry.field
    def login(self, username: str) -> LoginResult:
        try:
            token = login_user_use_case(username, repo=user_repo(), token_factory=create_token)
            if token:
                return TokenSchema(access_token=token.access_token, token_type=token.token_type)
        except ValueError:
            pass

        return ErrorResponse(message='login failed')

    @strawberry.field
    def register_user(self, username: str) \
            -> strawberry.union('RegisterResponse', (UserSchema, TokenSchema, ErrorResponse)):
        try:
            resp = register_user_use_case(username=username, auto_login=True, repo=user_repo())

            if isinstance(resp, Token):
                return TokenSchema(access_token=resp.access_token, token_type=resp.token_type)

            return UserSchema.from_pydantic(resp)
        except UserExistsError as e:
            return ErrorResponse(message=str(e))

    @strawberry.field(permission_classes=[RequiresAuthentication])
    def join_event(self, info: Info, event_id: str) -> str:
        user_id = get_user_id_from_context(info.context)
        # TODO: 1. Get event user case for adding user to event.
        #  2. Make sure that user is validated for duplicate entry.
        #  3. return event payload on succeed.
        return user_id

    def quit_event(self, info: Info, event_id: str) -> str:
        ''' remove user from event'''
        pass

