# from channels.routing import route
from django.urls import path
from .consumers import *

websocket_urlpatterns = [
    # route('websocket.connect', chatConsumer.connect, path=r'/chat/$'),
    # route('websocket.desconnect', chatConsumer.desconnect, path=r'/chat/$'),
    # route('websocket.receive', chatConsumer.receive, path=r'/chat/$')
    
    # path("ws/chat/", chatConsumer.as_asgi()),
    # path('ws/chat/', chatConsumer.as_asgi()),
    path('ws/chat/<str:user1_login>/<str:user2_login>/', chatConsumer.as_asgi()),
    path('ws/group/<str:room_name>/', groupChat.as_asgi()),
]