from typing import Optional, List
from dataclasses import asdict
from decimal import Decimal
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Response
from pydantic.dataclasses import dataclass

from backend.infrastructure.security import JWTKey
from backend.domain.models import Event
from backend.repositories.event_repo import EventRepo
from backend.repositories.user_repo import UserRepo
from backend.infrastructure.dependency import event_repo, user_repo
from backend.use_cases.events_use_case import (
    create_event_use_case,
    delete_event_use_case,
    get_events_use_case,
)


@dataclass
class CreateEventRequest:
    session_date: datetime
    created_at: datetime
    venue: str
    notes: str
    max_players: int
    cost: Decimal

    class Config:
        json_encoders = {Decimal: str}


events_route = APIRouter(prefix="/events")


def filter_events_by(
    organiser_id: Optional[str] = None,
    invite_code: Optional[str] = None,
    player_id: Optional[str] = None,
    filter__session_date__gte: Optional[datetime] = None
):
    filters = {
        "organiser_id": organiser_id,
        "invite_code": invite_code,
        "player_id": player_id,
        'filter__session_date__gte': filter__session_date__gte
    }

    if not (filters["organiser_id"] or filters["invite_code"] or filters["player_id"]):
        raise HTTPException(
            detail="must provide organiser_id or invite_code or player_id",
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    return {k: v for k, v in filters.items() if v is not None}


@events_route.get(
    "/",
    response_model_by_alias=False,
    response_model=List[Event],
    description="Provide organiser_id, invite_id or player_id to get events",
)
def get_events(
    filters: dict = Depends(filter_events_by),
    repo: EventRepo = Depends(event_repo),
):
    return get_events_use_case(filters=filters, repo=repo)


@events_route.post("/", response_model=Event)
def create_events(
    item: CreateEventRequest,
    repo: EventRepo = Depends(event_repo),
    users_repo: UserRepo = Depends(user_repo),
    token: dict = Depends(JWTKey("x-api-key")),
):
    return create_event_use_case(
        model=Event(**asdict(item)), repo=repo, user_repo=users_repo, owner=token["sub"]
    )


@events_route.delete("/{event_id}")
def delete_event(
    event_id: str,
    repo: EventRepo = Depends(event_repo),
    token: dict = Depends(JWTKey("x-api-key")),
):
    if delete_event_use_case(owner_id=token["sub"], event_id=event_id, repo=repo):
        return Response(status_code=status.HTTP_204_NO_CONTENT, content="success")
