import datetime
import random
import string

from backend.domain.models import Event, Players, OID
from backend.repositories.event_repo import EventRepo
from backend.repositories.user_repo import UserRepo
from backend.infrastructure.config import settings
from backend.domain.exceptions import PlayerAlreadyJoined


def generate_random_code():
    population = (
        string.ascii_letters
        + string.ascii_lowercase
        + string.ascii_uppercase
        + string.digits
    )
    return "".join(random.choices(population, k=10))


def validate_event(event: Event):
    if event.session_date < datetime.datetime.utcnow():
        raise ValueError("Session date must be in the future")


def get_events_use_case(filters: dict, repo: EventRepo):
    if filters.get("player_id"):
        filters["players"] = {"$elemMatch": {"player_id": OID(filters["player_id"])}}
        del filters["player_id"]

    if "organiser_id" in filters and isinstance(filters['organiser_id'], str):
        filters["organiser_id"] = OID(filters["organiser_id"])

    return repo.list(filters, order_by=[('session_date', 1)])


def create_event_use_case(
    model: Event, owner: str, repo: EventRepo, user_repo: UserRepo
):
    user = user_repo.find_by_id(user_id=owner)

    invite_code = generate_random_code()
    model.invite_code = invite_code
    model.invite_link = f"{settings.SERVER_HOST}/event/invite/{invite_code}"
    model.organiser_id = OID(owner)
    model.organiser_name = user.username.title()
    model.players = [Players(player_id=user.id, avatar=user.avatar)]

    validate_event(model)

    return repo.create(model=model)


def delete_event_use_case(owner_id: str, event_id: str, repo: EventRepo):
    return repo.delete_own_event(owner_id=owner_id, event_id=event_id)


def join_event_use_case(event_id: str, user_id: str, repo: EventRepo, user_repo=UserRepo):
    event = repo.find_event(event_id=event_id)

    if event.has_joined(player_id=user_id):
        raise PlayerAlreadyJoined('User already joined')

    user = user_repo.find_by_id(user_id=user_id)

    event.players.append(Players(player_id=user.id, avatar=user.avatar))
    repo.update(event)


def leave_event_use_case(event_id: str, user_id: str, repo: EventRepo, user_repo: UserRepo):
    event = repo.find_event(event_id=event_id);

    if not event.has_joined(player_id=user_id):
        raise PlayerAlreadyJoined('User not in event')

    user = user_repo.find_by_id(user_id=user_id)
    event.players = [player for player in event.players if player.player_id != user.id]
    repo.update(event)


def get_event_use_case(event_id: str, repo: EventRepo):
    return repo.find_event(event_id=event_id)
