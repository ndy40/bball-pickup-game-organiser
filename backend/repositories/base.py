from typing import Dict
from pydantic import BaseModel
from decimal import Decimal

from bson import ObjectId, Decimal128
from bson.codec_options import TypeCodec, CodecOptions, TypeRegistry
from pymongo import MongoClient


def filter_params_normalize(filters: dict):
    mongo_filter = {}
    for k, v in filters.items():
        if "__" not in k:
            field, operator = k, None
        else:
            _, field, operator = k.split("__")

        if operator:
            mongo_filter[field] = {f"${operator}": v}
        else:
            mongo_filter[field] = v
    return mongo_filter


class DecimalCodec(TypeCodec):
    python_type = Decimal
    bson_type = Decimal128

    def transform_python(self, value):
        return Decimal128(value)

    def transform_bson(self, value):
        return value.to_decimal()


codec_options = CodecOptions(type_registry=TypeRegistry([DecimalCodec()]), tz_aware=True)


class MongoRepo:
    collection_name: str = None
    model: BaseModel = None

    def __init__(self, db_config: dict):
        app_db = db_config["app_db"]
        del db_config["app_db"]
        client = MongoClient(**db_config)
        self.db = client[app_db]

    @property
    def collection(self):
        if not self.collection_name:
            raise ValueError("Collection name must be set")

        return self.db.get_collection(self.collection_name, codec_options=codec_options)

    def list(self, filters: Dict = None):
        if filters:
            filters = filter_params_normalize(filters)
        return [self.model(**item) for item in self.collection.find(filters)]

    def create(self, model: BaseModel):
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

    def delete(self, id: ObjectId):
        results = self.collection.delete_one({"_id": id})

        if not results.deleted_count:
            raise ValueError("Cannot delete {}".format(type(self.model)))

        return results.deleted_count

    def find_and_delete(self, filters: Dict):
        results = self.collection.delete_many(**filters)

        if not results.deleted_count:
            raise ValueError("Error deleting {}".format(type(self.model)))

        return results.deleted_count
