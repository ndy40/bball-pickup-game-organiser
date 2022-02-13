import datetime
from typing import List

import strawberry
from strawberry.types import Info

from backend.infrastructure.dependency import user_repo, event_repo
from backend.use_cases.events_use_case import get_events_use_case, get_event_use_case
from backend.infrastructure.security import decode_jwt
from .permissions import RequiresAuthentication
from .types import UserSchema, ErrorResponse, EventSchema
from .helpers import get_user_id_from_context

user_repo = user_repo()
event_repo = event_repo()


@strawberry.type
class Query:
    @strawberry.field(permission_classes=[RequiresAuthentication])
    def profile(self, info: Info) -> strawberry.union('ProfileResponse', (ErrorResponse, UserSchema)):
        try:
            token = decode_jwt(info.context['request'].headers.get('x-api-key'))
            user = user_repo.find_by_id(user_id=token['sub'])
            return UserSchema.from_pydantic(user)
        except ValueError:
            pass

        return ErrorResponse(message='no profile found')

    @strawberry.field(permission_classes=[RequiresAuthentication])
    def my_events(self, info: Info) -> List[EventSchema] or str:
        user_id = get_user_id_from_context(info.context)
        events = get_events_use_case({"organiser_id": user_id}, event_repo)
        print(events)
        return [EventSchema.from_pydantic(event) for event in events]

    @strawberry.field(permission_classes=[RequiresAuthentication])
    def upcoming_events(self, info: Info) -> List[EventSchema] or str:
        filters = {
            "player_id": get_user_id_from_context(info.context),
            'filter__session_date__gte': datetime.datetime.utcnow()
        }

        events = get_events_use_case(filters, event_repo)
        return [EventSchema.from_pydantic(event) for event in events]

    @strawberry.field(permission_classes=[RequiresAuthentication])
    def get_event_by_id(self, event_id: str) -> strawberry.union('EventResponse', (EventSchema, ErrorResponse)):
        try:
            event = get_event_use_case(event_id=event_id, repo=event_repo)
            return EventSchema.from_pydantic(event)
        except ValueError as e:
            return ErrorResponse(messsage=str(e))
