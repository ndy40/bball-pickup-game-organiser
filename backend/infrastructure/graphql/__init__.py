from strawberry.fastapi.router import GraphQLRouter
from .schema import schema

gql_route = GraphQLRouter(schema=schema, path='/graphql')
