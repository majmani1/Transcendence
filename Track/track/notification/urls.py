from django.urls import path
from . import views


urlpatterns = [
    path('notif/', views.notification),
    path('notif/notificationDatabase/<str:to>', views.NotifModel),
]