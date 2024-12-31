from django.urls import path
from .consumers import *

websocket_urlpatterns = [
    path('ws/msgNotification/<str:username>/', messageNotif.as_asgi())
]