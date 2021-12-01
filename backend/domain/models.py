from datetime import datetime, timezone
from decimal import Decimal
from typing import List, Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class OID(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")

        if isinstance(v, str):
            return str

        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        print(f"schema {field_schema}")
        field_schema.update(type="string")


class BaseEntityModel(BaseModel):
    id: Optional[OID] = Field(alias="_id")

    class Config:
        extra = "ignore"
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: lambda oid: str(oid)}


class User(BaseEntityModel):
    username: str
    first_seen: Optional[datetime] = datetime.now(tz=timezone.utc)
    last_login: Optional[datetime]
    token: Optional[str] = None
    avatar: Optional[str]
    profile_colour: Optional[str] = None


class Players(BaseEntityModel):
    username: str
    avatar: str


class Venue(BaseEntityModel):
    name: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Event(BaseEntityModel):
    session_date: datetime
    created_at: datetime
    invite_code: str
    invite_link: str
    organiser_id: str
    organiser_name: str
    venue: str
    notes: str
    max_players: int
    cost: Decimal
    players: List[Players] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

    @property
    def nbr_players(self):
        return 0

    @property
    def cost_per_player(self):
        return 0


class Token(BaseModel):
    access_token: str
    token_type: str = "JWT"


class TokenData(Token):
    username: str
