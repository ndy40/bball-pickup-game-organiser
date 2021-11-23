#!/usr/bin/env sh

set -e

mongo --host db -u $MONGO_ROOT_USERNAME -p $MONGO_ROOT_PASSWORD <<EOF
  use $APP_DATABASE
  db.createUser({
        user: '$MONGO_USERNAME',
        pwd: '$MONGO_PASSWORD",
        roles: [ { role: 'readWrite', db: '$APP_DATABASE' } ]
    })
EOF
