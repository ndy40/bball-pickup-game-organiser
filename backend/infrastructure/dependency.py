from backend.infrastructure.config import settings
from backend.repositories.user_repo import UserRepo


def user_repo():
    return UserRepo(db_config=settings.mongo_config())
