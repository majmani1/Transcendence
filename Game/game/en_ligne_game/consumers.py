import json

from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from en_ligne_game.models import Historique_game
from channels.db import database_sync_to_async

import asyncio

def replay(direction, game):
    if direction == "left":
        game.player1.score += 1
    elif direction == "right":
        game.player2.score += 1
    game.ball.x = game.width_table/2
    game.ball.y = game.height_table / 2
    game.player1.y = game.height_table / 2 - ((game.height_table / 7) / 2)
    game.player2.y = game.height_table / 2 - ((game.height_table / 7) / 2)
    game.ball.move_x = direction
    game.ball.move_y = "stop"
    if game.player1.score == int(game.scoreGame) or game.player2.score == int(game.scoreGame) :
        game.startGame = "end"
        if game.player1.score == int(game.scoreGame):
            game.player1.lose_or_win = "win"
            game.player2.lose_or_win = "lose"
        elif game.player2.score == int(game.scoreGame):
            game.player2.lose_or_win = "win"
            game.player1.lose_or_win = "lose"

def move_up_down(game):
    if (game.ball.y - game.ball.radius + game.ball.speed < 0):
        game.ball.speed = -1 * game.ball.speed
        game.ball.move_y = "down"
    elif (game.ball.y + game.ball.radius + game.ball.speed > game.height_table):
        game.ball.move_y = "up"
        game.ball.speed = -1 * game.ball.speed

    if (game.ball.move_y == "up"):
        game.ball.y += game.ball.speed
    if (game.ball.move_y == "down"):
        game.ball.y += game.ball.speed


def move_left_right(game):
    if (game.ball.x - game.ball.radius <= 10): # han zadt = 0 
        replay("right", game)
        return # han zadt return
    elif game.ball.x + game.ball.radius >= game.width_table - 10 :  # han zadt = 
        replay("left", game)
        return # han zadt return
 
    if (game.ball.y - game.ball.radius <= game.player1.y + game.player1.height and game.ball.y + game.ball.radius >= game.player1.y and game.ball.x - game.ball.radius <= game.player1.x + game.player1.width):
 
        game.ball.speed = (game.ball.y - game.player1.y) / (game.player1.height / 2)  
        if ((game.ball.y - game.player1.y) < game.player1.height / 2): # han zadt =
        
            game.ball.speed += -1 
            game.ball.move_y = "up"
       
        elif ((game.ball.y - game.player1.y) > game.player1.height - game.player1.height / 2): # han zadt =
        
            game.ball.speed += -1
            
            game.ball.move_y = "down"
       
    

        if (game.ball.move_x == "left"):
            game.ball.move_x = "right"
        else:
            game.ball.move_x = "left"
   
    if (game.ball.y - game.ball.radius <= game.player2.y + game.player2.height and game.ball.y + game.ball.radius >= game.player2.y and game.ball.x + game.ball.radius >= game.player2.x):
    
        game.ball.speed = (game.ball.y - game.player2.y) / (game.player2.height/2)
        if ((game.ball.y - game.player2.y) < game.player2.height / 2): # han zadt =
            
                game.ball.speed += -1 
                game.ball.move_y = "up"
           
        elif ((game.ball.y - game.player2.y) > game.player2.height - game.player2.height / 2): # han zadt =
        
            game.ball.speed += -1
            
            game.ball.move_y = "down"
       
        if (game.ball.move_x == "left"):
            game.ball.move_x = "right"
        else:
            game.ball.move_x = "left"
    if (game.ball.move_x == "left"):
        game.ball.x -= game.ball.speed_x
    if (game.ball.move_x == "right"):
        game.ball.x += game.ball.speed_x
 

class Ball:
    def __init__(self, x, y, width, height, radius, move_x, move_y, speed, speed_x, start_match):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.radius = radius
        self.move_x = move_x
        self.move_y = move_y
        self.speed = speed
        self.speed_x = speed_x
        self.start_match = start_match

    
    def to_dict(self):
        return {
           'x': self.x,  
            'y': self.y , 
            'width':self.width , 
            'height' : self.height,  
            'radius' :self.radius ,
            'move_x' :self.move_x , 
            'move_y' :self.move_y ,
            'speed' :self.speed , 
            'speed_x' :self.speed_x ,
            'start_match' :self.start_match , 
        }
        



class Player:
    def __init__(self, x, y, width, height, speed_move, score, move):
        self.restart = None
        self.x = x   
        self.y = y   
        self.width = width   
        self.height = height   
        self.speed_move = speed_move   
        self.score = score   
        self.move = move
        self.id = 0
        self.message_receive = "null"
        self.lose_or_win = "null"
        self.contunue = False
        self.infosOtherPlayer = "null"
        self.username = None
        self.picture = None
        # self.

    def to_dict(self):
        return {
            'x': self.x,
            'y': self.y,
            'width': self.width,
            'height': self.height,
            'speed_move': self.speed_move,
            'score': self.score,
            'move': self.move,
            'id': self.id,
            'message': self.message_receive,
            'restart': self.restart,
            'infosOtherPlayer': self.infosOtherPlayer,
            'username': self.username,
            'picture': self.picture
        }


    

class Game:
    _instance = None
    # _counter = 0
    # def __new__(cls, *args, **kwargs):
    #     # cls._counter += 1
    #     # print(cls._counter)
    #     if not cls._instance:
    #         cls._instance = super(Game, cls).__new__(cls, *args, **kwargs)
    #         cls._instance.init_game()
    #     return cls._instance

    def __init__(self, scoreGame):
        self.showVs = False
        self.height_table = 350
        self.width_table = 700
        self.idGame = 0
        self.startGame = False
        self.idPlayer1 = 0
        self.idPlayer2 = 0
        self.scoreGame = scoreGame
        self.player1_name = ""
        self.player2_name = ""
        self.tours= "quartFinale"
        self.showMap = False
        self.players = None
        self.semiFinale = []
        self.finale = []
        self.finishing = False
        self.winner = ""
        self.playerExit = -1
        self.stored = False
        self.out = False
        self.showTable = False
        self.player1 = Player(
            10, self.height_table / 2 - (self.height_table / 7) / 2, 
            self.width_table / 120, self.height_table / 7, 
            2.7, 0, "stop"
        )
        self.player2 = Player(
            685, self.height_table / 2 - (self.height_table / 7) / 2, 
            self.width_table / 120, self.height_table / 7, 
            2.7, 0, "stop"
        )
        self.ball = Ball(
            self.width_table / 2, self.height_table / 2, 
            self.height_table * 2 / 120, self.height_table * 20 / 120, 
            10, "left", "stop", 0, self.width_table / 90, False
        )

    def movePlayers(self, clicks,conssum):
        if conssum.typeGame == "local" or conssum.typeGame == "tournament":
            # mochkil clicks dima fiha none
            if clicks != None: 
                if isinstance(clicks, list) and len(clicks) > 0:
                    for i in clicks:
                        if i['letre'] == 'x':
                            return
                        if i['letre'] == "w" and self.player1.y > 0:
                            self.player1.y -= self.player1.speed_move
                        elif  i['letre'] == "s" and self.player1.y + self.player1.height < self.height_table:
                            self.player1.y += self.player1.speed_move
                        elif  i['letre'] == "up" and self.player2.y > 0:
                            self.player2.y -= self.player2.speed_move
                        elif  i['letre'] == "down" and self.player2.y + self.player2.height < self.height_table:
                            self.player2.y += self.player2.speed_move
        elif conssum.typeGame != "local":
            if clicks:
                for i in clicks:
                    if i['letre'] == "up" and i['player'] ==  (conssum.myroom.idPlayer1) and self.player1.y > 0:
                        self.player1.y -= self.player1.speed_move
                    elif   i['letre'] == "down" and i['player'] ==  (conssum.myroom.idPlayer1) and self.player1.y + self.player1.height < self.height_table:
                        self.player1.y += self.player1.speed_move
                    elif i['letre'] == "up" and i['player'] ==  (conssum.myroom.idPlayer2) and self.player2.y > 0:
                        self.player2.y -= self.player2.speed_move
                    elif i['letre'] == "down" and  i['player'] ==  (conssum.myroom.idPlayer2) and self.player2.y + self.player2.height < self.height_table:
                        self.player2.y += self.player2.speed_move
                       
    def moveBall(self):
        move_up_down(self)
        move_left_right(self)

    def define_id(self):
        if self._counter%2 !=  0:
            self.player1.id = self._counter
        elif self._counter % 2 == 0:
            self.player2.id = self._counter

    def to_dict(self):
        return {
            'height_table': self.height_table,
            'width_table': self.width_table,
            'player1': self.player1.to_dict(),
            'player2': self.player2.to_dict(),
            'ball': self.ball.to_dict(),
            'startGame': self.startGame,
            'idPlayer1': self.idPlayer1,
            'idPlayer2': self.idPlayer2,
            'showVs': self.showVs,
            'player1_name': self.player1_name,
            'player2_name': self.player2_name,
            'tours': self.tours,
            'showMap': self.showMap,
            'players': self.players,
            'semiFinale': self.semiFinale,
            'finale': self.finale,
            'finishing': self.finishing,
            'winner': self.winner,
            'playerExit': self.playerExit,
            'scoreGame':self.scoreGame,
            'out': self.out,
            'showTable': self.showTable,
        }




class Rooms:
    generateTable = {}
    def __init__(self, group_name, idPlayer1, idPlayer2, typeGame):
        self.group_name = group_name
        self.idPlayer1 = idPlayer1
        self.idPlayer2 = idPlayer2
        # self.game = Game()
        self.typeGame  = typeGame
    
    def createGame(self, scoreGame):
        try:
            if self.group_name not in self.generateTable:

                self.generateTable[self.group_name] = Game(scoreGame)
                # self.generateTable[self.group_name].startGame = True
                self.generateTable[self.group_name].showVs = True
                self.generateTable[self.group_name].idPlayer1 = self.idPlayer1
                self.generateTable[self.group_name].idPlayer2 = self.idPlayer2        
           
        except Exception as e:
            pass
                     



from collections import deque
from channels.layers import get_channel_layer

matchPlayers_S3 = asyncio.Queue()
matchPlayers_S7 = asyncio.Queue()
matchPlayers_S11 = asyncio.Queue()

matchInviteGmae = {}

async def get_invite(player):
    return matchInviteGmae.get(player, None)

async def add_invite(id, objectUser):
    try:
        matchInviteGmae[id] = objectUser
    except Exception as e:
        pass

async def delete_invit(idInvitePlayer):
    if idInvitePlayer in matchInviteGmae:
        del matchInviteGmae[idInvitePlayer]



async def generateMatchFiend(objectUser):
    try:
        
        if objectUser.idInvitePlayer in matchInviteGmae:
            player1 = objectUser
            # player2 = matchInviteGmae[objectUser.idInvitePlayer]
            player1.typeGame = "remote"
            player2 = await get_invite(objectUser.idInvitePlayer)
            player2.typeGame = "remote"


            rommm = Rooms(str(player1.id) + str(player2.id), player1.id, player2.id, "3")
            player1.myroom = rommm
            player2.myroom = rommm
            player1.myroom.createGame("3")
            channel_layer = get_channel_layer()
            await channel_layer.group_add(player1.myroom.group_name, player1.channel_name)
            await channel_layer.group_add(player1.myroom.group_name, player2.channel_name)
            # del matchInviteGmae[objectUser.idInvitePlayer]
            await delete_invit(objectUser.idInvitePlayer)
            return True
        else:
            return False
    except Exception as e:
         
        pass
    
     

async def generateMatch(scoreGame):

    if matchPlayers_S3.qsize() >= 2:
        player1 = await matchPlayers_S3.get()
        player2 = await matchPlayers_S3.get()
        rommm = Rooms(str(player1.id) + str(player2.id), player1.id, player2.id, "3")
        player1.myroom = rommm
        
        player2.myroom = rommm

        player1.myroom.createGame(scoreGame)
        player2.myroom.createGame(scoreGame)

        channel_layer = get_channel_layer()
        await channel_layer.group_add(player1.myroom.group_name, player1.channel_name)
        await channel_layer.group_add(player1.myroom.group_name, player2.channel_name)

    elif matchPlayers_S7.qsize() >= 2:
        player1 = await matchPlayers_S7.get()
        player2 = await matchPlayers_S7.get()
        rommm = Rooms(str(player1.id) + str(player2.id), player1.id, player2.id, "7")
        player1.myroom = rommm
        player2.myroom = rommm
        player1.myroom.createGame(scoreGame)
        player2.myroom.createGame(scoreGame)
        channel_layer = get_channel_layer()
        await channel_layer.group_add(player1.myroom.group_name, player1.channel_name)
        await channel_layer.group_add(player1.myroom.group_name, player2.channel_name)
    elif matchPlayers_S11.qsize() >= 2:
        player1 = await matchPlayers_S11.get()
        player2 = await matchPlayers_S11.get()
        rommm = Rooms(str(player1.id) + str(player2.id), player1.id, player2.id, "11")
        player1.myroom = rommm
        player2.myroom = rommm
        player1.myroom.createGame(scoreGame)
        player2.myroom.createGame(scoreGame)
        channel_layer = get_channel_layer()
        await channel_layer.group_add(player1.myroom.group_name, player1.channel_name)
        await channel_layer.group_add(player1.myroom.group_name, player2.channel_name)


        # player1.myroom.game.idGame = player1.id 
               
async def is_number_in_queue(queue: asyncio.Queue, test):
    temp_list = []
    
    # Drain the queue to temporarily store its items
    check = False
    while not queue.empty():
        item = await queue.get()
        if item.id == test.id:
            check = True
        temp_list.append(item)
    
    
    for item in temp_list:
        await queue.put(item)

    if check == True:
        return True
    else:
        return False

async def remove_number(queue: asyncio.Queue, test):
    temp_items = []
    # Fetch all items from the queue
    while not queue.empty():
        item = await queue.get()
        if item != test:
            temp_items.append(item)

    # Put the remaining items back into the queue
    for item in temp_items:
        await queue.put(item)

import requests
from asgiref.sync import sync_to_async


class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.clicks = None
        self.myroom = None
        self.scoreGame = 0
        self.id = 0
        self.idInvitePlayer = 0
        self.startMatch = False
        self.typeGame = ""
        self.restartLocal = False
        self.exit = False
        self.id_playerExit = None
        self.checkIn_GameOr_Not = False
        self.doneChange_staus = False
        self.alreadyInQueue = False
        self.connectt = False
        self.skipVs = False
        self.startInviteGame = False
        self.WhoMatching = False
        self.startMatch_withFrien = False
        self.counterError = 0
        self.picture = None
        self.username = None
 

    @sync_to_async
    def send_level_to_auth_service(self, player_id,loser_player_id):
        auth_service_url = 'http://Auth:9080/level/'  
        data = {
            'player_id': player_id,
            'loser_player_id': loser_player_id,
            'typeGame': "pong"
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
                # print(f"Level update successful: {response.json()}")
                # print(response.json()['status'], " /********/*//*/*/*/*/*")
                if response.json()['status'] == "out Game":
                    self.checkIn_GameOr_Not = False
                else:
                    self.checkIn_GameOr_Not = True
            else:
                print(f"Failed to update level. Status: {response.status_code}")
        except Exception as e:
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
                print(f"Status update successful: {response.json()}")
              
            else:
                print(f"Failed to update level. Status: {response.status_code}")
        except Exception as e:
            print(f"Error sending level to auth service: {e}")
    
            #   -----------------------------------------------------------------------------  

    @sync_to_async
    def add_gameHistory(self, id_player1, id_player2, score_player1, score_player2, id_winner, type_game, username1, username2,pictureUser1,pictureUser2):
        game_service_url = 'http://game:9080/addGameHistory/'
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

        #   -----------------------------------------------------------------------------  

    @database_sync_to_async
    def save_game_history(self, id_player1, id_player2, score_player1, score_player2, id_winner, type_game, username1, username2,pictureUser1,pictureUser2):
        try:
            game_record = Historique_game(
                id_Player1=id_player1,
                id_Player2=id_player2,
                score_player1=score_player1,
                score_player2=score_player2,
                id_Winner=id_winner,
                typeGame=type_game,
                username1=username1,
                username2=username2,
                pictureUser1=pictureUser1,
                pictureUser2=pictureUser2
            )
            game_record.save()
        except Exception as e:
            print(f"Error saving game history: {e}")
    async def connect(self):
        if self.scope['user'] is AnonymousUser:

            return
        else:
            self.typeGame = self.scope['query_string'].decode().split('=')[0]
            self.id = (self.scope['query_string'].decode().split('=')[1])
            if self.typeGame != "acceptGame":
                self.scoreGame =  (self.scope['query_string'].decode().split('=')[2])
            else:
                self.scoreGame = 3
                self.idInvitePlayer = (self.scope['query_string'].decode().split('=')[2])
            await self.send_check_status_Player(self.id)
            if self.checkIn_GameOr_Not == True :
                await self.close(code=1001)
                return
            else:
                self.typeGame = self.scope['query_string'].decode().split('=')[0]
                self.id = (self.scope['query_string'].decode().split('=')[1])
                if self.typeGame != "acceptGame":
                    self.scoreGame =  (self.scope['query_string'].decode().split('=')[2])
                else:
                    self.scoreGame = 3
                    self.idInvitePlayer = (self.scope['query_string'].decode().split('=')[2])
                await self.send_check_status_Player(self.id)
                if self.checkIn_GameOr_Not == True :
                    await self.close(code=1001)
                    return
                else:
                    try:
                        await self.accept()
                        await self.update_status_Player(self.id, "no", "in Game")
                        self.connectt = True
                        if self.typeGame == 'acceptGame':
                            matchInviteGmae[self.idInvitePlayer] = self
                            self.skipVs = True

                            self.send_updates_task = asyncio.create_task(self.send_updates())

                        elif self.typeGame == "friendGame" :
                            self.skipVs = True
                            if (self.scope['query_string'].decode().split('=')[2]) == "-1":
                                # await matchInviteGmae[self.id] = self
                                await add_invite(self.id, self)

                            else:
                                await asyncio.sleep(0.01)

                                self.WhoMatching = True
                                self.skipVs = True
                                self.idInvitePlayer = (self.scope['query_string'].decode().split('=')[2])
                                # print("Ana Mouad " + str(self.id) + " " + str(self.scope['query_string'].decode().split('=')[2]))
                                # await generateMatchFiend(self) 
                            self.send_updates_task = asyncio.create_task(self.send_updates())


                            # return
                        elif (self.typeGame == 'local'):
                            self.my_game = Game(self.scoreGame)
                            # self.my_game.startGame = True
                            self.my_game.showVs = True
                            self.send_updates_task = asyncio.create_task(self.send_updates())
                        else:
                            if self.scoreGame == "3" and await is_number_in_queue(matchPlayers_S3, self) == False:
                                await matchPlayers_S3.put(self)
                                self.alreadyInQueue = True
                            elif self.scoreGame == "7" and await is_number_in_queue(matchPlayers_S7, self) == False:
                                await matchPlayers_S7.put(self)
                                self.alreadyInQueue = True

                            elif self.scoreGame == "11" and await is_number_in_queue(matchPlayers_S11, self) == False:
                                await matchPlayers_S11.put(self)
                                self.alreadyInQueue = True
                            if self.alreadyInQueue == True:
                                await generateMatch(self.scoreGame) 
                                self.send_updates_task = asyncio.create_task(self.send_updates())
                            else:
                                await self.close(code=4000)
                                return
                    
                    except Exception as e:
                            pass


    async def disconnect(self, close_code):
        # try:
            if self.myroom == None:
                if self.scoreGame == "3":
                    await remove_number(matchPlayers_S3, self)
                    if self.checkIn_GameOr_Not == False:
                        await self.update_status_Player(self.id, "no", "out Game")
                elif self.scoreGame == "7":
                    await remove_number(matchPlayers_S7, self)
                    if self.checkIn_GameOr_Not == False:
                        await self.update_status_Player(self.id, "no", "out Game")
                elif self.scoreGame == "11":
                    await remove_number(matchPlayers_S11, self)
                    if self.checkIn_GameOr_Not == False:
                        await self.update_status_Player(self.id, "no", "out Game")

                if hasattr(self, 'send_updates_task'):
                    self.send_updates_task.cancel()

            
            else:
                if hasattr(self, 'send_updates_task'):
                    self.send_updates_task.cancel()
                # if not self.myroom or self.myroom.group_name not in self.myroom.generateTable:
                #     self.close()
                #     print(f"No active game for group_name: {self.myroom.group_name}. Exiting gracefully.")
                #     return

                    if self.myroom and self.myroom.group_name in self.myroom.generateTable:
                        await self.update_status_Player(self.myroom.idPlayer1, self.myroom.idPlayer2, "out Game")
                        if self.myroom.generateTable[self.myroom.group_name].startGame != "restart" and self.myroom.generateTable[self.myroom.group_name].startGame != "end":
                            id_player1 = self.myroom.idPlayer1
                            id_player2 = self.myroom.idPlayer2
                            if id_player1 == self.id:
                                id_winner =id_player2
                                id_loser = id_player1
                                score_player1 = 0
                                score_player2 = 3
                            else:
                                id_winner = id_player1
                                id_loser = id_player2
                                score_player1 = 3
                                score_player2 = 0
                            
                            type_game = "Ping Pong Game"
                          
                            if self.myroom.generateTable[self.myroom.group_name].player1.infosOtherPlayer != "null":
                                username1 = self.myroom.generateTable[self.myroom.group_name].player1.infosOtherPlayer['username']
                                username2 = self.myroom.generateTable[self.myroom.group_name].player2.infosOtherPlayer['username']
                                pictureUser1 = self.myroom.generateTable[self.myroom.group_name].player1.infosOtherPlayer['picture']
                                pictureUser2 = self.myroom.generateTable[self.myroom.group_name].player2.infosOtherPlayer['picture']

                                await self.send_level_to_auth_service(id_winner, id_loser)
                                # print("had level l t updata fach exita chi wa7ad")

                                await self.save_game_history(id_player1, id_player2, score_player1, score_player2, id_winner, type_game, username1, username2, pictureUser1, pictureUser2)
                            if  self.connectt == True and self.myroom.generateTable[self.myroom.group_name].startGame != "end":
                                self.myroom.generateTable[self.myroom.group_name].out = True
                                await self.channel_layer.group_send(
                                    self.myroom.group_name,
                                    {
                                        'type': 'game_state_update',
                                        'message': json.dumps(self.myroom.generateTable[self.myroom.group_name].to_dict())
                                    }
                                )
                           
                        del self.myroom.generateTable[self.myroom.group_name]
                
                
                if self.typeGame != "local":
                    self.exit = True
                    self.id_playerExit = self.id

                if self.typeGame != "local":
                    
                    await self.channel_layer.group_discard(
                    self.myroom.group_name,
                    self.channel_name
                    )
            self.connectt = False       
               
            
    async def receive(self, text_data):
        try:
            data = json.loads(text_data)

            if self.typeGame != "local" and (self.myroom ==None or self.myroom.group_name not in self.myroom.generateTable):
                return
            if 'infos_user' in data:
                player_id = str(data['player'])
                if self.typeGame != "local":
                    if player_id == self.myroom.idPlayer1:
                        self.myroom.generateTable[self.myroom.group_name].player1.infosOtherPlayer = data['infos_user']
                    if player_id == self.myroom.idPlayer2:
                        self.myroom.generateTable[self.myroom.group_name].player2.infosOtherPlayer = data['infos_user']
            if  'player' in data:
                player_id = str(data['player'])
                
                if self.typeGame != 'local' and player_id == self.myroom.idPlayer1 and self.myroom.group_name in self.myroom.generateTable:
                    # if self.typeGame != "local":
                        self.myroom.generateTable[self.myroom.group_name].player1.restart = data.get('restart', False)
                        # if data.get('contunue', False) == True:
                        #     self.myroom.generateTable.remove(self.myroom.group_name)
                
                if self.typeGame != 'local' and player_id == self.myroom.idPlayer2 and self.myroom.group_name in self.myroom.generateTable:
                    if self.typeGame != "local":
                        self.myroom.generateTable[self.myroom.group_name].player2.restart = data.get('restart', False)
                        # if data.get('contunue', False) == True:
                        #     self.myroom.generateTable.remove(self.myroom.group_name)
                            
                        #     self.myroom.generateTable.remove(self.myroom.group_name)
                        # self.myroom.generateTable[self.myroom.group_name].player2.contunue = data.get('contunue', False)
                if self.typeGame == 'local':
                     self.restartLocal = data.get('restart', False)
            if 'message' in data:
                player_id = str(data['player'])
                
                if player_id == self.myroom.idPlayer1:
                    if self.typeGame != "local":
                        self.myroom.generateTable[self.myroom.group_name].player2.message_receive = data['message'] 
                
                if player_id == self.myroom.idPlayer2:
                    if self.typeGame != "local":
                        self.myroom.generateTable[self.myroom.group_name].player1.message_receive = data['message']
            else:
                if isinstance(data, list):
                    self.clicks = json.loads(text_data)
                if self.typeGame == "remote":
                    self.myroom.generateTable[self.myroom.group_name].player1.message_receive = "null"
                    self.myroom.generateTable[self.myroom.group_name].player2.message_receive = "null"
             
        except Exception as e:
                pass

            


    async def send_updates(self):
        while True:
            # if self.myroom == None or  self.connectt == False:
            #     return
            # print("KHDAMA mZYAAAAN")
            try:
                if not self.channel_name:
                    break
                if self.skipVs == True and self.WhoMatching == True and  self.startInviteGame == False:
                    # await asyncio.sleep(1)

                    self.startInviteGame =  await generateMatchFiend(self)
                    pass

                if self.skipVs == True and self.startMatch_withFrien == False:
                   await asyncio.sleep(1)
                   self.startMatch_withFrien = True 
                if  not self.channel_name or  (self.startMatch == True and (self.myroom.group_name not in self.myroom.generateTable)):
                    break   
                if self.exit == True:
                    self.myroom.generateTable[self.myroom.group_name].playerExit = self.id_playerExit
                    self.exit = False
                if self.typeGame != "local" and self.startMatch == False and self.myroom:
                    self.startMatch = True
                if self.typeGame == "local":
                    if self.restartLocal == True:
                        self.restartLocal = False
                        self.my_game.startGame = True
                        self.my_game.player1.restart = None
                        self.my_game.player2.restart = None
                        self.my_game.player1.score = 0
                        self.my_game.player2.score = 0
                        # pass
                    if (self.my_game.startGame == True):
                        self.my_game.moveBall()
                        self.my_game.movePlayers(self.clicks, self)
                    game_state = json.dumps(self.my_game.to_dict())
                    await self.send(text_data=game_state)
                    if self.my_game.showVs == True:
                        # await asyncio.sleep(3)
                        self.my_game.showVs = False 
                        self.my_game.startGame = True

                elif self.myroom and self.typeGame != "local" and (self.myroom.generateTable[self.myroom.group_name].player1.infosOtherPlayer == "null" or self.myroom.generateTable[self.myroom.group_name].player2.infosOtherPlayer == "null") :
                    # print("++++++++++++++++++++++++++++++++++++++ kaama kaytbadlo les donners +++++++++++++++++++++++++++++++++++++++++++++++")
                    self.counterError += 1
                    print(self.counterError)
                    if self.counterError   > 1000:
                        if self.myroom and self.myroom.group_name in self.myroom.generateTable:
                            del self.myroom.generateTable[self.myroom.group_name]
                            await self.channel_layer.group_discard(
                            self.myroom.group_name,
                            self.channel_name
                            )
                        if hasattr(self, 'send_updates_task'):
                      
                            self.send_updates_task.cancel()
 
                    elif self.myroom.generateTable[self.myroom.group_name].player1.infosOtherPlayer == "null" or self.myroom.generateTable[self.myroom.group_name].player2.infosOtherPlayer == "null":
                        game_state = json.dumps(self.myroom.generateTable[self.myroom.group_name].to_dict())
                        await self.channel_layer.group_send(
                            self.myroom.group_name,
                            {
                                'type': 'game_state_update',
                                'message': game_state
                            }
                        )
                    # pass
                elif self.myroom and self.typeGame != "local" and self.startMatch == True : #hna ra 7ayadt elif o dart if

                    if self.doneChange_staus == False:
                        # await self.update_status_Player(self.myroom.idPlayer1, self.myroom.idPlayer2, "in Game")
                        self.doneChange_staus = True
                    # if self.myroom.generateTable[self.myroom.group_name].player2.contunue 
                    if self.myroom.generateTable[self.myroom.group_name].player1.restart == True and self.myroom.generateTable[self.myroom.group_name].player2.restart == True:
                        self.myroom.generateTable[self.myroom.group_name].startGame = "restart"
                        self.myroom.generateTable[self.myroom.group_name].player1.score = 0
                        self.myroom.generateTable[self.myroom.group_name].player2.score = 0
                    if self.myroom.idPlayer1 == self.id and (self.myroom.generateTable[self.myroom.group_name].startGame == True) : 
                        self.myroom.generateTable[self.myroom.group_name].moveBall()
                    if (self.myroom.generateTable[self.myroom.group_name].startGame == True) and self.clicks != None:
                        self.myroom.generateTable[self.myroom.group_name].movePlayers(self.clicks, self)
                    
                    game_state = json.dumps(self.myroom.generateTable[self.myroom.group_name].to_dict())
                    await self.channel_layer.group_send(
                        self.myroom.group_name,
                        {
                            'type': 'game_state_update',
                            'message': game_state
                        }
                    )
                    
                    if self.myroom and self.myroom.generateTable[self.myroom.group_name].showVs == True:
                        if self.skipVs == False:
                            await asyncio.sleep(3)
                        self.myroom.generateTable[self.myroom.group_name].showVs = False
                        self.myroom.generateTable[self.myroom.group_name].startGame = True
                        game_state = json.dumps(self.myroom.generateTable[self.myroom.group_name].to_dict())
                        await self.channel_layer.group_send(
                            self.myroom.group_name,
                            {
                                'type': 'game_state_update',
                                'message': game_state
                            }
                        )

                    
                    if  self.myroom and self.myroom.generateTable[self.myroom.group_name].player1.restart == True and self.myroom.generateTable[self.myroom.group_name].player2.restart == True and self.myroom.generateTable[self.myroom.group_name].startGame == "restart":
                        self.myroom.generateTable[self.myroom.group_name].startGame = True
                        self.myroom.generateTable[self.myroom.group_name].player1.restart = None
                        self.myroom.generateTable[self.myroom.group_name].player2.restart = None
                        self.myroom.generateTable[self.myroom.group_name].stored = False

                   
                    if self.myroom.generateTable[self.myroom.group_name].player1.message_receive != "null":
                        self.myroom.generateTable[self.myroom.group_name].player1.message_receive = "null"
                    if self.myroom.generateTable[self.myroom.group_name].player2.message_receive != "null":
                        self.myroom.generateTable[self.myroom.group_name].player2.message_receive = "null"
                if self.myroom and self.typeGame != "local" and self.myroom.generateTable[self.myroom.group_name].startGame == "end" and self.myroom.generateTable[self.myroom.group_name].stored == False:
                    self.myroom.generateTable[self.myroom.group_name].stored = True
                    id_player1 = self.myroom.idPlayer1
                    id_player2 = self.myroom.idPlayer2
                    score_player1 = self.myroom.generateTable[self.myroom.group_name].player1.score
                    score_player2 = self.myroom.generateTable[self.myroom.group_name].player2.score
                    if self.myroom.generateTable[self.myroom.group_name].player1.score == int(self.myroom.generateTable[self.myroom.group_name].scoreGame):
                        id_winner = id_player1
                        id_loser = id_player2
                    elif self.myroom.generateTable[self.myroom.group_name].player2.score == int(self.myroom.generateTable[self.myroom.group_name].scoreGame):
                        id_winner = id_player2
                        id_loser = id_player1
                    
                    type_game = "Ping Pong Game"
                    username1 = self.myroom.generateTable[self.myroom.group_name].player1.infosOtherPlayer['username']
                    username2 = self.myroom.generateTable[self.myroom.group_name].player2.infosOtherPlayer['username']
                    pictureUser1 = self.myroom.generateTable[self.myroom.group_name].player1.infosOtherPlayer['picture']
                    pictureUser2 = self.myroom.generateTable[self.myroom.group_name].player2.infosOtherPlayer['picture']
                    await self.send_level_to_auth_service(id_winner, id_loser)
                    await self.save_game_history(id_player1, id_player2, score_player1, score_player2, id_winner, type_game, username1, username2, pictureUser1, pictureUser2)
                if  self.myroom and self.typeGame != "local" and self.myroom.generateTable[self.myroom.group_name].startGame == "end" and (self.myroom.generateTable[self.myroom.group_name].player1.restart == True or 
                                    self.myroom.generateTable[self.myroom.group_name].player2.restart == True):
                            game_state = json.dumps(self.myroom.generateTable[self.myroom.group_name].to_dict())
                            await self.channel_layer.group_send(
                                self.myroom.group_name,
                                {
                                    'type': 'game_state_update',
                                    'message': game_state
                                }
                            )
            except asyncio.CancelledError:
                break
            except Exception as e:
                # if str(e) != "string indices must be integers, not 'str'":
                    # print("dkhol hna f F While true")
                    # print(e)
                pass

            await asyncio.sleep(0.0161)

    async def game_state_update(self, event):
        message = event['message']
        await self.send(text_data=message)





class TournamentConsumer(AsyncWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.my_game = Game(3)
        self.players = None
        self.matches = {}
        self.indexPlayers = 0
        self.clicks = None
        self.nextMatch = True
        self.typeGame = ""
        self.inGame = False
        self.send_updates_task = None
        self.checkIn_GameOr_Not = False
        self.id = 0


    @sync_to_async
    def send_check_status_Player(self, player_id):
        auth_service_url = 'http://Auth:9080/status_player/'  
        data = {
            'player_id': player_id,
        }
        try:
            response = requests.get(auth_service_url, json=data)
            if response.status_code == 200:
                # print(f"Level update successful: {response.json()}")

                if response.json()['status'] == "out Game":
                    self.checkIn_GameOr_Not = False
                else:
                    self.checkIn_GameOr_Not = True
            else:
                print(f"Failed to update level. Status: {response.status_code}")
        except Exception as e:
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
                print(f"Status update successful: {response.json()}")
              
            else:
                print(f"Failed to update level. Status: {response.status_code}")
        except Exception as e:
            print(f"Error sending level to auth service: {e}")

    async def connect(self):
        self.id = (self.scope['query_string'].decode().split('=')[1])
        await self.send_check_status_Player(self.id)
        if self.checkIn_GameOr_Not == True :
            await self.close(code=1001)
            return
        else:
            self.typeGame = self.scope['query_string'].decode().split('=')[0]
            if self.send_updates_task is None or self.send_updates_task.done():
                self.send_updates_task = asyncio.create_task(self.send_updates())
            # self.send_updates_task = asyncio.create_task(self.send_updates())
            await self.accept()
            await self.update_status_Player(self.id, "no", "in Game")



    async def disconnect(self, close_code):
        await self.update_status_Player(self.id, "no", "out Game")
        
        if hasattr(self, 'send_updates_task'):
            self.send_updates_task.cancel()

        if self.my_game.players and self.my_game.player1_name in self.my_game.players:
            # print(f"Removing {self.my_game.player1_name} from the game.")
            self.my_game.players.remove(self.my_game.player1_name)

        if self.my_game.players and self.my_game.player2_name in self.my_game.players:
            # print(f"Removing {self.my_game.player2_name} from the game.")
            self.my_game.players.remove(self.my_game.player2_name)
        

        await self.close()



    async def receive(self, text_data):
        data = json.loads(text_data)
        if self.inGame == True:
            self.clicks = data
        if self.my_game.players == None:
            self.my_game.players = json.loads(text_data)
        # print(self.players) 

    
    async def send_updates(self):
        while True:
            # print("send_updates tournament")
            try:
                if self.my_game.players and self.nextMatch == True:
                    await asyncio.sleep(3)
                    self.nextMatch = False
                    self.my_game.showVs = True
                    self.my_game.player1_name = self.my_game.players[self.indexPlayers]
                    self.indexPlayers += 1
                    self.my_game.player2_name = self.my_game.players[self.indexPlayers]
                    self.my_game.player1.score = 0
                    self.my_game.player2.score = 0
                    self.clicks = None
                    # print(self.my_game.player1_name, self.my_game.player1_name)

                #    self.my_game.to_dict()
                    await self.send(text_data=json.dumps(self.my_game.to_dict()) )
                if self.my_game.startGame == False and self.nextMatch == False and self.my_game.finishing == False:
                    await asyncio.sleep(3)
                    self.inGame = True
                    self.my_game.showVs = False
                    self.my_game.showTable = True
                    self.clicks = None

                    self.my_game.startGame = True
                    # self.nextMatch = True
                if self.inGame == True:
                    # print(self.clicks)
                    # print("ta ra khotna m9assrin")
                    self.my_game.movePlayers(self.clicks, self)
                    self.my_game.moveBall()
                if self.my_game.startGame == "end":
                    self.nextMatch = True
                    self.my_game.showMap = True
                    self.clicks = None
                    self.my_game.startGame = False
                    if self.my_game.player1.score == 3:
                        self.inGame = False
                        if len(self.my_game.semiFinale) < 4:
                            self.my_game.semiFinale.append(self.my_game.player1_name)

                        elif len(self.my_game.semiFinale) == 4:
                            self.my_game.finale.append(self.my_game.player1_name)

                        # found = self.my_game.player2_name in self.my_game.players
                  
                        # print(found, self.my_game.player2_name)
                        self.my_game.players.remove(self.my_game.player2_name)
                        
                    elif self.my_game.player2.score == 3:
                        self.inGame = False
                        if len(self.my_game.semiFinale) < 4:
                            self.my_game.semiFinale.append(self.my_game.player2_name)
                        elif len(self.my_game.semiFinale) == 4:

                            self.my_game.finale.append(self.my_game.player2_name)
                        self.my_game.players.remove(self.my_game.player1_name)
                    # print(self.my_game.players)
                    if self.my_game.tours == "quartFinale" and len(self.my_game.players) == 4:
                        self.indexPlayers = 0
                        self.my_game.tours = "demieFinale"
                    elif self.my_game.tours == "demieFinale" and len(self.my_game.players) == 2:
                        self.indexPlayers = 0
                        self.my_game.tours = "finale"
                    if self.my_game.tours == "finale" and len(self.my_game.players) == 1:
                        self.my_game.players = None
                        self.my_game.finishing = True
                        if self.my_game.player1.score == 3:
                            self.my_game.winner = self.my_game.player1_name
                        elif self.my_game.player2.score == 3:
                            self.my_game.winner = self.my_game.player2_name
                        
                        
             
                    # print("next match")
                await self.send(text_data=json.dumps(self.my_game.to_dict()) )
                if self.my_game.showTable == True:
                    self.my_game.showTable = False
                    
                if self.my_game.showMap == True:
                    self.my_game.showMap = False
                    await asyncio.sleep(4)
                
            except asyncio.CancelledError:
                # print("send_updates task has been canceled.")
                return
            except Exception as e:
                # if str(e) != "string indices must be integers, not 'str'":
                # print(e)
                pass

            await asyncio.sleep(0.0161)