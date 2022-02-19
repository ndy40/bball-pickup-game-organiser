from .base import MongoRepo
from backend.domain.models import Event
from bson import ObjectId


class EventRepo(MongoRepo):
    model = Event
    collection_name = "events"

    def find_event(self, event_id: str):
        result = self.collection.find_one({"_id": ObjectId(event_id)})

        if not result:
            raise ValueError("event not found")

        return self.model(**result)

    def delete_own_event(self, owner_id: str, event_id: str):
        result = self.collection.find_one_and_delete(
            {"_id": ObjectId(event_id), "organiser_id": ObjectId(owner_id)}
        )

        if not result:
            raise ValueError("Cannot delete event")
