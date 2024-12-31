from django.shortcuts import render
# from .models import chat_mesg
from .forms import *
from .models import *
from rest_framework.parsers import JSONParser
from django.http import JsonResponse, HttpResponse
from .serializers import *
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
import json
from django.db.models import Q
import requests
from django.core.exceptions import PermissionDenied
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password


def Authorization(request):
   auth_header = request.headers.get("Authorization")
   if not auth_header or not auth_header.startswith("Bearer "):
      raise PermissionDenied("Authorization token is missing or invalid.")

   token = auth_header.split(" ")[1]

   auth_service_url = "https://localhost:4443/Authe/user/Autorization_service"  # Update with actual URL
   try:
      res = requests.post(auth_service_url, headers={"Authorization": f"Bearer {token}"})
      if res == 200:
         return True
      else :
         raise PermissionDenied("token is not valid.")
   except Exception as e:
      return str(e)

# from subscrib.models import Auth_42

def home(request):
    # auth = Auth_42.objects.all()
    return render(request, 'chat.html')

def pages(request):
    sender = 'Anonymous'
    if request.method == 'GET':
        sender = request.GET.get('sender', 'Anonymous')
    # message = request.POST.get('message')
    # if request.method == 'POST':
    #     data = typing(request.POST)
    #     data.save(), 'lf' : typing
    messages = chat_mesg.objects.all()
    # auth = Auth_42.objects.all()
    return render(request, 'testChat.html', {'messages' : messages, 'sender' : sender})
# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class apii(APIView):
    def get(self, request, format=None):
        msgs = chat_mesg.objects.all()
        serializer = msgSerializer(msgs, many=True)
        return Response(serializer.data)
    def post(self, request, format=None):
        serializer = msgSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
class apimethods(APIView):
    def get_object(self, id):
        try:
            return chat_mesg.objects.get(id=id)
        except DoesNotExist:
            return HttpResponse(status=404)
    def get(self, request, id):
        msg = self.get_object(id)
        serializer = msgSerializer(msg)
        return Response(serializer.data)
    def delete(self, request, id):
        msg = self.get_object(id)
        msg.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@csrf_exempt
def allApi(request) :
    if request.method == 'GET':
        msg = chat_mesg.objects.all()
        serializer = msgSerializer(msg, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        parse = JSONParser()
        data = parse.parse(request)
        serializer = msgSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(status=201)
        return HttpResponse(status=400)
        # if serializer.is_valide():
def api(request, pk) :
    
        try :
            msg = chat_mesg.objects.get(pk=pk)
        except chat_mesg.DoesNotExist :
            return HttpResponse(status=404)
        if request.method == 'GET':
            serializer = msgSerializer(msg)
            return JsonResponse(serializer.data, safe=False)

# @csrf_exempt
class get_users(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        if request.method == 'GET' :
            users = User.objects.all()
            serializer = fetchUser(users, many=True)
            return JsonResponse(serializer.data, safe=False)
    
class is_owner(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request, user, groupName):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try :
            User = GroupUsers.objects.get(user=user, groupNameUser=groupName)
            if User.owner:
                return JsonResponse({'owner':True, 'admin':True},status=200)
            else :
                if User.admin :
                    return JsonResponse({'owner':False, 'admin':True},status=200)
                return JsonResponse({'owner':False, 'admin':False},status=200)
        except Exception as e:
            # print("is_owner==============\n\n",str(e), "===================\n\n")
            return HttpResponse(status=400)


class is_protected(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request, groupName):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try :
            group = Groups.objects.get(groupName=groupName)
            if group.typeOfGroup == 'protected':
                return JsonResponse({'type':'protected'},status=200)
            elif group.typeOfGroup == 'private':
                return JsonResponse({'type':'private'},status=200)
            else :
                return JsonResponse({'type':'public'},status=200)
        except :
            return HttpResponse(status=400)
        
class get_GroupUsers(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request, groupName):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        group = Groups.objects.get(groupName=groupName)
        user = group.users.all()
        serializer = fetchGroupUsers(user, many=True)
        return JsonResponse(serializer.data, safe=False)

class get_group(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request, user):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        user = GroupUsers.objects.filter(user=user)
        group = Groups.objects.filter(typeOfGroup__in=['public', 'protected'])
        group = group.exclude(users__in=user)
        serializer = fetchGrp(group, many=True)
        return JsonResponse(serializer.data, safe=False)
    def post(self,request, user):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        data = json.loads(request.body)
        groupName = data.get('groupName').strip()
        if groupName and groupName.find(' ') == -1 :
            if len(groupName) > 10:
                return JsonResponse({'status':'the name of group is too long'},status=200)
            if data['typeOfGroup'] == 'protected' and not data['password'].strip():
                return JsonResponse({'status':'can\'t create group type protected with empty password'},status=200)
            elif data['typeOfGroup'] == 'protected':
                code_hashed = make_password(data['password'].strip())
            else:
                code_hashed = ""
            group, create = Groups.objects.get_or_create(groupName=groupName)
            if not create:
                return JsonResponse({'status': 'this group is already exist retry with another name'},status=200)
            group.typeOfGroup = data['typeOfGroup']
            group.code = code_hashed
            group.save()
            default_user, create = GroupUsers.objects.get_or_create(user=data.get('user'), username=data.get('username'), picture=data.get('user_image'), owner=True, admin=True, groupNameUser=groupName)
            group.users.add(default_user)
            serializer = fetchGrp(group)
            return JsonResponse({'status':'success'},status=201)
        elif groupName.find(' ') != -1:
            return JsonResponse({'status':'the name of group have a space'},status=200)
        elif not groupName:
            return JsonResponse({'status':'can\'t create group with empty name'},status=200)
        # elif not data['password'].strip():
        #     return JsonResponse({'status':'can\'t create group type protected with empty password'},status=200)
    def put(self,request, user):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        data = json.loads(request.body)
        groupName = data.get('groupName')
        invite = data['invite']
        try:
            group = Groups.objects.get(groupName=groupName)
            if (group.users.filter(user=user, groupNameUser=groupName).exists() or group.users_baned.filter(user=user, groupNameUser=groupName).exists()) and not invite:
                return HttpResponse({'status', "You cannot enter this group"},status=200)
            else :
                # print("\n===========\n", "check_password(data.get('code'), group.code)", "\n\n========================\n\n")
                if (group.typeOfGroup == 'public' or group.typeOfGroup == 'private' or (group.typeOfGroup == 'protected' and check_password(data.get('code'), group.code))) or invite:
                    if not group.users.filter(user=user, username=data.get('username'),groupNameUser=groupName).exists():
                        userGroup, create = GroupUsers.objects.get_or_create(user=user,username=data.get('username'), groupNameUser=groupName)

                        userGroup.picture = data.get('user_image')
                        userGroup.save()
                        group.users.add(userGroup)
                        return JsonResponse({'status':'success'},status=200)
                    return HttpResponse({'status', "You are already in this group."},status=200)
                else :
                    return JsonResponse({'status':'Password does not match.'},status=200)
        except Exception as e:
        #    print("\n===========\n", str(e), "\n\n========================\n\n")
           return JsonResponse({'status':'Password does not match!!!!!!!!!!'},status=200)

# class getUserToInvite(APIView):
#     # permission_classes = [IsAuthenticated]
#     def put(self,request, groupName):
#         try:
#             data = json.loads(request.body)
#             group = Groups.objects.get(groupName=groupName)
#             group_user = group.users.all().values_list('user', flat=True)
#             group_user_ids = set(map(int, group_user))
#             user_not_in_group = set(data) - group_user_ids
#             # user_not_in_group = set(data) - set(group_user)
#             # user_ids_in_group = group_user.values_list('user', flat=True)
#             # users_not_in_group = GroupUsers.objects.exclude(user__in=user_ids_in_group)
            # print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n")
            # print(data)
            # print(group_user)
            # print(user_not_in_group)
            # print("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!")
#             #.exclude(user__in=group_user.values_list('user', flat=True)).distinct('user')
#             # response_data = list(user_not_in_group.values('user', 'username'))
#             return JsonResponse(list(user_not_in_group), safe=False)
#         except Exception as e:
            # print(str(e))
#             return HttpResponse(status=400)

class getUserToInvite(APIView):
    def put(self, request, groupName):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try:
            data = json.loads(request.body)
            group = Groups.objects.get(groupName=groupName)
            group_user = group.users.all().values_list('user', flat=True)
            group_user_ids = set(group_user)
            user_not_in_group = set(data) - group_user_ids
            return JsonResponse(list(user_not_in_group), safe=False)
        except Exception as e:
            return HttpResponse(status=400)
            

class GroupChanges(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request, typeOfChange):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        GroupUser = GroupUsers.objects.filter(user=typeOfChange)
        group = Groups.objects.filter(users__in=GroupUser)
        serializer = fetchGrp(group, many=True)
        return JsonResponse(serializer.data, safe=False)
    def put(self,request, typeOfChange):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        data = json.loads(request.body)
        if typeOfChange == 'leave_room':
            try:
                user = GroupUsers.objects.get(user=data['user'], groupNameUser=data['groupName'])
                group = Groups.objects.get(groupName=data['groupName'])
                group.users.remove(user)
                group.save()
                if group.users.count() == 0 :
                    group.users.all().delete()
                    group.delete()
                return HttpResponse(status=204)
            except:
                return HttpResponse(status=400)
        elif typeOfChange == 'kick_out':
            try :
                user = GroupUsers.objects.get(user=data['user'], groupNameUser=data['groupName'])
                if user.owner or user.admin:
                    group = Groups.objects.get(groupName=data['groupName'])
                    kick_user = GroupUsers.objects.get(user=data['kick_user'], groupNameUser=data['groupName'])
                    if(kick_user.owner):
                        return HttpResponse(status=400)
                    group.users.remove(kick_user)
                    kick_user.delete()
                    return HttpResponse(status=200)
                else :
                    return HttpResponse(status=403)
            except:
                return HttpResponse(status=400)
        elif typeOfChange == 'ban':
            try :
                user = GroupUsers.objects.get(user=data['user'], groupNameUser=data['groupName'])
                if user.owner or user.admin:
                    group = Groups.objects.get(groupName=data['groupName'])
                    kick_user = GroupUsers.objects.get(user=data['kick_user'], groupNameUser=data['groupName'])
                    if(kick_user.owner):
                        return HttpResponse(status=400)
                    group.users.remove(kick_user)
                    group.users_baned.add(kick_user)
                    return HttpResponse(status=200)
                else :
                    return HttpResponse(status=403)
            except:
                return HttpResponse(status=400)
        elif typeOfChange == 'mute' or typeOfChange == 'unmute':
            try:
                user = GroupUsers.objects.get(user=data['user'], groupNameUser=data['groupName'])
                if user.owner or user.admin:
                    mutedUser = GroupUsers.objects.get(user=data['mutedUser'], groupNameUser=data['groupName'])
                    if(mutedUser.owner):
                        return HttpResponse(status=400)
                    if typeOfChange == 'mute':
                        mutedUser.muteUser(data['time'])
                    elif typeOfChange == 'unmute':
                        mutedUser.unmuteUser()
                    return HttpResponse(status=200)
                return HttpResponse(status=400) 
            except:
                return HttpResponse(status=400)
        elif typeOfChange == 'checkStatus':
            try:
                user = GroupUsers.objects.get(user=data['user'], groupNameUser=data['groupName'])
                statusdelta = user.checkStatusOfMute()
                if statusdelta:
                    status = str(statusdelta)
                else:
                    status = 0
                return JsonResponse({'statusOfMute':status}, status=200)
            except:
                return HttpResponse(status=400)
        elif typeOfChange == 'giveAdmin' or typeOfChange == 'takeAdmin':
            try:
                user = GroupUsers.objects.get(user=data['user'], groupNameUser=data['groupName'])
                adminUser = GroupUsers.objects.get(user=data['targetUser'], groupNameUser=data['groupName'])
                if user.owner and user.user != adminUser.user:
                    if typeOfChange == 'giveAdmin':
                        adminUser.admin = True
                    elif typeOfChange == 'takeAdmin':
                        adminUser.admin = False
                    adminUser.save()
                    return HttpResponse(status=200)
                else :
                    return HttpResponse(status=400)
            except:
                return HttpResponse(status=400)
        elif typeOfChange == 'add' or typeOfChange == 'change' or typeOfChange == 'remove' :
            try :
                group = Groups.objects.get(groupName=data['groupName'])
                user = GroupUsers.objects.get(groupNameUser=data['groupName'], user=data['user'])
                if user.owner:
                    if typeOfChange == 'add' or typeOfChange == 'change':
                        group.code = data['code']
                        if typeOfChange == 'add':
                            group.typeOfGroup = 'protected'
                    else :
                        group.code = None
                        group.typeOfGroup = 'public'
                    group.save()
                    return HttpResponse(status=200)
                else:
                    return HttpResponse(status=400)
            except :
                return HttpResponse(status=400)

class get_groupMsg(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request, roomName):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        Group = Groups.objects.get(groupName=roomName)
        messages = GroupMessages.objects.filter(group=Group)
        serializer = fetchGroupMessages(messages, many=True)
        return JsonResponse(serializer.data, safe=False)
    
class get_privateMsgs(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request, sender, receiver):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try :
            private = private_chat.objects.get(sender=sender, receiver=receiver)
        except private_chat.DoesNotExist:
            try :
                private = private_chat.objects.get(sender=receiver, receiver=sender)
            except :
                private = private_chat.objects.create(sender=receiver, receiver=sender)
        messages = chat_mesg.objects.filter(chaaat=private)
        serializers = msgSerializer(messages, many=True)
        return JsonResponse(serializers.data, safe=False)



# @csrf_exempt
# def updateFieldVu(request, sender, receiver):
    # print("_______-----------", flush=True)
    # print(sender, flush=True)
    # print(receiver, flush=True)
    # print("_______-----------", flush=True)
#     try :
#         private = private_chat.objects.get(sender=sender, receiver=receiver)
#     except private_chat.DoesNotExist:
#         try:
#             private = private_chat.objects.get(sender=receiver, receiver=sender)
#         except Exception as e:
#             return JsonResponse({"unread_messages_count": 0}, safe=False)
#         messages = chat_mesg.objects.filter(chaaat=private, sender=receiver, vu=False).count()
#         return JsonResponse({"unread_messages_count": messages}, safe=False)
class updateFieldVu(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request, sender, receiver):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try :
            private = private_chat.objects.get(sender=sender, receiver=receiver)
        except private_chat.DoesNotExist:
            try:
                private = private_chat.objects.get(sender=receiver, receiver=sender)
            except Exception as e:
                return JsonResponse({"unread_messages_count": 0}, safe=False)
        messages = chat_mesg.objects.filter(chaaat=private, sender=receiver, vu=False).count()
        return JsonResponse({"unread_messages_count": messages}, safe=False)
    def put(self, request, sender, receiver) :
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try :
            private = private_chat.objects.get(sender=sender, receiver=receiver)
        except private_chat.DoesNotExist:
            try:
                private = private_chat.objects.get(sender=receiver, receiver=sender)
            except:
                private = private_chat.objects.create(sender=receiver, receiver=sender)
        messages = chat_mesg.objects.filter(chaaat=private, sender=receiver, vu=False)
        for chat in messages :
            chat.vu = True
            chat.save()
        return JsonResponse({'status': 'success'},status=200)

# @csrf_exempt
class onlinecount(APIView):
    # permission_classes = [IsAuthenticated]
    def put(self,request):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        private_chats = private_chat.objects.all()
        for private in private_chats:
            private.online = 0
            private.save()
        return JsonResponse({'status': 'success'},status=200)
# @csrf_exempt
class block(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self,request, sender, receiver, is_block):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try :
            private = private_chat.objects.get(Q(sender=sender, receiver=receiver) | Q(sender=receiver, receiver=sender))
        except private_chat.DoesNotExist:
            return JsonResponse({'is_block': 2}, safe=False)
        userBlock = private.checkuserblock(sender)
        return JsonResponse({'is_block': private.user_block.count(), 'userBlock':userBlock}, safe=False)
    def put(self,request, sender, receiver, is_block) :
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try :
            private = private_chat.objects.get(sender=sender, receiver=receiver)
        except private_chat.DoesNotExist:
            private = private_chat.objects.get(sender=receiver, receiver=sender)
        if bool(is_block) == 1:
            private.blockUser(sender)
        elif bool(is_block) == 0:
            private.unblockUser(sender)
        private.save()
        return JsonResponse({'status': 'success'},status=200)

class MsgToSpoody(APIView):
    def post(self, request):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try:
            post_data = json.loads(request.body.decode('utf-8'))
            try:
                self.private_chat = private_chat.objects.get(sender=post_data['sender'], receiver=post_data['receiver'])
            except private_chat.DoesNotExist:
                try :
                    self.private_chat = private_chat.objects.get(sender=post_data['receiver'], receiver=post_data['sender'])
                except private_chat.DoesNotExist:
                    self.private_chat = private_chat.objects.create(sender=post_data['sender'], receiver=post_data['receiver'])
            user_count = self.private_chat.user_online.count()
            vu = (user_count + 1) == 2
            chat_mesg.objects.create(chaaat=self.private_chat, sender='spoody', message=post_data['msg'], vu=vu)
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse(status=400)
    
class onlineInSpoodyChat(APIView):
    def get(self, request, sender, receiver):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try:
            private = private_chat.objects.get(Q(sender=sender, receiver=receiver) | Q(sender=receiver, receiver=sender))
            user_count = private.user_online.count()
            if user_count == 1:
                return JsonResponse({'online': True}, status=200)
            return JsonResponse({'online': False}, status=200)
        except private_chat.DoesNotExist:
            private_chat.objects.create(sender=sender, receiver=receiver)
            return JsonResponse({'online': False}, status=200)
        
class vu_check(APIView):
    def get(self, request, sender, receiver):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try:
            private = private_chat.objects.get(Q(sender=sender, receiver=receiver) | Q(sender=receiver, receiver=sender))
            vu = private.user_online.all().count()
            return JsonResponse({'user': vu}, status=200)
        except private_chat.DoesNotExist:
            return JsonResponse({'user': 0}, status=200)

# from django.http import JsonResponse
# from .util import get_group_length  # Assuming the function is saved in utils.py
# from channels.layers import get_channel_layer

# channel_layer = get_channel_layer()
# async def group_length_view(request, group_name):
#     length =  await channel_layer.group_size(group_name)
#     return JsonResponse({"group_name": group_name, "length": length})