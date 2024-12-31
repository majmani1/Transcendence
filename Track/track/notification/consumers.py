from channels.generic.websocket import AsyncWebsocketConsumer
import json
from .views import *
from django.contrib.auth.models import AnonymousUser


class messageNotif(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope['user'] is AnonymousUser:
            # print('\n\ndkhqqqqqqqqqqqqqqqqllllllll\n\n')
            return
        else:
            self.room_name = self.scope['url_route']['kwargs']['username']
            # self.room_group_name = f"chat_{self.room_name}"
            # print(self.room_name)
            if self.scope['user'] is AnonymousUser:
                self.close()
            else:
                await self.channel_layer.group_add(
                    self.room_name,
                    self.channel_name
                )
                await status_connected(self.room_name)
                await self.accept()

    async def disconnect(self, close_code):
        await status_desconnected(self.room_name)
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # data = json.loads(text_data)
        # # Process the message, for example:
        # await self.send(text_data=json.dumps({
        #     'message': 'Notification received',
        #     'data': data
        # }))
        pass

    async def message_notif(self, event):
        receiver = event['receiver']
        sender = event['sender']
        await self.send(text_data=json.dumps({'typeOfNotif':event['typeOfNotif'],'receiver':receiver, 'sender':sender, 'sender_id':event['sender_id']}))

    async def mute_notif(self, event):
        typeOfNotif = event['typeOfNotif']
        await self.send(text_data=json.dumps({'typeOfNotif':typeOfNotif}))

    async def invite_to_game_or_group(self, event):
        await self.send(text_data=json.dumps({
            'typeOfNotif':event['typeOfNotif'],
            'sender':event['sender_id'],
            'receiver':event['receiver_id'],
            'sender_username':event['sender_username'],
            'groupName':event['groupName']
        }))
    
    async def send_notification(self, event):
        # Send notification to WebSocket
        await self.send(text_data=json.dumps({
            'notification': event['notification'],
            'from': event['from_user'],
            'target': event['target'],
            'typeOfNotif': event['typeOfNotif'],
            'sender_username': event['sender_username'],

            # 'from_user': event['from_user_id'],
            # 'target': event['target_user_id'],
            # 'typeOfNotif': event['notif'],
            # 'sender_username':event['sender_username'],
        }))
    async def message_to_spody(self, event):
        await self.send(text_data=json.dumps({
            'typeOfNotif':event['typeOfNotif'],
            'msg':event['msg']
        }))
    async def accept_freind(self, event):
        await self.send(text_data=json.dumps({
            'typeOfNotif':event['typeOfNotif'],
            'picture':event['picture'],
            'sender_username':event['sender']
        }))
    async def update_status(self, event):
        await self.send(text_data=json.dumps({
            'typeOfNotif':event['typeOfNotif'],
            'username':event['username'],
            'color' :event['color']
        }))
