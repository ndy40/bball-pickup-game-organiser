from backend.infrastructure.config import settings
from backend.repositories.user_repo import UserRepo
from backend.repositories.venue_repo import VenueRepo
from backend.repositories.event_repo import EventRepo


def user_repo():
    return UserRepo(db_config=settings.mongo_config())


def venue_repo():
    return VenueRepo(db_config=settings.mongo_config())


def event_repo():
    return EventRepo(db_config=settings.mongo_config())
