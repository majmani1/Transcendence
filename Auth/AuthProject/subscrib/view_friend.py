from django.shortcuts import get_object_or_404
from django.http import *
from subscrib.models import *
import json
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from subscrib.view_OAuth import *
from .serializers import *
from rest_framework.generics import CreateAPIView
from rest_framework.generics import ListAPIView


class friend_request(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        body = json.loads(request.body)
        user_fr = body.get('user_friend')

        to_user = get_object_or_404(user_pro, username=user_fr)

        from_user = request.user
        # -------  check if the user is already friend of hem or not -------
        if to_user in from_user.friends.all():
            return JsonResponse({"error": "Users are already friends"}, status=409)

        if not FriendRequest.objects.filter(from_user=from_user, to_user=to_user).exists() and not FriendRequest.objects.filter(from_user=to_user, to_user=from_user).exists():
            request.user.send_friend_request(to_user)
            return JsonResponse({'from':from_user.id, 'into':to_user.id, 'username_sender':from_user.username}, status=200)
        else:
            return JsonResponse({'from':from_user.id, 'into':to_user.id, 'username_sender':from_user.username}, status=201)

# =====================  end of process  ==========================

# ===================  Friend Request List  =====================

class friend_request_list(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendRequestSerializer

    def get(self, request):
        try:
            user = self.request.user
            user_profile = user_pro.objects.get(username=user.username)
            obj = FriendRequest.objects.filter(to_user=user_profile)
            data = []
            for friend_request in obj:
                data.append({
                    'from_user': friend_request.from_user.username,
                    'to_user': friend_request.to_user.username,
                    'timestamp': friend_request.timestamp,
                    'content': 'A friend request from '
                })
            return Response(data, status=200)
        except user_pro.DoesNotExist:
            data = {
                'message': 'Try Again Later',
            }
            return JsonResponse(data, status=200)

# ===================  end of process  ============================

# ===================  Friend Accept Request  =====================
from rest_framework.generics import UpdateAPIView

class friend_accept(UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        try:
            body = request.data 
            how_sent = body.get('from')
            how_receive = body.get('into')

            how_sent = get_object_or_404(user_pro, username=how_sent)
            how_receive = get_object_or_404(user_pro, username=how_receive)

            if not how_sent.friends.filter(id=how_receive.id).exists():
                how_sent = how_sent.id
                how_receive = how_receive.id


                friend_request = get_object_or_404(FriendRequest, from_user=how_sent, to_user=how_receive)
                request.user.accept_friend(friend_request.from_user)
                return JsonResponse({'message': 'good'}, status=200)
            else:
                friend_request = get_object_or_404(FriendRequest, from_user=how_sent, to_user=how_receive)
                friend_request.delete()
                return JsonResponse({'message': 'already his friend '}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=201)

class friend_refuse(UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        body = request.data 
        how_sent = body.get('from')
        how_receive = body.get('into')

        how_sent = get_object_or_404(user_pro, username=how_sent)
        how_receive = get_object_or_404(user_pro, username=how_receive)

        how_sent = how_sent.id
        how_receive = how_receive.id

        req = get_object_or_404(FriendRequest, from_user=how_sent, to_user=how_receive)
        request.user.refuse_friend(req.from_user)

        return Response({'message': 'Friend request refused'}, status=status.HTTP_200_OK)

from rest_framework.generics import DestroyAPIView

class remove_friend(DestroyAPIView):
    queryset = user_pro.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        friend_username = self.kwargs.get('username')
        return get_object_or_404(user_pro, username=friend_username)

    def destroy(self, request,*args, **kwargs):
        try:
            friend = self.get_object()
            request.user.remove_friend(friend)
            return JsonResponse({'message': 'Friend removed successfully'}, status=204)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=404)


class list_friend(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendListSerializer

    def get_queryset(self):
        try:
            user = self.request.user
            user_profile = user_pro.objects.get(username=user.username)
            return user_profile.friends.all()
        except user_pro.DoesNotExist:
            data = {
                'message': 'Try Again Later',
            }
            return JsonResponse(data, status=200)


class friend_suggestion(ListAPIView): # two problem if text empty or if the same user
    permission_classes = [IsAuthenticated]
    serializer_class = FriendListSerializer

    def post(self, request):
        body = json.loads(request.body)
        users = body.get('user_friend')
        if users:
            to_user = user_pro.objects.filter(username__istartswith=users)
            if not to_user.exists():
                return JsonResponse({"error": "Not Found"}, status=200)
            else:
                serializer = self.serializer_class(to_user, many=True)

                data = serializer.data
                data = list(data)
                for user in data[:]:
                    us = request.user
                    check = us.friends.all().filter(username=user['username'])
                    if user['username'] == request.user.username or check:
                        data.remove(user)
                return Response(data, status=200)
        else:
            return JsonResponse({"error": "Not Found"}, status=200)


