from backend.infrastructure.security import decode_jwt


def get_user_id_from_context(context):
    token = decode_jwt(context['request'].headers['x-api-key'])
    return token['sub']
