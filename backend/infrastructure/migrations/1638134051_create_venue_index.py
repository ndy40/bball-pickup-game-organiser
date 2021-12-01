from mongodb_migrations.base import BaseMigration
import pymongo


class Migration(BaseMigration):
    def upgrade(self):
        self.db.venue.create_index([('name', pymongo.TEXT)], name="venueIdx", unique=True, background=True)

    def downgrade(self):
        self.db.venue.dropIndex('venueIdx')
