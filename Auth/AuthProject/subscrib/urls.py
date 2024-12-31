from django.urls import path
from subscrib import views
from .views import *
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('Authri/', views.Api_request_Auth, name="Authri"),
    path('Auth/', views.auth, name="Auth"),
    path('google_OAth/', views.google_OAth, name="google_OAth"),
    path('google_callback/', views.google_callback, name="google_callback"),
    #============== check parse token ======================
    path('user/check/token', check_pars_token.as_view(), name="check"),
    #============== User Managmenet ======================
    path('user/registre/', registre.as_view(), name="registre"),
    path('user/login/', user_login.as_view(), name="login"),
    path('user/logout/', logoutV.as_view(), name="logout"),
    path('user/Autorization', Autorization.as_view(), name="Autorization"),
    #=============== get data for other service =================
    path('user/data/<str:username>', get_data_User.as_view(), name="get_data_User"),
    # path('user/get/data/front', get_data_front_login.as_view(), name="check"),
    path('user/token/refresh', generate_new_access_token.as_view(), name="generate_new_access_token"),
    # path('user/data/service', data_service.as_view(), name="verify_user"),
    #=============== Friend =================    #=============== Friend =================
    path('user/friend/request/', friend_request.as_view(), name="friend_request"),
    path('user/friend/accept', friend_accept.as_view(), name="friend_accept"),
    path('user/friend/refuse', friend_refuse.as_view(), name="friend_refuse"),
    path('user/friend/remove/<str:username>/', remove_friend.as_view(), name="friend_remove"),
    path('user/friend/list', list_friend.as_view(), name="list_friend"),
    path('user/friend/suggestion', friend_suggestion.as_view(), name="friend_suggestion"),
    path('user/friend/request/list', friend_request_list.as_view(), name="friend_request_list"),
    #=========================================================
    path('user/remove/profile/<str:id>/', remove_profile.as_view(), name="remove_profile"),
    #=============== Update Profile =================
    path('user/update/<str:id>', update_profile.as_view(), name="update_profile"),
    # path('user/remove/profile', remove_profile.as_view(), name="remove_profile"),
    path('user/friendId/<str:username>/', get_user_id.as_view(), name="get_user_id"),
    path('user/reset/password/', reset_password.as_view(), name="reset_password"),
    path('user/get_users/<str:username>/', get_users.as_view(), name="get_users"),
    # ============== 2FA =====================================
    path('enable-2fa/', Enable2FAView.as_view(), name='enable-2fa'),
    path('verify-2fa/', Verify2FAView.as_view(), name='verify-2fa'),
    path('verify-active-2FA/', Verify_active_2FA.as_view(), name='enable-2fa'),
    path('disable-2fa/', Disable2FAView.as_view(), name='disable-2fa'),
    #=========================================================
    path('level/', update_level, name="level"),
    path('status_player/', update_status, name="status_player"),
     path('status_player_in_close/', update_status_in_close, name="status_player"),
    # ============== delete cookies =====================================
    path('user/delete/cookies/', delete_cookies.as_view(), name="delete_cookies"),
    # ============== online status ======================================
    path('user/online/connected/<str:id>/', connected_status.as_view(), name="online_status"),
    path('user/online/desconnected/<str:id>/', desconnected_status.as_view(), name="online_status"),
    path('health', views.health_check, name="health_check"),
    path('user/isFriend/<str:self_id>/<str:check_id>', check_user_if_friend.as_view()),

]
