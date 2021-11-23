from abc import ABC, abstractmethod
from typing import Dict

from bson import ObjectId
from pymongo import MongoClient


def filter_params_normalize(filters: dict):
    mongo_filter = {}
    for k, v in filters.items():
        if "__" not in k:
            field, operator = k, None
        else:
            field, operator = k.split("__")

        if operator:
            mongo_filter[field] = {f"${operator}": v}
        else:
            mongo_filter[field] = v

    return mongo_filter


class MongoRepo(ABC):

    collection_name: str = None

    model = None

    def __init__(self, db_config: dict):
        app_db = db_config["app_db"]
        del db_config["app_db"]
        client = MongoClient(**db_config)
        self.db = client[app_db]

    @property
    def collection(self):
        if not self.collection_name:
            raise ValueError("Collection name must be set")

        return self.db[self.collection_name]

    @abstractmethod
    def list(self, filters: Dict):
        raise "Not implemented yet"

    def create(self, model):
        if not model:
            raise ValueError("Must be a valid model")

        result = self.collection.insert_one(
            model.dict(by_alias=True, exclude_unset=True)
        )
        if not getattr(result, "inserted_id"):
            raise ValueError("Error creating records")

        return self.model(**self.collection.find_one({"_id": result.inserted_id}))

    def update(self, model):
        values = model.dict(by_alias=True, exclude_unset=True, exclude={"id"})
        result = self.collection.update_one({"_id": model.id}, {"$set": {**values}})

        if not getattr(result, "matched_count", None):
            raise ValueError("failed to update record")

        return self.model(**self.collection.find_one(filter={"_id": model.id}))

    @abstractmethod
    def delete(self, oid: ObjectId):
        raise "Not implemented yet"

    @abstractmethod
    def find_and_delete(self, filters: Dict):
        raise "Not Implemented yet"
