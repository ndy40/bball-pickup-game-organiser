from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from bson import ObjectId, Decimal128
from pydantic import BaseModel, Field, ValidationError, validator


class OID(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")

        if isinstance(v, str):
            return v

        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
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
    first_seen: Optional[datetime] = datetime.utcnow()
    last_login: Optional[datetime]
    token: Optional[str] = None
    avatar: Optional[str]
    profile_colour: Optional[str] = None


class Players(BaseModel):
    player_id: OID
    avatar: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Venue(BaseEntityModel):
    name: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Event(BaseEntityModel):
    session_date: datetime
    created_at: Optional[datetime] = datetime.now()
    invite_code: Optional[str] = None
    invite_link: Optional[str] = None
    organiser_id: Optional[OID]
    organiser_name: Optional[str]
    venue: str
    notes: Optional[str] = None
    max_players: Optional[int] = None
    cost: Decimal
    players: List[Players] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, Decimal128: str}

    @property
    def nbr_players(self):
        return 0

    @property
    def cost_per_player(self):
        return 0

    @property
    def session_time(self):
        return self.session_date.time().isoformat("minutes")

    @validator("cost")
    def cost_must_be_positive(cls, v):
        if v < 0:
            raise ValidationError("cost cannot be negative")
        return v

    def is_owner(self, user_id: str):
        return OID(user_id) == self.organiser_id

    def has_joined(self, player_id: str or OID) -> bool:
        if isinstance(player_id, str):
            player_id = OID(player_id)
        try:
            item = next(filter(lambda x: x.player_id == player_id, self.players))
            return isinstance(item, Players)
        except StopIteration:
            return False


class Token(BaseModel):
    access_token: str
    token_type: str = "JWT"


class TokenData(Token):
    username: str
