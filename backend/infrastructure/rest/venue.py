from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from backend.domain.models import Venue
from backend.infrastructure.dependency import venue_repo
from backend.use_cases.venue_use_cases import find_venue_use_case, create_venue_use_case, get_all_venues_use_case
from backend.repositories.venue_repo import VenueRepo


class CreateVenueRequest(BaseModel):
    name: str


venue_route = APIRouter(prefix='/venue')


@venue_route.get('/search/{name}', response_model=Venue, response_model_by_alias=False)
def search_venue(name: str, repo: VenueRepo = Depends(venue_repo)):
    try:
        return find_venue_use_case(name=name, repo=repo)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)


@venue_route.post('/')
def create_venue(req: CreateVenueRequest, repo: VenueRepo = Depends(venue_repo)):
    try:
        result = create_venue_use_case(name=req.name, repo=repo)
        return result
    except Exception as e:
        raise HTTPException(detail=str(e), status_code=status.HTTP_400_BAD_REQUEST)


@venue_route.get('/')
def list_venues(repo: VenueRepo = Depends(venue_repo)):
    return get_all_venues_use_case(repo=repo)
