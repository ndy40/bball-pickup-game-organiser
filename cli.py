from typing import Optional

import typer
from mongodb_migrations.cli import MigrationManager, Configuration, Execution
from backend.infrastructure.config import settings


app = typer.Typer()

mongo_config = settings.mongo_config()
migration_configuration = Configuration({
    'mongo_url': f"mongodb://{mongo_config['host']}:{mongo_config['port']}/{mongo_config['authSource']}",
    'mongo_database': mongo_config['app_db'],
    'mongo_username': mongo_config['username'],
    'mongo_password': mongo_config['password'],
    'mongo_migrations_path': 'backend/infrastructure/migrations'
})


@app.command()
def migrations(direction: Optional[bool] = typer.Option(None, '--up/--down')):

    if direction is None:
        raise ValueError('Specify --up or --down for migration')
    elif direction:
        migration_configuration.execution = Execution.MIGRATE
    else:
        migration_configuration.execution = Execution.DOWNGRADE

    migrations_app = MigrationManager(config=migration_configuration)
    migrations_app.run()


@app.command()
def info():
    typer.echo('Dummy function')


if __name__ == '__main__':
    app()
