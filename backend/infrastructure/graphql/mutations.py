import strawberry
from strawberry.types import Info

from backend.domain.models import Token
from backend.domain.exceptions import UserExistsError
from backend.infrastructure.dependency import user_repo, event_repo
from backend.infrastructure.security import create_token
from backend.use_cases.user_use_cases import login_user_use_case, register_user_use_case
from backend.use_cases.events_use_case import join_event_use_case, leave_event_use_case, get_event_use_case, delete_event_use_case
from .permissions import RequiresAuthentication
from .types import LoginResult, TokenSchema, ErrorResponse, UserSchema, EventSchema, MessageResponse
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
    def join_event(self, info: Info, event_id: str) -> EventSchema:
        event_repository = event_repo()

        user_id = get_user_id_from_context(info.context)

        join_event_use_case(event_id, user_id, repo=event_repository)
        event = get_event_use_case(event_id=event_id, repo=event_repository)

        return EventSchema.from_pydantic(event)

    @strawberry.field(permission_classes=[RequiresAuthentication])
    def quit_event(self, info: Info, event_id: str) -> MessageResponse:
        user_id = get_user_id_from_context(info.context)
        user_repository = user_repo()
        event_repository = event_repo()
        leave_event_use_case(event_id=event_id, user_id=user_id, repo=event_repository, user_repo=user_repository)

        return MessageResponse(message=f'Removed from event {event_id}')

    @strawberry.field(permission_classes=[RequiresAuthentication])
    def delete_event(self, info: Info, event_id: str) \
            -> strawberry.union('DeleteEventResponse', (ErrorResponse, MessageResponse)):
        user_id = get_user_id_from_context(info.context)
        try:
            delete_event_use_case(owner_id=user_id, event_id=event_id, repo=event_repo())
            return MessageResponse(message="deleted")
        except Exception as e:
            return ErrorResponse(message=str(e))


