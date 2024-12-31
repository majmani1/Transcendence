from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
     # re_path(r"ws/tournamentRemote/$",consumers.TournamentRemote_Consumer.as_asgi()),
     re_path(r"ws/tournament/$",consumers.TournamentConsumer.as_asgi()),
     re_path(r"ws/index/$", consumers.GameConsumer.as_asgi()),
]