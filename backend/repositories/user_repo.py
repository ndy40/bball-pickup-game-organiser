from bson import ObjectId
from backend.domain.models import User
from .base import MongoRepo


class UserRepo(MongoRepo):
    collection_name = "user"
    model = User

    def user_exists(self, username: str):
        return self.collection.count({"username": username}) > 0

    def find_user(self, username: str):
        result = self.collection.find_one({"username": username})

        if not result:
            raise ValueError(f"user {username} not found")

        return self.model(**result)

    def find_by_id(self, user_id: str):
        user = self.collection.find_one({"_id": ObjectId(user_id)})

        if not user:
            raise ValueError("User not found")

        return self.model(**user)
