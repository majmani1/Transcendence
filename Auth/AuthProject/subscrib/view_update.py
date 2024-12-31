from django.http import *
from subscrib.models import *
import json
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from subscrib.views import *
import os

def validate_username(value, id):
    user = user_pro.objects.filter(username = value)
    if user.exists() and user[0].id != id:
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

def validate_email(value, id, username):
    user = user_pro.objects.filter(email = value)

    if user.exists() and user[0].id != id:
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

def validate_picture(value):
    if value:
        max_size = 2 * 1024 * 1024  # 2MB
        if value.size > max_size:
            raise ValidationError("Picture size should not exceed 2MB.")
        if not value.name.endswith(('jpg', 'jpeg', 'png')):
            raise ValidationError("Only jpg, jpeg, and png files are allowed.")
    return value


class update_profile(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = user_pro.objects.all()
    serializer_class = Update_Profile

    def update(self, request, *args, **kwargs):
        user_id = self.kwargs.get('id')
        
        instance = get_object_or_404(user_pro, id=user_id)
        
        data = request.data
        
        username = data.get('Username')
        first_name = data.get('firstName')
        last_name = data.get('Last_name')
        email = data.get('email')
        password = data.get('password')
        picture = request.FILES.get('picture')
        
        old_img = None
        if username:
            validate_username(username, user_id)
            instance.username = username
        if first_name:
            validate_first_last_name(first_name)
            instance.first_name = first_name
        if last_name:
            validate_first_last_name(last_name)
            instance.last_name = last_name
        if email:
            validate_email(email, user_id, username)
            instance.email = email
        if password:
            validate_password(password)
            instance.set_password(password)
        if picture:
            validate_picture(picture)
            file_path = os.path.join(settings.MEDIA_ROOT, picture.name)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)

            with open(file_path, 'wb+') as destination:
                for chunk in picture.chunks():
                    destination.write(chunk)

            old_img = instance.picture.name
            username = instance.username
            new_img = picture.name
            fromm = instance.Oauth_from
            instance.picture = f'{picture.name}'
        try:
            instance.save()
            if old_img:
                check_old_image(old_img, new_img, username, fromm)
            tokens = get_tokens_for_user(instance)
            resp = JsonResponse({
                'success': 'Profile updated successfully',
                'data': {
                    'username': instance.username,
                    'email': instance.email
                }
            }, status=status.HTTP_200_OK)
            resp = set_secure_cookie(resp, tokens)
            return resp
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

def check_old_image(old_img, new_img,username, fromm):
    user = user_pro.objects.get(username=username)
    if user:
        try:
            path_file = '/AuthProject/Avatars/'
            if fromm != 'registre' :
                os.remove(path_file + old_img)
                os.rename(path_file + new_img, path_file + old_img)
                user.picture.name = old_img
                user.save()
            elif fromm == 'registre' and old_img != 'undefined.png': 
                os.remove(path_file + old_img)
        except OSError as e:
            print(f"\n\nError deleting the image: {e}\n\n   ")

class reset_password(APIView):
    def patch(self, request):
        body = json.loads(request.body)
        email = body.get('email')
        
        try:
            user = user_pro.objects.get(email=email)
        except user_pro.DoesNotExist:
            return Response({"No user found with this email."}, status=404)
        
        passw = generate_new_pass()
        user.set_password(passw)
        user.save()
        
        reset_link = passw
        try:
            send_mail(
                "Password Reset Request",
                f"Click the link below to reset your password:\n\n{reset_link}",
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
            return Response({"message": "Email sent successfully."}, status=200)
        except Exception as e:
            print(f"Error: {e}")
            return Response({"error": "Email could not be sent."}, status=500)

import random
import string

def generate_new_pass():
    lower = random.choices(string.ascii_lowercase)
    upper = random.choices(string.ascii_uppercase)
    spc = random.choices("@-_")

    stri = random.choices(string.ascii_letters , k=7)

    res = list(lower + upper + spc + stri)
    random.shuffle(res)
    return ''.join(res)