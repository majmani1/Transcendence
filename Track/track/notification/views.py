from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from channels.layers import get_channel_layer
from .models import *
from .serializers import *
import requests
from django.core.exceptions import PermissionDenied

def Authorization(request):
   auth_header = request.headers.get("Authorization")
   if not auth_header or not auth_header.startswith("Bearer "):
      raise PermissionDenied("Authorization token is missing or invalid.")

   token = auth_header.split(" ")[1]

   auth_service_url = "https://localhost:4443/Authe/user/Autorization_service"  # Update with actual URL
   try:
      res = requests.post(auth_service_url, headers={"Authorization": f"Bearer {token}"})
      if res == 200:
         # print('\n\n',res.body,'\n\n')
         return True
      else :
         print('\n\n||||||||||||||||||||||||\n\n')
         raise PermissionDenied("token is not valid.")
   except Exception as e:
      return str(e)

def get_friend_request(request):
   header = request.headers.get("Authorization")
   token = header.split(" ")[1]
   url = "http://Auth:9080/Authe/user/friend/request/list"
   
   return requests.get(url, headers={"Authorization": f"Bearer {token}"})


# @csrf_exempt
# def NotifModel(request, to):
#    try:
#       Authorization(request)
#    except PermissionDenied as e:
#       return JsonResponse(str(e), status=401, safe=False)
   
#    try :
#       if request.method == 'GET':
#          notifs = Notification.objects.filter(notifTo=to)
#          serializer = Notifs(notifs, many=True)
#          data = get_friend_request(request)
#          # data = data.json()
#          print('\n\n-------------------', data.json(), '\n\n')
#          return JsonResponse(serializer.data, status=200, safe=False)
#       if request.method == 'POST':
#          data = json.loads(request.body)
#          notif, create = Notification.objects.get_or_create(notifFrom=data['from'], notifTo=data['to'], typeOfNotif=data['type'], groupName=data['groupName'], sender=data['sender'])
#          if(not create):
#             return JsonResponse({'status': 'success'},status=200)
#          else:
#             return JsonResponse({'status': 'already exist'},status=200)
#       if request.method == 'PUT':
#          notif = Notification.objects.remove(notifFrom=data['from'], notifTo=data['to'], typeOfNotif=data['type'], groupName=data['groupName'])
#          return JsonResponse({'status': 'success'},status=200)
#    except Exception as e:
#       print("______________________________")
#       print(str(e))
#       print("______________________________")
#       return JsonResponse({'status': str(e)},status=400)

@csrf_exempt
def NotifModel(request, to):
   try:
      Authorization(request)
   except PermissionDenied as e:
      return JsonResponse(str(e), status=401, safe=False)
   
   try : 
      if request.method == 'GET':
         notifs = Notification.objects.filter(notifTo=to)
         serializer = Notifs(notifs, many=True)
         # print('\n\n', serializer.data, '\n\n')
         data = get_friend_request(request)
            
         if data.status_code == 200:
            friend_requests = data.json()
         else:
            friend_requests = {"error": "Unable to fetch friend requests"}
         combined_data = {
            "group_request": serializer.data,
            "friend_requests": friend_requests
         }

         return JsonResponse(combined_data, status=200, safe=False)
      if request.method == 'POST':
         data = json.loads(request.body)
         notif, create = Notification.objects.get_or_create(notifFrom=data['from'], notifTo=data['to'], typeOfNotif=data['type'], groupName=data['groupName'], sender=data['sender'])
         if(create):
            return JsonResponse({'status': 'success'},status=200)
         else:
            return JsonResponse({'status': 'already exist'},status=200)
      if request.method == 'PUT':
         data = json.loads(request.body)
         notif = Notification.objects.filter(notifFrom=data['from'], notifTo=data['to'], typeOfNotif=data['type'], groupName=data['groupName'])
         if notif.exists():
            notif.delete()
         return JsonResponse({'status': 'success'},status=200)
   except Exception as e:
      # print("______________________________")
      # print(str(e))
      # print("______________________________")
      return JsonResponse({'status': str(e)},status=400)

@csrf_exempt
async def notification(request):
   try:
      Authorization(request)
   except PermissionDenied as e:
      return JsonResponse(str(e), status=401, safe=False)
   # print(request.method )
   if request.method == 'POST':
      post_data = json.loads(request.body.decode('utf-8'))
      channel_layer = get_channel_layer()

      if post_data['notif'] == 'message' :
         await channel_layer.group_send(
            post_data['receiver'],
            {
               'type': 'message_notif',
               'receiver' : post_data['receiver'],
               'sender':post_data['sender_name'],
               'sender_id':post_data['sender'],
               'typeOfNotif': 'msgReceive'
            }
         )
      elif post_data['notif'] == "invite to game" or post_data['notif'] == "invite to group" or post_data['notif'] == "Accept Game":
         await channel_layer.group_send(
            post_data['receiver'],
            {
               'type' : 'invite_to_game_or_group',
               'sender_id' : post_data['sender'],
               'sender_username': post_data['sender_name'],
               'receiver_id' : post_data['receiver'],
               'typeOfNotif': post_data['notif'] ,
               'groupName' : post_data['groupName'],
            }
         )
      elif post_data['notif'] == 'Friend_request':
      #   print('\n\n\n', " friend request \n\n\n")
        target_user_id = post_data['receiver']  # ID of the user you want to send the message to        
        from_user_id = post_data['sender']
        sender_username = post_data['sender_name']

        await channel_layer.group_send(
            post_data['receiver'],  # Sending message to target user’s group
            {
                'type': 'send_notification',
                'notification': f'Friend request is send',
                'from_user': from_user_id,
                'target': target_user_id,
                'typeOfNotif': post_data['notif'],
                'sender_username':sender_username,
            }
        )
      elif post_data['notif'] == 'MsgToSpoody':
         await channel_layer.group_send(
            post_data['receiver'],
            {
               'type' : 'message_to_spody',
               'typeOfNotif': post_data['notif'],
               'msg': post_data['msg'], 
            }
         )
      elif post_data['notif'] == 'accept_freind' or post_data['notif'] == 'remove_freind' or post_data['notif'] == 'accept_group':
         await channel_layer.group_send(
            post_data['receiver'],
            {
               'type' : 'accept_freind',
               'typeOfNotif': post_data['notif'],
               'picture': post_data['picture'],
               'sender':post_data['sender']
            }
         )
      else:
         # print('\n\n\n', " Nooooooooonnnnneee \n\n\n")
         await channel_layer.group_send(
            post_data['receiver'],
            {
               'type' : 'mute_notif',
               'typeOfNotif': post_data['notif'] 
            }
         )
      return JsonResponse({'status': 'success'},status=200)

   else:
      return HttpResponse(status=400)
# Create your views here.

import requests

async def status_connected(id):
   try:
      resp = requests.patch(f'http://Auth:9080/user/online/connected/{id}/')
      channel_layer = get_channel_layer()
      if resp.status_code == 200:
         try:
            data = resp.json()
            #================================================
            user = data.get('user', 'No user')
            # print(f"User: {user}")

            # Access and iterate through the 'friends' list
            friends = data.get('friends', [])
            for friend in friends:
               # print(f"Friend ID: {friend}")
               friend_id = friend.get('id', 'No ID')
               await channel_layer.group_send(
                  friend_id,
                  {
                     'type' : 'update_status',
                     'typeOfNotif': 'statusUpdate',
                     'username':user,
                     'color' :'var(--border-color)'
                  }
         )
               
            #================================================
            
         except ValueError:
            print('\n\n', "Response is not JSON serializable", '\n\n')
      else:
         print(f"Request failed with status: {resp.status_code}")
   except requests.exceptions.RequestException as e:
      print(f"HTTP Request failed!!!!!!!!!: {e}")

async def status_desconnected(id):
   try:
      resp = requests.patch(f'http://Auth:9080/user/online/desconnected/{id}/')
      channel_layer = get_channel_layer()
      if resp.status_code == 200:
         try:
            data = resp.json()
            #================================================
            user = data.get('user', 'No user')
            # print(f"User: {user}")

            # Access and iterate through the 'friends' list
            friends = data.get('friends', [])
            for friend in friends:
               friend_id = friend.get('id', 'No ID')
               await channel_layer.group_send(
                  friend_id,
                  {
                     'type' : 'update_status',
                     'typeOfNotif': 'statusUpdate',
                     'username':user,
                     'color' :'gray'
                  }
               )
               # print(f"Friend ID: {friend_id}")
            #================================================
            
         except ValueError:
            print('\n\n', "Response is not JSON serializable", '\n\n')
      else:
         print(f"Request failed with status: {resp.status_code}")
   except requests.exceptions.RequestException as e:
      print(f"HTTP Request failed!!!!!!!!!: {e}")