from backend.infrastructure.config import settings


class RepoFactory:
    def __init__(self, repo_name):
        self.repo_name = repo_name

    def __call__(self):
        class_ = ''.join(map(str.capitalize, self.repo_name.split('_')))
        module = __import__(f'backend.repositories.{self.repo_name}', {}, {}, class_)
        return getattr(module, class_)(db_config=settings.mongo_config())


# repository instances
event_repo = RepoFactory('event_repo')
user_repo = RepoFactory('user_repo')
venue_repo = RepoFactory('venue_repo')
