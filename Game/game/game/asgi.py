import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application
from en_ligne_game import routing

from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from django.http import SimpleCookie
from channels.middleware import BaseMiddleware
from jwt import decode as jwt_decode, InvalidTokenError
from django.conf import settings
from asgiref.sync import sync_to_async

@sync_to_async
def check_token(token):
    try:
        payload = jwt_decode(token, settings.SIGN_KEY_AUTH, algorithms=["HS256"])
        user_id = payload.get("user_id")
        if not user_id:
            return AnonymousUser()
        class TokenUser:
            is_authenticated = True
            id = user_id
            username = payload.get("username", "unknown")
        return TokenUser()
    except (InvalidTokenError, ExpiredSignatureError):
        return AnonymousUser()

class Auth_Middleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        headers = dict(scope["headers"])
        cookie_header = headers.get(b"cookie", b"").decode("utf-8")
        
        cookies = SimpleCookie(cookie_header)
        scope["cookies"] = {key: morsel.value for key, morsel in cookies.items()}
        token = scope['cookies'].get('access_token')
        if token:
            scope["user"] = await check_token(token)
        else:
            scope["user"] = AnonymousUser()
        return await super().__call__(scope, receive, send)


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": Auth_Middleware(AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(routing.websocket_urlpatterns)))
    )
    # Just HTTP for now. (We can add other protocols later.)
})