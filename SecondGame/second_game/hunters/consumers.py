
from channels.generic.websocket import AsyncWebsocketConsumer
from .game_manager import GameManager
from .game_manager import Map
from .game_manager import LocalGameManager
import json
import asyncio
from channels.db import database_sync_to_async
import requests
from asgiref.sync import sync_to_async

players_container = {}
dict_rooms = {}
game_over = False
class second_game_Consumer(AsyncWebsocketConsumer):
    
    def __init__(self):
        super().__init__()
        self.key_states = {}
        self.gamestate = {}
        self.game_mode = None
        self.group_name = None
        self.send_map = []
        self.checkIn_GameOr_Not = False
        self.update_interval = 0.1
        self.RidForSend = None
        self.LidForSend = None
        self.win_ref = None
        
    @sync_to_async
    def send_level_to_auth_service(self, player_id,loser_player_id):
        auth_service_url = 'http://Auth:9080/level/'  
        data = {
            'player_id': player_id,
            'loser_player_id': loser_player_id,
            'typeGame': "hunter"
        }
        try:
            response = requests.post(auth_service_url, json=data)
            if response.status_code == 200:
                print(f"Level update successful: {response.json()}")
            else:
                print(f"Failed to update level. Status: {response.status_code}")
        except Exception as e:
            print(f"Error sending level to auth service: {e}")
    @sync_to_async
    def send_check_status_Player(self, player_id):
        auth_service_url = 'http://Auth:9080/status_player/'  
        data = {
            'player_id': player_id,
        }
        try:
            response = requests.get(auth_service_url, json=data)
            if response.status_code == 200:
                # print(response.json()['status'])

                if response.json()['status'] == "out Game":
                    self.checkIn_GameOr_Not = False
                else:
                    self.checkIn_GameOr_Not = True
            else:
                print(f"Failed to update level. Status: {response.status_code}")
        except Excepsend_updates_tasktion as e:
            print(f"Error sending level to auth service: {e}")
        
    @sync_to_async
    def update_status_Player(self, player_id1,player_id2, status):
        auth_service_url = 'http://Auth:9080/status_player/'  
        data = {
            'player_id1': player_id1,
            'player_id2': player_id2,
            'status': status,
        }
        try:
            response = requests.post(auth_service_url, json=data)
            if response.status_code == 200:
                print(f"Level update successful: {response.json()}")
              
            else:
                print(f"Failed to update level. Status: {response.status_code}")
        except Exception as e:
            print(f"Error sending level to auth service: {e}")
    

    @sync_to_async
    def add_gameHistory(self, id_player1, id_player2, score_player1, score_player2, id_winner, type_game, username1, username2,pictureUser1,pictureUser2):
        # print("Adding game history...")
        game_service_url = 'http://game:3000/addGameHistory/'
        data = {
            'id_Player1': id_player1,
            'id_Player2': id_player2,
            'score_player1': score_player1,
            'score_player2': score_player2,
            'id_Winner': id_winner,
            'typeGame': type_game,
            'username1': username1,
            'username2': username2,
            'pictureUser1': pictureUser1,
            'pictureUser2': pictureUser2
        }
        try:
            response = requests.post(game_service_url, json=data)
            if response.status_code == 201:
                print(f"Game history added successfully: {response.json()}")
            else:
                print(f"Failed to add game history. Status: {response.status_code}")
        except Exception as e:
            print(f"Error adding game history: {e}")    
    async def connect(self):
        self.room_level = self.scope['url_route']['kwargs']['level']
        self.player_id = self.scope['url_route']['kwargs']['id']
        self.game_mode = self.scope['url_route']['kwargs']['game_mode']
        self.player_name = self.scope['url_route']['kwargs']['player_name']
        self.img = self.scope['url_route']['kwargs']['img']
        if self.room_level == 'easy':
            self.win_ref = 5
        elif self.room_level == 'medium':
            self.win_ref = 5
        elif self.room_level == 'hard':
            self.win_ref = 6
        self.first_state = Map(self.room_level)
        if players_container.get(self.player_id) == None:
            players_container[self.player_id] = {'player_name': self.player_name, 'img': self.img , 'id': self.player_id}
        await self.send_check_status_Player(self.player_id)
        if self.checkIn_GameOr_Not == True :
            await self.close()
            return
        else:
            await self.accept()
            await self.update_status_Player(self.player_id, "no", "in Game")


            if self.game_mode == 'Hremote':
                if not hasattr(self.channel_layer, 'rooms'):
                    self.channel_layer.rooms = {}
                await self.setup_remote_game()
            elif self.game_mode == 'Hlocal':
                await self.setup_local_game()

    async def disconnect(self, close_code):
        global game_over
        if hasattr(self, 'send_updates_task'):
            self.send_updates_task.cancel()
        
        if self.checkIn_GameOr_Not == False:
            await self.update_status_Player(self.player_id, "no", "out Game")
            
            if self.game_mode == 'Hremote':
                self.id_winer = None
                
                if self.channel_layer.rooms and self.group_name in self.channel_layer.rooms and 'result' in self.gamestate:
                    room = self.channel_layer.rooms.get(self.group_name)
                    await asyncio.sleep(0.2)
                    if game_over == False:
                        if self.gamestate['result'] == '' and room is not None:
                            if room[0] == self.player_id:
                                await self.add_gameHistory(
                                    room[0],
                                    room[1],
                                    3,
                                    0,
                                    room[1],
                                    "Hunter Game",
                                    players_container[room[0]]['player_name'],
                                    players_container[room[1]]['player_name'],
                                    players_container[room[0]]['img'],
                                    players_container[room[1]]['img'],
                                )
                                await self.send_level_to_auth_service(room[1], room[0])
                            elif room[1] == self.player_id:
                                await self.add_gameHistory(
                                    room[0],
                                    room[1],
                                    3,
                                    0,
                                    room[0],
                                    "Hunter Game",
                                    players_container[room[0]]['player_name'],
                                    players_container[room[1]]['player_name'],
                                    players_container[room[0]]['img'],
                                    players_container[room[1]]['img'],
                                )
                                await self.send_level_to_auth_service(room[0], room[1])
                    elif game_over == True:
                        if self.gamestate['result'] != '':
                            if self.gamestate['result'] == 'Lplayer Win':
                                self.id_winer = room[0]
                                await self.add_gameHistory(
                                    players_container[room[0]]['id'],
                                    players_container[room[1]]['id'],
                                    players_container[room[0]]['Lscore'],
                                    players_container[room[1]]['Rscore'],
                                    self.id_winer,
                                    "Hunter Game",
                                    players_container[room[0]]['player_name'],
                                    players_container[room[1]]['player_name'],
                                    players_container[room[0]]['img'],
                                    players_container[room[1]]['img'],
                                )
                                await self.send_level_to_auth_service(self.id_winer, room[1])
                                game_over = False
                            elif self.gamestate['result'] == 'Rplayer Win':
                                self.id_winer = room[1]
                                await self.add_gameHistory(
                                    players_container[room[0]]['id'],
                                    players_container[room[1]]['id'],
                                    players_container[room[0]]['Lscore'],
                                    players_container[room[1]]['Rscore'],
                                    self.id_winer,
                                    "Hunter Game",
                                    players_container[room[0]]['player_name'],
                                    players_container[room[1]]['player_name'],
                                    players_container[room[0]]['img'],
                                    players_container[room[1]]['img'],
                                )
                                await self.send_level_to_auth_service(self.id_winer, room[0])
                                game_over = False
                if self.channel_layer.rooms and self.group_name in self.channel_layer.rooms:
                    await asyncio.sleep(0.2)
                    self.disconnect_data = json.dumps({
                        'id': self.player_id,
                        'message': "player disconnected"
                    })
                    await self.channel_layer.group_send(
                        self.group_name,
                        {
                            'type': 'ft_game_state',
                            'gamestate': self.disconnect_data,
                        }
                    )
                    if len(self.channel_layer.rooms[self.group_name]) == 2:
                        del dict_rooms[self.group_name]
                        self.channel_layer.rooms.pop(self.group_name, None)
                    elif len(self.channel_layer.rooms[self.group_name]) == 1:
                        await self.close()
                        self.channel_layer.rooms[self.group_name].remove(self.player_id)
    pass


    async def receive(self, text_data):
        data = json.loads(text_data)
        self.key_states = data.get('key', {})
        if self.game_mode == 'Hremote':
            self.json_data = json.dumps(
                {
                    'map' : self.send_map,
                    'gamestate' : self.gamestate
                })
            await self.channel_layer.group_send(
                self.group_name,
                {
                    'type': 'ft_game_state',
                    'gamestate': self.json_data,
                }
            )
        elif self.game_mode == 'Hlocal':
            game_state = self.Local_game_manager.get_game_state()
            await self.send(text_data=json.dumps(game_state))

    async def setup_remote_game(self):
        level_rooms = [room for room in self.channel_layer.rooms if room.startswith(self.room_level)]

        for room in level_rooms:
            if len(self.channel_layer.rooms[room]) < 2:
                self.group_name = room
                break
            
        if not self.group_name:
            self.group_name = f"{self.room_level}_room_{self.player_id}"
            self.channel_layer.rooms[self.group_name] = []
            if self.group_name not in dict_rooms:
                self.map = Map(self.room_level)
                dict_rooms[self.group_name] = self.map
        index = len(self.channel_layer.rooms[self.group_name])
        self.player_role = 'R' if index == 1 else 'L'
        self.channel_layer.rooms[self.group_name].append(self.player_id)
        if self.player_role == 'R' and index == 1:
            self.RidForSend = self.channel_layer.rooms[self.group_name][1]
        elif self.player_role == 'L' and index == 0 and self.channel_layer.rooms[self.group_name]:
            self.LidForSend = self.channel_layer.rooms[self.group_name][0]
        self.game_manager = GameManager(dict_rooms[self.group_name], dict_rooms, self.group_name ,  self.RidForSend , self.LidForSend , players_container)
        await self.channel_layer.group_add(self.group_name, self.channel_name)


        self.send_updates_task = asyncio.create_task(self.update_remote_game())

    async def setup_local_game(self):
        self.Local_game_manager = LocalGameManager(self.first_state)
        self.send_updates_task = asyncio.create_task(self.update_local_game())

    async def update_remote_game(self):
        global game_over
        first = True
        while True:
            if len(self.channel_layer.rooms[self.group_name]) == 2:
                if first:
                    await self.update_status_Player(self.channel_layer.rooms[self.group_name][0],self.channel_layer.rooms[self.group_name][1], "in Game")
                    self.Lplayer_container = players_container[self.channel_layer.rooms[self.group_name][0]]
                    self.Rplayer_container = players_container[self.channel_layer.rooms[self.group_name][1]]
                    self.first_json_data = json.dumps({
                        'map': self.first_state.map,
                        'message': 'Game Start',
                        'symbol': self.player_role,
                        'LplayerContainer': self.Lplayer_container,
                        'RplayerContainer': self.Rplayer_container
                    })
                    await self.channel_layer.group_send(
                        self.group_name,
                        {
                            'type': 'ft_game_state',
                            'gamestate': self.first_json_data,
                        }
                    )
                    first = False
                for x in self.key_states:
                    if self.key_states.get(x):
                        if self.player_role == 'L':
                            self.move_players('L', x)
                        elif self.player_role == 'R':
                            self.move_players('R', x)
                        dict_rooms[self.group_name] = self.game_manager.parentMap.map
                self.gamestate = self.game_manager.get_game_state(self.player_role , self.win_ref)
                self.send_map = self.gamestate['map']
                self.json_data = json.dumps({
                    'map': self.send_map,
                    'gamestate': self.gamestate
                })
                await self.channel_layer.group_send(
                    self.group_name,
                    {
                        'type': 'ft_game_state',
                        'gamestate': self.json_data,
                    }
                )
                if self.gamestate['result'] != '':
                    game_over = True
                    break
            else:
                self.player_ctr = {}
                if self.player_role == 'L':
                    self.player_ctr = players_container[self.channel_layer.rooms[self.group_name][0]]
                elif self.player_role == 'R':
                    self.player_ctr = players_container[self.channel_layer.rooms[self.group_name][1]]
                self.json_data_waitng = json.dumps({
                    'message': 'Waiting for another player',
                    'symbol': self.player_role,
                    'player_container': self.player_ctr
                })
                await self.send(text_data=json.dumps({
                    'gamestate': self.json_data_waitng,
                }))
            await asyncio.sleep(self.update_interval)

    async def update_local_game(self):
        while True:
            for x in self.key_states:
                if self.key_states.get(x):
                    if x == 'w': self.Local_game_manager.move_player('L', 0, -1)
                    elif x == 's': self.Local_game_manager.move_player('L', 0, 1)
                    elif x == 'a': self.Local_game_manager.move_player('L', -1, 0)
                    elif x == 'd': self.Local_game_manager.move_player('L', 1, 0)
                    elif x == 'ArrowUp': self.Local_game_manager.move_player('R', 0, -1)
                    elif x == 'ArrowDown': self.Local_game_manager.move_player('R', 0, 1)
                    elif x == 'ArrowLeft': self.Local_game_manager.move_player('R', -1, 0)
                    elif x == 'ArrowRight': self.Local_game_manager.move_player('R', 1, 0)
            game_state = self.Local_game_manager.get_game_state()
            await self.send(text_data=json.dumps(game_state))

            await asyncio.sleep(self.update_interval)

    def move_players(self, player_role, key):
        if player_role == 'L':
            if key == 'w': self.game_manager.move_player('L', 0, -1)
            elif key == 's': self.game_manager.move_player('L', 0, 1)
            elif key == 'a': self.game_manager.move_player('L', -1, 0)
            elif key == 'd': self.game_manager.move_player('L', 1, 0)
        elif player_role == 'R':
            if key == 'ArrowUp': self.game_manager.move_player('R', 0, -1)
            elif key == 'ArrowDown': self.game_manager.move_player('R', 0, 1)
            elif key == 'ArrowLeft': self.game_manager.move_player('R', -1, 0)
            elif key == 'ArrowRight': self.game_manager.move_player('R', 1, 0)

    async def ft_game_state(self, event):
        await self.send(text_data=json.dumps(event))