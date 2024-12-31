from django.http import *
from subscrib.models import *
from django.shortcuts import redirect
import requests
import json
from urllib.parse import quote
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.contrib.auth import login
from urllib.parse import unquote
import os
import requests
from django.core.files.base import ContentFile

def check_already_save_img(img):
    if os.path.isfile('/AuthProject/Avatars/'+ img):
        return True
    else:
        return False

def save_image(url, username):
    try:
        response = requests.get(url)
        response.raise_for_status()

        file_name = url.split("/")[-1]

        obj = user_pro.objects.get(username=username)
        if check_already_save_img(file_name) == False:
            obj.picture.save(file_name, ContentFile(response.content))
        else:
            obj.picture.name = str(file_name)
            obj.save()
    except requests.exceptions.RequestException as e:
        return None


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    obj = user_pro.objects.get(username=user)
    otp = TOTPDevice.objects.filter(user=user).first()

    refresh['nb_games'] = obj.number_of_games
    refresh['nb_wins'] = obj.number_of_wins
    refresh['nb_loses'] = obj.number_of_loses
    refresh['level'] = obj.level
    refresh['status'] = obj.online
    refresh['number_of_wins_pong'] = obj.number_of_wins_pong
    refresh['number_of_wins_hunter'] = obj.number_of_wins_hunter


    if otp:
        refresh['2fa'] = otp.confirmed
    else :
        refresh['2fa'] = False

    if obj.Oauth_from != "registre":
        pic = str(obj.picture) #here i can handle it witout parsing
        decoded_url = unquote(pic)

        refresh['picture'] = decoded_url
    else:
        refresh['picture'] = str(obj.picture)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def set_secure_cookie(response, param):
    response.set_cookie (
            'access_token',
            param['access'],
            secure=True,
            samesite='None'
        )
    response.set_cookie (
            'refresh_token',
            param['refresh'],
            httponly=True,
            secure=True,  
            samesite='None'
        )
    return response


def save_database(user_info, checker, access_token):
    if not user_pro.objects.filter(id_user = user_info['id']).exists():     
        if checker == 1:
            if not user_pro.objects.filter(email = user_info['email']).exists():
                id_user = user_info['id']
                username = user_info['given_name']
                first_name = user_info['given_name']
                last_name = user_info['family_name']
                email = user_info['email']
                picture = user_info['picture']
                Oauth_from = "Google"
            else:
                raise ValueError('Email already Exists()')
        else:
            id_user = user_info['id']
            username = user_info['login']
            first_name = user_info['first_name']
            last_name = user_info['last_name']
            email = user_info['email']
            picture = user_info['image']['link']
            Oauth_from = "Intra 42"
        db = user_pro(id_user=id_user, username=username,first_name=first_name,last_name=last_name,email=email,Oauth_from=Oauth_from)#picture=picture
        db.save()
        save_image(picture, username )
        return (db)
    return(None)

from urllib.parse import urlparse

def Api_request_Auth(request):

    parsed_url = urlparse(request.build_absolute_uri())

    hostname = parsed_url.hostname

    base_url = "https://api.intra.42.fr/oauth/authorize"

    redirect_uri = f"https://{hostname}:4443/LandingPage"


    params = {
        "client_id": settings.SOCIAL_AUTH_42_KEY,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "public",
        "state": "My-Random_string"
    }
    authorization_url = base_url + "?" + "&".join(f"{k}={quote(v)}" for k, v in params.items())
    return redirect(authorization_url)

def checker_otp(obj):
    if obj:
        if obj.confirmed == True:
            return True
        else:
            return False
    else:
        return False


def auth(request):
    data = json.loads(request.body)
    code = data.get('code')
    parsed_url = urlparse(request.build_absolute_uri())

    hostname = parsed_url.hostname
    redirect_uri = f"https://{hostname}:4443/LandingPage"
    try:
        access_token_url = 'https://api.intra.42.fr/oauth/token'
        api_url = 'https://api.intra.42.fr/v2/me'

        data = {
            'grant_type': 'authorization_code',
            'client_id': settings.SOCIAL_AUTH_42_KEY,
            'client_secret': settings.SOCIAL_AUTH_42_SECRET,
            'code': code,
            'redirect_uri': redirect_uri,
        }
        # =============== Handle OAuth =====================
        response = requests.post(access_token_url, data=data)
        if response.status_code == 200:
            access_token = response.json()['access_token']

            headers = {'Authorization': f'Bearer {access_token}'}
            user_info_response = requests.get(api_url, headers=headers)
            user_info = user_info_response.json()

            user = save_database(user_info, 0, access_token)
            if user is None:
                user = user_pro.objects.filter(id_user = user_info['id'])
                user = user.get()
            
            user.backend = 'allauth.account.auth_backends.AuthenticationBackend'
            login(request, user)

            otp_check = checker_otp(TOTPDevice.objects.filter(user=user).first())

            if otp_check == False:
                param = get_tokens_for_user(user)

                responsee = JsonResponse({
                    'message': 'Data received successfully',
                    'access_token': param['access'],
                    'refresh_token': param['refresh'],
                })

                set_secure_cookie(responsee, {'access': param['access'], 'refresh': param['refresh']})
                return responsee
            else:
                return JsonResponse({'message': '2FA are enabled'}, status=200)
        else:
            return HttpResponseBadRequest("Not Found Bad")
        # =============== Handle OAuth =====================
    except requests.exceptions.RequestException as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#====================================== Handle Google OAuth =======================================

def google_OAth(request):

    parsed_url = urlparse(request.build_absolute_uri())

    hostname = parsed_url.hostname

    base_url = "https://accounts.google.com/o/oauth2/v2/auth"
    
    redirect_uri = f"https://{hostname}:4443/LandingPage"

    params = {
        "response_type": "code",
        "client_id": settings.SOCIAL_AUTH_GOOGLE_KEY,
        "redirect_uri": redirect_uri,
        "scope": "profile email",
        "access_type": "offline",
    }
    authorization_url = base_url + "?" + "&".join(f"{k}={quote(v)}" for k, v in params.items())
    return redirect(authorization_url)

def google_callback(request):
    data = json.loads(request.body)
    code = data.get('code')

    parsed_url = urlparse(request.build_absolute_uri())

    hostname = parsed_url.hostname
    redirect_uri = f"https://{hostname}:4443/LandingPage"

    try:
        url_token = "https://oauth2.googleapis.com/token"
        url_fetch = "https://www.googleapis.com/oauth2/v1/userinfo"
        
        list_param = {
            'code' : code,
            'client_id' : settings.SOCIAL_AUTH_GOOGLE_KEY,
            'client_secret' : settings.SOCIAL_AUTH_GOOGLE_SECRET,
            'redirect_uri' : redirect_uri,
            'grant_type' : 'authorization_code',
        }
        # =============== Handle OAuth =====================
        response = requests.post(url_token, data=list_param)
        if response.status_code == 200:
            access_token = response.json()['access_token']

            headers = {'Authorization': f'Bearer {access_token}'}
            user_info_response = requests.get(url_fetch, headers=headers)
            user_info = user_info_response.json()

            try:
                user = save_database(user_info, 1, access_token)
            except ValueError as e:
                return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            if (user is None):
                user = user_pro.objects.filter(id_user = user_info['id'])
                user = user.get()

            user.backend = 'allauth.account.auth_backends.AuthenticationBackend'
            login(request, user)

            otp_check = checker_otp(TOTPDevice.objects.filter(user=user).first()) 

            if otp_check == False:
                param = get_tokens_for_user(user)

                responsee = JsonResponse({
                    'message': 'Data received successfully',
                    'access_token': param['access'],
                    'refresh_token': param['refresh'],
                })

                set_secure_cookie(responsee, {'access': param['access'], 'refresh': param['refresh']})
                return responsee
            else:
                return JsonResponse({'message': '2FA are enabled'}, status=200)
    except requests.exceptions.RequestException as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)