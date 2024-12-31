# from channels.generic.websocket import AsyncWebsocketConsumer
# import json

# class NotificationConsumer(AsyncWebsocketConsumer):
# class EchoConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.user_id = self.scope['url_route']['kwargs']['user_id']
#         self.room_group_name = f'notification_{self.user_id}'

#         # Join room group
#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )
#         print('\n\n\n', 'dkhaaaaaaaaaaallllllllll', '\n\n\n')
#         await self.accept()

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )

#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         target_user_id = data['target_user_id']  # ID of the user you want to send the message to        
#         from_user_id = data['from_user_id']

#         # Send a notification to the target user’s WebSocket (different user)
#         target_room_group_name = f'notification_{target_user_id}'  # Target user’s group
#         await self.channel_layer.group_send(
#             target_room_group_name,  # Sending message to target user’s group
#             {
#                 'type': 'send_notification',
#                 'notification': f'Friend request is send',
#                 'from_user': from_user_id,
#                 'target': target_user_id,
#             }
#         )

#     async def send_notification(self, event):
#         # Send notification to WebSocket
#         await self.send(text_data=json.dumps({
#             'notification': event['notification'],
#             'from': event['from_user'],
#             'target': event['target'],
#         }))