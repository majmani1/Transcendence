from channels.generic.websocket import AsyncWebsocketConsumer
from .models import chat_mesg
import json
# import logging

# logger = logging.getLogger(__name__)


# class chatConsumer(WebsocketConsumer):
#     def connect(self):
#         self.room_group_name = "chat_group"
#         self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )
#         print("accept")
#         self.accept()
#     def desconnect(self):
#         print("hbaas")
#         # pass
        
        
#     def receive(self, text_data):
#         message_data = json.loads(text_data)
#         msg = message_data["msg"]
#         sender = message_data["sender"]
#         print(message_data['sender'] + "\tkhalllllllal\n")
#         # self.send(text_data=json.dumps({
#         #     'msg': message_data['msg'],
#         #     'sender' : message_data['sender']
#         # }))
#         self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 "type": "chat_message",
#                 "msg": msg,
#                 "sender" : sender,
#             }
#         )
#     def chat_message(self, event):
#         print("chat_message\n")
#         msg = event["msg"]
#         sender = event["sender"]
#         self.send(text_data=json.dumps({"msg":msg, "sender":sender}))
#         print("msg\t ->\n" + event['message']['msg'])
#         self.send(text_data=json.dumps({
#             'msg': event['message']['msg'],
#             'sender': event['message']['sender']
#         }))
#         send_msg = chat_mesg.objects.create(message=message_data['msg'], sender=message_data['sender'])
#         send_msg_data = {
#             'sender': send_msg.sender,
#             'msg': send_msg.message
#         }
#         self.send(json.dumps(send_msg_data))



# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from subscrib.models import Auth_42
# from asgiref.sync import sync_to_async

# class chatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         user1 = await sync_to_async(Auth_42.objects.get)(login="khallal")
#         user2 = await sync_to_async(Auth_42.objects.get)(login="mmajdoub")
#         user1_id = user1.id_s
#         user2_id = user2.id_s
#         print(user1_id + user2_id)
#         chatname = f"private_chat_{min(user1_id, user2_id)}_{max(user1_id, user2_id)}"
#         sync_to_async(self.channel_layer.group_add)(
#             chatname,
#             self.channel_name
#         )
#         await self.accept()
#     async def disconnect(self):
#         user1 = Auth_42.objects.get(user=khallal)
#         user2 = Auth_42.objects.get(user=hrakik)
#         user1_id = user1.id_s
#         user2_id = user2.id_s
#         chatname = f"private_chat_{min(user1_id, user2_id)}_{max(user1_id, user2_id)}"
#         sync_to_async(self.channel_layer.group_discard)(
#             chatname,
#             self.channel_name
#         )
#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         message = data['msg']
#         sender = data['sender']
#         sync_to_async(channel_layer.group_send)(
#             chatname,{
#                 "type" : "sendMessage",
#                 "msg"  : message,
#                 "sender" : sender,
#             }
#         )
#     async def sendMessage(self , event) :
#         message = event["msg"]
#         sender = event["sender"]
#         await self.send(text_data = json.dumps({"msg":message ,"sender":sender}))


#////

# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# # from subscrib.models import Auth_42
# from asgiref.sync import sync_to_async

# class chatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         # Get user logins from the URL parameters
#         self.user1_login = self.scope['url_route']['kwargs']['self.user1_login']
#         self.user2_login = self.scope['url_route']['kwargs']['self.user2_login']
#         print("heeeeeeere" + self.user1_login)
#         print("heeeeeeere2   " + self.user2_login)

#         try:
#             user1 = await sync_to_async(Auth_42.objects.get)(login=self.user1_login)
#             print("user 1  " + user1.login)
#             user2 = await sync_to_async(Auth_42.objects.get)(login=self.user2_login)
#             print("user 2  " + user2.login)
#         except Auth_42.DoesNotExist:
#             print("hnaaaaaaaaa")
#             await self.close()
#             return

#         self.user1_id = user1.id_s
#         self.user2_id = user2.id_s

#         self.chatname = f"private_chat_{min(self.user1_id, self.user2_id)}_{max(self.user1_id, self.user2_id)}"

#         await self.channel_layer.group_add(
#             self.chatname,
#             self.channel_name
#         )
#         await self.accept()

#     async def disconnect(self, close_code):
#         # self.user1_login = self.scope['url_route']['kwargs']['self.user1_login']
#         # self.user2_login = self.scope['url_route']['kwargs']['self.user2_login']
#         # user1 = await sync_to_async(Auth_42.objects.get)(login=self.user1_login)
#         # user2 = await sync_to_async(Auth_42.objects.get)(login=self.user2_login)
#         # user1_id = user1.id_s
#         # user2_id = user2.id_s
#         # self.chatname = f"private_chat_{min(user1_id, user2_id)}_{max(user1_id, user2_id)}"
#         if hasattr(self, 'chatname'):
#             await self.channel_layer.group_discard(
#                 self.chatname,
#                 self.channel_name
#             )

#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         message = data['msg']
#         sender = data['sender']

#         await self.channel_layer.group_send(
#             self.chatname,
#             {
#                 "type": "sendMessage",
#                 "msg": message,
#                 "sender": sender,
#             }
#         )

#     async def sendMessage(self, event):
#         message = event["msg"]
#         sender = event["sender"]
#         await self.send(text_data=json.dumps({"msg": message, "sender": sender}))

# from asgiref.sync import sync_to_async

# class chatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.roomGroupName = "group_chat_gfg"
#         await self.channel_layer.group_add(
#             self.roomGroupName ,
#             self.channel_name
#         )
#         await self.accept()
#     async def disconnect(self , close_code):
#         await self.channel_layer.group_discard(
#             self.roomGroupName , 
#             self.channel_name
#         )
#     async def receive(self, text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json["msg"]
#         sender = text_data_json["sender"]
#         await sync_to_async(chat_mesg.objects.create)(sender=sender, message=message)
#         await self.channel_layer.group_send(
#             self.roomGroupName,{
#                 "type" : "sendMessage" ,
#                 "msg" : message , 
#                 "sender" : sender ,
#             })
#     async def sendMessage(self , event) : 
#         message = event["msg"]
#         sender = event["sender"]
#         await self.send(text_data = json.dumps({"msg":message ,"sender":sender}))








import redis.asyncio as redis
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import *
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
import requests


# from django.conf import settings

class chatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'] is AnonymousUser:
            self.close()
        else:
            self.user1_login = self.scope['url_route']['kwargs']['user1_login']
            self.user2_login = self.scope['url_route']['kwargs']['user2_login']
            try:
                self.private_chat = await sync_to_async(private_chat.objects.get)(sender=self.user1_login, receiver=self.user2_login)
            except private_chat.DoesNotExist:
                try :
                    self.private_chat = await sync_to_async(private_chat.objects.get)(sender=self.user2_login, receiver=self.user1_login)
                except private_chat.DoesNotExist:
                    self.private_chat = await sync_to_async(private_chat.objects.create)(sender=self.user1_login, receiver=self.user2_login)
            self.online_user , create = await sync_to_async(user_online.objects.get_or_create)(user_online=self.user1_login)
            check_existing_tag_exists = await sync_to_async(self.private_chat.user_online.filter(user_online=self.user1_login).exists)()
            if not check_existing_tag_exists:
                await sync_to_async(self.private_chat.user_online.add)(self.online_user)
                await sync_to_async(self.private_chat.save)()
            self.user1_username = self.user1_login
            self.user2_username = self.user2_login
            self.chatname = f"private_chat_{min(self.user1_login, self.user2_login)}_{max(self.user1_login, self.user2_login)}"
            if not self.private_chat.is_block:
                await self.channel_layer.group_add(
                    self.chatname,
                    self.channel_name
                )
                await self.accept()

    async def disconnect(self, close_code):
        await sync_to_async(self.private_chat.user_online.remove)(self.online_user)
        await sync_to_async(self.private_chat.save)()
        self.close()
        if hasattr(self, 'chatname'):
            await self.channel_layer.group_discard(
                self.chatname,
                self.channel_name
            )
        
    @database_sync_to_async
    def count_unread_messages(self, private, receiver, sender):
        return chat_mesg.objects.filter(chaaat=private, sender=receiver, vu=False).count()

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['type'] == 'typing':
            await self.channel_layer.group_send(
                self.chatname,
                {
                    'type' : 'typingStatuSend',
                    'typingStatus' : data['typingStatus'],
                    'sender': data['sender']
                }
            )
        else :
            message = data['msg']
            sender = data['sender']
            receiver = data['receiver']
            user_count = await sync_to_async(self.private_chat.user_online.count)()
            await sync_to_async(self.private_chat.refresh_from_db)()
            vu = user_count == 2
            is_block = await sync_to_async(self.private_chat.user_block.count)()
            # print("\n\n-----------\n\n", is_block, "\n\n-----------\n\n")
            response = requests.get(f'http://Auth:9080/user/isFriend/{self.user1_login}/{self.user2_login}')
            isFriend = response.json()
            if (not is_block and isFriend.get('isFriend')) or self.user2_login == 'spoody':
                await sync_to_async(chat_mesg.objects.create)(chaaat=self.private_chat, sender=sender, message=message, vu=vu)
                await self.channel_layer.group_send(
                    self.chatname,
                    {
                        "type": "sendMessage",
                        "msg": message,
                        "sender": sender,
                        'receiver':receiver,
                    }
                )
            elif is_block:
                response = {"response": "This User blocked you.", "type":"error"}
                await self.send(text_data=json.dumps(response))
                self.close()
            else:
                response = {"response": "This User isn't your friend anymore.", "type":"error"}
                await self.send(text_data=json.dumps(response))
                self.close()

    async def sendMessage(self, event):
        message = event["msg"]
        sender = event["sender"]
        receiver = event['receiver']
        await self.send(text_data=json.dumps({"msg": message, "sender": sender, "receiver":receiver}))
    async def typingStatuSend(self, event):
        typingStatus = event['typingStatus']
        await self.send(text_data=json.dumps({
            'type':'typing',
            'typingStatus':typingStatus,
            'sender': event['sender']
        }))

class groupChat(AsyncWebsocketConsumer):
    async def connect(self):
        self.roomName = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.roomName}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )
    async def receive(self, text_data):
        data = json.loads(text_data)
        msg = data['msg']
        sender = data['sender']
        sender_username = data['sender_username']
        # sender = self.scope['user']
        # sender_instance = await database_sync_to_async(User.objects.get)(username=sender)
        sender_instance = await database_sync_to_async(GroupUsers.objects.get)(user=sender, groupNameUser=self.roomName)
        group  = await sync_to_async(Groups.objects.filter(users=sender_instance).exists)()

        if group and not sender_instance.is_muted:
            # print(sender)
            # msg= mess
            room =  await database_sync_to_async(Groups.objects.get)(groupName=self.roomName)
            await database_sync_to_async(GroupMessages.objects.create)(group=room, sender=sender, sender_username=sender_username, message=msg)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type" :"groupmsg",
                    "msg": msg,
                    "sender" : sender,
                    "sender_username":sender_username
                }
            )
    async def groupmsg(self, event):
        msg = event["msg"]
        sender = event["sender"]
        sender_username = event['sender_username']
        await self.send(text_data=json.dumps({"msg":msg, "sender":sender, 'sender_username':sender_username}))


