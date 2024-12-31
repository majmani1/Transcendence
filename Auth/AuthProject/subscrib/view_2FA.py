from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.http import *
from subscrib.models import *
from rest_framework import status
from subscrib.view_OAuth import *
from .serializers import *
from .serializers import VerifyTOTPSerializer
from django_otp.plugins.otp_totp.models import TOTPDevice

class Enable2FAView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        device = TOTPDevice.objects.filter(user=user).first()
        if device and device.confirmed:
            return Response({"detail": "2FA already enabled."}, status=status.HTTP_400_BAD_REQUEST)
        device = TOTPDevice.objects.create(user=user, confirmed=False)
        
        
        serializer = TOTPSerializer(device)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class Verify2FAView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = VerifyTOTPSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            device = TOTPDevice.objects.filter(user=request.user, confirmed=False).first()

            if device:
                device.confirmed = True
                device.save()
                user = get_object_or_404(user_pro, username = request.user.username)
                param = get_tokens_for_user(user)
                responsee = JsonResponse({
                    'message': 'Data received successfully',
                    'access_token': param['access'],
                    'refresh_token': param['refresh'],
                })

                set_secure_cookie(responsee, {'access': param['access'], 'refresh': param['refresh']})
                return responsee
            return Response({"detail": "2FA successfully enabled."}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Verify_active_2FA(APIView):
    def post(self, request):
        serializer = VerifyActiveTOTPSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            session_id = request.COOKIES.get('sessionid')
            if session_id:
                session = Session.objects.get(session_key=session_id)
                session_data = session.get_decoded()
                user = session_data.get('_auth_user_id')

            device = TOTPDevice.objects.filter(user=user, confirmed=True).first()
            if device:
                # send cookies :
                user = user_pro.objects.get(id=user)
                stri = get_tokens_for_user(user)

                response = JsonResponse({
                    'message': 'Data received successfully',
                    'access': stri['access'],
                    'refresh': stri['refresh'],
                })
                response = set_secure_cookie(response, stri)
                return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.generics import DestroyAPIView


class Disable2FAView(DestroyAPIView):
    permissions_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        user = request.user
        device = TOTPDevice.objects.filter(user=user).first()
        if device:
            device.delete()

            stri = get_tokens_for_user(user)
            response = JsonResponse({
                'detail': '2FA successfully disabled',
                'access': stri['access'],
                'refresh': stri['refresh'],
            })
            response = set_secure_cookie(response, stri)

            return response
        return Response({"detail": "2FA is not enabled."}, status=status.HTTP_400_BAD_REQUEST)