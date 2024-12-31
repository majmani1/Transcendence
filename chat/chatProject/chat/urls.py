from django.urls import path
from .views import *

urlpatterns = [
    # path('', views.home, name='home'),
    # path('chatContainer/chat/', views.pages, name='chat'),
    # path('chatContainer/allApi/', views.allApi),
    # path('chatContainer/api/<int:pk>/', views.api),
    # path('chatContainer/apii/', views.apii),
    # path('chatContainer/apimethods/<int:id>/', apimethods.as_view()),
    # path('chatContainer/fetchUser/', get_users.as_view()),
    path('chatContainer/fetchGroup/<user>/', get_group.as_view()),
    path('chatContainer/fetchGroupMsg/<str:roomName>/',get_groupMsg.as_view()),
    path('chatContainer/fetchPrivateMsg/<str:sender>/<str:receiver>/', get_privateMsgs.as_view()),
    path('chatContainer/update_vu/<str:sender>/<str:receiver>/', updateFieldVu.as_view()),
    path('chatContainer/onlinecount/', onlinecount.as_view()),
    path('chatContainer/is_block/<str:sender>/<str:receiver>/<int:is_block>/', block.as_view()),
    path('chatContainer/GroupChanges/<str:typeOfChange>/', GroupChanges.as_view()),
    path('chatContainer/is_protected/<groupName>/', is_protected.as_view()),
    path('chatContainer/GroupUsers/<groupName>/', get_GroupUsers.as_view()),
    path('chatContainer/is_owner/<user>/<groupName>/', is_owner.as_view()),
    path('chatContainer/fetchForInvite/<groupName>/', getUserToInvite.as_view()),
    path('chatContainer/MsgToSpoody/', MsgToSpoody.as_view()),
    path('chatContainer/spoodyChat/<str:sender>/<str:receiver>/',onlineInSpoodyChat.as_view()),
    path('chatContainer/vu_check/<str:sender>/<str:receiver>/', vu_check.as_view()),
    # path('group-length/<str:group_name>/', views.group_length_view, name='group_length'),
]
