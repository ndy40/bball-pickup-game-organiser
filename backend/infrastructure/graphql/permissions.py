from typing import Any, Union, Awaitable

from strawberry.permission import BasePermission
from strawberry.types import Info
from fastapi import Request, WebSocket

from backend.infrastructure.security import decode_jwt


class RequiresAuthentication(BasePermission):
    message = "Not Authorised"

    def has_permission(self, source: Any, info: Info, **kwargs) -> Union[bool, Awaitable[bool]]:
        try:
            request: Union[WebSocket, Request] = info.context['request']
            token = decode_jwt(request.headers.get('x-api-key'))

            if token:
                return True
        except Exception:
            return False


