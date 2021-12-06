from .base import MongoRepo
from backend.domain.models import Venue


class VenueRepo(MongoRepo):
    model = Venue
    collection_name = "venue"

    def venue_exists(self, name: str):
        pass

    def find_venue(self, name: str):
        result = self.collection.find_one({"$text": {"$search": name}})

        if not result:
            raise ValueError("Venue not found")

        return self.model(**result)
