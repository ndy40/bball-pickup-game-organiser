from __future__ import annotations
from datetime import datetime
from typing import Optional, List, NewType

import strawberry

from backend.domain.models import User, OID, Event, Players


OIDScalar = strawberry.scalar(
    NewType('OIDScalar', OID),
    serialize=lambda v: str(v),
    parse_value=lambda x: str(x)
)


@strawberry.type
class TokenSchema:
    access_token: str
    token_type: str


@strawberry.type
class ErrorResponse:
    message: str


@strawberry.type
class MessageResponse:
    message: str


LoginResult = strawberry.union('LoginResult', (TokenSchema, ErrorResponse))


@strawberry.type
class UserSchema:
    id: str
    username: str
    first_seen: datetime
    last_login: Optional[datetime]
    avatar: Optional[str]
    profile_colour: Optional[str]

    @classmethod
    def from_pydantic(cls, user: User):
        return cls(
            id=str(user.id),
            username=user.username,
            avatar=user.avatar,
            first_seen=user.first_seen,
            last_login=user.last_login,
            profile_colour=user.profile_colour
        )


@strawberry.type
class PlayerSchema:
    player_id: OIDScalar
    avatar: str

    @classmethod
    def from_pydantic(cls, player: Players):
        return cls(
            player_id=OIDScalar(player.player_id),
            avatar=player.avatar
        )


@strawberry.type
class EventSchema:
    id: OIDScalar
    session_date: datetime
    created_at: datetime
    organiser_id: OIDScalar
    organiser_name: str
    max_players: Optional[int]
    players: List[PlayerSchema]
    notes: Optional[str] = None
    invite_link: Optional[str] = None
    invite_code: Optional[str] = None

    @classmethod
    def from_pydantic(cls, event: Event):
        return cls(
            id=OIDScalar(event.id),
            session_date=event.session_date,
            created_at=event.created_at,
            organiser_id=OIDScalar(event.organiser_id),
            organiser_name=event.organiser_name,
            max_players=event.max_players,
            notes=event.notes,
            invite_link=event.invite_link,
            invite_code=event.invite_code,
            players=[PlayerSchema.from_pydantic(player) for player in event.players]
        )
