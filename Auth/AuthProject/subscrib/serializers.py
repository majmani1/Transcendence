from rest_framework.validators import ValidationError
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import *
import re

def validate_username(value):
    user = user_pro.objects.filter(username = value)
    if user.exists():
        raise ValidationError("Username already exists.")
    pattern = r"^[A-Za-z0-9_\-]{3,8}$"
    if not re.match(pattern, value):
        raise ValidationError('Username Not Valid')
    return value

def validate_password(value):
    if len(value) < 8:
        raise ValidationError("Password must be at least more than 8 characters.")
    passw = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[@\-_]).+$'
    if not re.match(passw, value):
        raise serializers.ValidationError("Enter a valid password.")
    return value

def validate_email(value):
    user = user_pro.objects.filter(email = value)
    if user.exists():
        raise ValidationError("Email already exists.")
    pattern = r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
    if not re.match(pattern, value):
        raise ValidationError('Email Not Valid')
    return value

def validate_password(value):
    pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!^&*])[A-Za-z\d@#$%!^&*]{8,}$"
    if not re.match(pattern, value):
        raise ValidationError('Password not valid')
    return value

def validate_first_last_name(value):
    if len(value) < 3 or len(value) > 20:
        raise serializers.ValidationError("The string should contains only letters and is between 3 and 20 characters long.")
    return 
#

class registreS(serializers.ModelSerializer):
    username = serializers.CharField(
                required = True,
                validators=[validate_username]
    )

    first_name = serializers.CharField(
                   required = True,
                   validators=[validate_first_last_name]
    )
    
    last_name = serializers.CharField(
                   required = True,
                   validators=[validate_first_last_name]
    )

    email = serializers.EmailField(
                   required = True,
                   validators=[validate_email]
        )


    password = serializers.CharField(
                   required = True,
                   write_only=True,
                   validators=[validate_password]
        )

    class Meta:
        model = user_pro
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'Oauth_from']

    def create(self, validated_data):
        user = user_pro(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            Oauth_from='registre',
            picture='/undefined.jpg',
            # password= make_password(validated_data['password'])
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

from django.contrib.auth import authenticate

class loginS(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = user_pro
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'username': {'required': False},  # Make username optional
        }

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        error = {}

        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                user = authenticate(email=email, password=password)
            if user:
                data['user'] = user
            else:
                if not user_pro.objects.filter(email = email).exists():
                    error['email'] = ("email or username not exists")
                else:
                    error['password'] = ("Invalid password")
        else:
            if not email:
                error['email'] = ("Should Entre Email or Username")
            elif not password :
                error['password'] = ("Should Entre Password")
        if error:
            raise ValidationError(error)
        return data

from django.contrib.auth import logout

class logoutS(serializers.ModelSerializer):
    class Meta:
        model = user_pro
        fields = []
    
class get_data_frontS(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    class Meta:
        model = user_pro
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'number_of_wins_pong', 'number_of_wins_hunter', 'picture', 'number_of_games', 'number_of_wins', 'number_of_loses', 'level', 'online']
    def get_picture(self, obj):
        return ('/Auth/imageLandscape' + str(obj.picture.url)) if obj.picture else None

class FriendListSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    class Meta:
        model = user_pro
        fields = ['username','first_name', 'last_name', 'picture', 'number_of_wins_pong', 'number_of_wins_hunter', 'id', 'online', 'number_of_games', 'number_of_wins', 'number_of_loses', 'level']

    def get_picture(self, obj):
        return ('/Auth/imageLandscape' + str(obj.picture.url)) if obj.picture else None

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['from_user', 'to_user', 'timestamp']

class FriendStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_pro
        fields = ['id']

class FriendId(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    class Meta:
        model = user_pro
        fields = ['id', 'picture', 'status_player', 'number_of_games', 'number_of_wins_pong', 'number_of_wins_hunter', 'number_of_wins', 'number_of_loses', 'level']
	
    def get_picture(self, obj):
        return ('/Auth/imageLandscape' + str(obj.picture.url)) if obj.picture else None


class Update_Profile(serializers.ModelSerializer):
    class Meta:
        model = user_pro
        fields = ['username', 'first_name', 'last_name', 'email', 'picture']
    
class user_token_info(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()
    
    class Meta:
        model = user_pro
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'level', 'number_of_games', 'number_of_wins', 'number_of_loses', 'number_of_wins_pong', 'number_of_wins_hunter', 'status_player', 'online', 'picture']

    def get_picture(self, obj):
        print('\n\n\n',obj.picture.url,'\n\n\n')
        return ('/Auth/imageLandscape' + str(obj.picture.url)) if obj.picture else None


import base64
import urllib.parse
from django_otp.plugins.otp_totp.models import TOTPDevice
from rest_framework import serializers

class TOTPSerializer(serializers.ModelSerializer):
    otp_uri = serializers.SerializerMethodField()

    class Meta:
        model = TOTPDevice
        fields = ['id', 'user', 'name', 'confirmed', 'otp_uri']

    def get_otp_uri(self, obj):
        user = obj.user.username
        service = "MyApp"
        label = f"{user}@{service}"

        secret = obj.bin_key
        secret_b32 = base64.b32encode(secret).decode('utf-8').strip('=')
        issuer = service

        otp_uri = f"otpauth://totp/{urllib.parse.quote(label)}?secret={secret_b32}&issuer={urllib.parse.quote(issuer)}&algorithm=SHA1&digits=6&period=30"
        return otp_uri

import base64
import pyotp
# import time
# from django.utils import timezone

class VerifyTOTPSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, data):
        user = self.context['request'].user
        device = TOTPDevice.objects.filter(user=user, confirmed=False).first()

        if not device:
            raise serializers.ValidationError("No unconfirmed device found for this user.")

        # Print the raw binary secret key during verification
        # print(f"Raw Binary Secret (bin_key) during verification: {device.bin_key}")
        # Encode the binary key to Base32

        base32_secret = base64.b32encode(device.bin_key).decode('utf-8').strip('=')
        
        # print(f"Base32 Encoded Secret during verification: {base32_secret}")
        # Create a TOTP object and verify the token

        totp = pyotp.TOTP(base32_secret)
        # expected_token = totp.now()
        # print(f"Expected Token: {expected_token}")

        # Allow time skew (valid_window=2)
        if not totp.verify(data['token'], valid_window=2):
            raise serializers.ValidationError("Invalid or expired token")

        return data

from django.contrib.sessions.models import Session

class VerifyActiveTOTPSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, data):
        user = self.context['request'].user
        session_id = self.context['request'].COOKIES.get('sessionid')
        if session_id:
            session = Session.objects.get(session_key=session_id)
            session_data = session.get_decoded()
            user = session_data.get('_auth_user_id')
        else:
            raise serializers.ValidationError("There is a problem in 2fa")

        device = TOTPDevice.objects.filter(user=user, confirmed=True).first()
        if not device:
            raise serializers.ValidationError("No confirmed device found for this user.")

        # Debugging
        # print(f"Provided Token:--{data['token']}--")
        # print(f"Device Secret: {device.bin_key}")

        # Base32 encode the secret key
        base32_secret = base64.b32encode(device.bin_key).decode('utf-8')
        # print(f"Base32 Encoded Secret: {base32_secret}")

        # Create a TOTP object and verify the token
        totp = pyotp.TOTP(base32_secret)
        if not totp.verify(data['token'], valid_window=1):  # Allow a small time window for skew
            raise serializers.ValidationError("Invalid or expired token")

        return data
