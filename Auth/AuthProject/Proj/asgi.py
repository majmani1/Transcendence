"""
ASGI config for Proj project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.auth import AuthMiddlewareStack
from django.urls import path
from subscrib import routing



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Proj.settings')

# django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
  'http': get_asgi_application(),
  # 'websocket': AllowedHostsOriginValidator(
  #     AuthMiddlewareStack(URLRouter(routing.websocket_urlpatterns)),
  # )
})
