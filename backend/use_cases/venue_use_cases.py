from backend.domain.models import Venue
from backend.repositories.venue_repo import VenueRepo


def create_venue_use_case(name: str, repo: VenueRepo):
    return repo.create(model=Venue(name=name))


def find_venue_use_case(name: str, repo: VenueRepo):
    try:
        return repo.find_venue(name=name)
    except ValueError:
        pass


def get_all_venues_use_case(repo: VenueRepo):
    return repo.list()
