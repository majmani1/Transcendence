from django.http import *
from subscrib.models import *
import json
from rest_framework.permissions import IsAuthenticated
from subscrib.view_OAuth import *
from subscrib.view_friend import *
from subscrib.view_update import *
from subscrib.view_2FA import *
from .serializers import *
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import logout
import jwt
from datetime import datetime
from django.contrib.auth import get_user_model
from jwt import decode, ExpiredSignatureError, InvalidTokenError
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
#==========================================

def health_check(request):
    return JsonResponse({"status": "ok"})

class registre(CreateAPIView):
    serializer_class = registreS

def check_refresh_token_expiry(refresh_token, secret_key):
    try:
        payload = jwt.decode(refresh_token, secret_key, algorithms=["HS256"])
        exp = payload.get('exp')

        if exp:
            expiry_time = datetime.utcfromtimestamp(exp)
            if expiry_time > datetime.utcnow():
                return True
            else:
                return False
        else:
            return False
    except jwt.ExpiredSignatureError:
        return False 
    except jwt.InvalidTokenError:
        return False



User = get_user_model()


def my_secure_view(access_token):
    try:
        payload = decode(access_token, settings.SECRET_KEY, algorithms=["HS256"])

        user_id = payload.get('user_id')
        if not user_id:
            raise AuthenticationFailed("Token payload is invalid.")
        try:
            user = User.objects.get(id=user_id) 
        except User.DoesNotExist:
            raise AuthenticationFailed("User does not exist.")
        return user

    except ExpiredSignatureError:
        raise AuthenticationFailed("Access token has expired.")
    except InvalidTokenError:
        raise AuthenticationFailed("Invalid access token.")

class Autorization(CreateAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            ch = check_refresh_token_expiry(request.COOKIES.get('refresh_token'), settings.SECRET_KEY)
            if ch:
                return Response({"message": "Succesfully"}, status=200)
            else:
                response = JsonResponse({
                'message': 'remove tokens',
                }, status=400)
                response.delete_cookie('refresh_token', samesite='None')
                response.delete_cookie('access_token', samesite='None')
                return response
        except Exception as e:
            return Response({"error": str(e)}, status=400)



class check_pars_token(CreateAPIView):
    def get(self, request):
        try:
            refresh = request.COOKIES.get('refresh_token')
            if refresh is not None:
                decoded_token = decode(refresh, settings.SECRET_KEY, algorithms=["HS256"])
                user = user_pro.objects.get(username = request.user)
                if user is None:
                    return Response({'error': 'User not found'}, status=404)
                else:
                    ser = user_token_info(user)
                    return Response(ser.data, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=401)

class user_login(CreateAPIView):
    serializer_class = loginS

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            login(request, user)
            
            otp_check = checker_otp(TOTPDevice.objects.filter(user=user).first()) # two case if there or not , but important is to be confirmed 

            if otp_check == False:
                #================= Generate token =====================
                stri = get_tokens_for_user(user)

                response = JsonResponse({
                    'message': 'Data received successfully',
                    'access': stri['access'],
                    'refresh': stri['refresh'],
                })
                response = set_secure_cookie(response, stri)

                return response
            return Response({'message': '2FA are enabled'}, status=200)
        except ValidationError as e:
            return Response({'errors': e.detail}, status=status.HTTP_400_BAD_REQUEST)


class generate_new_access_token(CreateAPIView):

    def get(self, request):
        try:
            refresh = request.COOKIES.get('refresh_token')
            ch = check_refresh_token_expiry(refresh, settings.SECRET_KEY)
            if ch == True:
                refresh = RefreshToken(request.COOKIES.get('refresh_token'))
                new_access_token = str(refresh.access_token)

                my_secure_view(new_access_token)
                response = JsonResponse({
                    'message': 'successfully generate new access token',
                    'access_token': new_access_token,
                    'refresh_token': request.COOKIES.get('refresh_token') 
                }, status=200)
                stri = {'access': new_access_token, 'refresh': request.COOKIES.get('refresh_token')}
                response = set_secure_cookie(response, stri)
                return response
            else:
                response = JsonResponse({
                'message': 'remove tokens',
                }, status=400)
                response.delete_cookie('refresh_token', samesite='None')
                response.delete_cookie('access_token', samesite='None')
                return response
        except Exception as e:
            print('\n\n444444444444\t',str(e),'\n\n\n')
            response = JsonResponse({
            'message': 'remove tokens',
            }, status=400)
            response.delete_cookie('refresh_token', samesite='None')
            response.delete_cookie('access_token', samesite='None')
            # return responseaccess_token, samesite='None')
            return response

class logoutV(CreateAPIView):
    serializer_class = logoutS

    def post(self, request):
        logout(request)
        response = JsonResponse({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)
        response.delete_cookie('refresh_token', samesite='None')
        response.delete_cookie('access_token', samesite='None')
        return response

from rest_framework.generics import DestroyAPIView

class delete_cookies(DestroyAPIView):
    def destroy(self, request, *args, **kwargs):
        try:
            response = JsonResponse({'message': 'Cookies deleted successfully'}, status=200)
            response.delete_cookie('refresh_token', samesite='None')
            response.delete_cookie('access_token', samesite='None')
        except Exception as e:
            return Response({'error': str(e)}, status=400)
        return response
#================ get data of user ==========================

#================ get data of user ==========================

from rest_framework.generics import RetrieveAPIView

class get_data_User(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request,  username):
        try:
            me = request.user
            if me.username != username:
                user = user_pro.objects.get(username = username)
                if user is None:
                    return Response({'error': 'User not found'}, status=404)
                else:
                    return JsonResponse(get_data_frontS(user).data, status=200)        
            else:
                return Response({'profile'}, status=204)
        except (json.JSONDecodeError, KeyError) as e:
            return Response({'error': str(e)}, status=401)

       
class remove_profile(DestroyAPIView):
    queryset = user_pro.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def delete(self, request, id):
        try:
            user = self.get_object()
            file_path = '/AuthProject/Avatars/'
            os.remove(file_path + user.picture.name)
            user.delete()
            return Response({"message": "Profile deleted successfully."}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=400)


# ===================== 
class get_user_id(APIView):
    permission_classes= [IsAuthenticated]
    
    def get(self, request, username):
        try:
            user = user_pro.objects.get(username=username)
            serialize = FriendId(user)
            return Response(serialize.data, status=200)
        except user_pro.DoesNotExist:
            return Response({'error': 'User not found'}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=401)
        
class get_users(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, username):
        try:
            friends = request.user.friends.all().values_list('username')
            userNotFriend = user_pro.objects.filter(username__icontains=username).exclude(username__in=friends).exclude(username=request.user.username)
            serialize = FriendListSerializer(userNotFriend, many=True)
            return Response(serialize.data, status=200)
        except user_pro.DoesNotExist:
            return Response({'error': 'User not found'}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=401)

def update_level(request):
    try:
        if request.method == 'POST':
            receive = json.loads(request.body)
            user = user_pro.objects.get(id=receive['player_id'])
        
            if user.level < 1:
                user.level += 0.2
            else:
                user.level += 0.2/user.level
            user.number_of_wins += 1
            user.number_of_games += 1
            if receive['typeGame'] == "hunter":
                user.number_of_wins_hunter += 1
            elif receive['typeGame'] == "pong":
                user.number_of_wins_pong += 1
            user.save()
            user2 = user_pro.objects.get(id=receive['loser_player_id'])
            user2.number_of_games += 1
            user2.number_of_loses += 1

            user2.save()
            data = {
                'message': 'Level updated successfully',
                'status': 'success'
            }
            return JsonResponse(data, status=200) 
        else:
            return JsonResponse({'error': 'Invalid request method'}, status=400) 
    except user_pro.DoesNotExist:
        data = {
            'message': 'User Not Found',
        }
        return JsonResponse(data, status=200)    

def update_status(request):
    print("update status")
    try:
        if request.method == 'GET':
            receive = json.loads(request.body)
            user = user_pro.objects.get(id=receive['player_id'])
            data = {
                'message': 'Status updated successfully',
                'status': user.status_player
            }
            return JsonResponse(data, status=200) 
        elif request.method == 'POST':
            receive = json.loads(request.body)
            user = user_pro.objects.get(id=receive['player_id1'])
            user.status_player = receive['status']
            user.save()
            if receive['player_id2'] == "no":
                return JsonResponse({'message': 'Status updated successfully', 'status': 'success'}, status=200)
            user2 = user_pro.objects.get(id=receive['player_id2'])
            user2.status_player = receive['status']
            user2.save()
            data = {
                'message': 'Status updated successfully',
                'status': 'success'
            }
            return JsonResponse(data, status=200)
        else:
            return JsonResponse({'error': 'Invalid request method'}, status=400)
    except user_pro.DoesNotExist:
        data = {
            'message': 'User Not Found',
        }
        return JsonResponse(data, status=200)



def update_status_in_close(request):
    # print("gooood")
    try:
        if request.method == 'POST':
            receive = json.loads(request.body)
            user = user_pro.objects.get(id=receive['player_id'])
            if user.status_player == "out Game":
                data = {
                    'message': 'Status Already Out Game',
                    'status': 'success'
                }
                return JsonResponse(data, status=200)
            user.status_player = receive['status']
            user.save()
            data = {
                'message': 'Status updated successfully',
                'status': 'success'
            }
            return JsonResponse(data, status=200)
        else:
            data = {
                'message': 'Error',
                'status': 'Error'
            }
            return JsonResponse(data, status=400)
    except user_pro.DoesNotExist:
        data = {
            'message': 'User Not Found',
        }
        return JsonResponse(data, status=200)



class connected_status(UpdateAPIView):

       def patch(self, request, *args, **kwargs):
        try :
            id = kwargs.get('id') 
            user = user_pro.objects.get(id=id)
            user.online = True
            user.save()
            serialize = FriendStatusSerializer(user.friends.all(), many=True)
            return Response({'user': user.username, 'friends':serialize.data}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=404)
    
class desconnected_status(UpdateAPIView):

       def patch(self, request, *args, **kwargs):
        try :
            id = kwargs.get('id') 
            user = user_pro.objects.get(id=id)
            user.online = False
            user.save()
            serialize = FriendStatusSerializer(user.friends.all(), many=True)
            return Response({'user': user.username, 'friends':serialize.data}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=404)


class check_user_if_friend(APIView):
    def get(self, request, *args, **kwargs):
        try :
            id = kwargs.get('self_id')
            user_check = kwargs.get('check_id')
            user = user_pro.objects.get(id=id)
            if user.friends.filter(id=user_check).exists():
                return Response({'isFriend':True}, status=200)
            return Response({'isFriend':False}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=400)