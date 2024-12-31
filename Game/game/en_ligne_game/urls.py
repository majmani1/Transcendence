from django.urls import path
from . import views
from .views import game_history_view
from .views import add_game_history_view


urlpatterns = [
    # path('', views.index, name = "index"),
    path('gameHistory/<str:idPlayer>', game_history_view.as_view(), name='game-history'),
    path('addGameHistory/', add_game_history_view.as_view(), name='add-game-history'),

]
