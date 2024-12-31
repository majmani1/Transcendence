from django.urls import re_path
from hunters.consumers import second_game_Consumer

websocket_url_p = [
    re_path(
        r'^ws/second_game/(?P<level>[a-zA-Z]+)/(?P<id>[a-zA-Z0-9_-]+)/(?P<game_mode>[a-zA-Z]+)/(?P<player_name>[a-zA-Z0-9_-]+)/(?P<img>.+)/$',
        second_game_Consumer.as_asgi(),
    ),
]
