import json

class Map:
    def __init__(self, level):
        self.map = []
        self.count_C = 0
        self.level = level
        self.str_easy = [
            "111111111111111111111111111111111",
            "L00010001000C1000100001000100000R",
            "101110111011101110111011101110101",
            "100000000C000000000000000C0000001",
            "111011101110111011101110111011101",
            "100000001000010000C00010000000001",
            "101110111011101110111011101110101",
            "100000000000000000000000000000001",
            "101110111011101110111011101110101",
            "1000000010C0010000000010000000001",
            "111011101110111011101110111011101",
            "100000000000000000000000000C00001",
            "101110111011101110111011101110101",
            "1000000C100001C000000010000000001",
            "111011101110111011101110111011101",
            "100000000000000000000000C00000001",
            "111111111111111111111111111111111",
        ]
        self.str_medium = [
            "111111111111111111111111111111111",
            "L00010001000C100000001C100010000R",
            "101110111011101110111101101110101",
            "100000000000000000000000000000001",
            "111011101110111011101110111011101",
            "100C000010000100000000100000C0001",
            "101110111011101110111011101110101",
            "1000000000000000000000000000000C1",
            "101110111011101110111011101110101",
            "100C000010000100000000100000C0001",
            "111011101110111011101110111011101",
            "100000000000000000000000000000001",
            "101110111011101110111101101110101",
            "100010001010C010000001C1000100011",
            "111111111111111111111111111111111",
        ]
        self.str_hard = [
            "111111111111111111111111111111111",
            "L00C1000100C10000100010000100010R",
            "101110111011101110111011101110101",
            "100000000000000000000000000000001",
            "111011101110111011101110111011101",
            "100000001000010000000C10000000001",
            "101110111011101110111011101110101",
            "10C0000000000000000000000000C0001",
            "101110111011101110111011101110101",
            "1000000010000100C0000010000000001",
            "111011101110111011101110111011101",
            "1C00000000000000000000000000000C1",
            "101110111011101110011011101110101",
            "100C10001000010001C100010001C0001",
            "111111111111111111111111111111111",
        ]
        self.impliment_map()

    def impliment_map(self):
        str_map = self.str_easy if self.level == "easy" else self.str_medium if self.level == "medium" else self.str_hard
        self.map = [list(row) for row in str_map]
        for row in self.map:
            self.count_C += row.count('C')

    def update_map(self, player, newX, newY):
        if self.map[newY][newX] == 'C':
            player["score"] += 1
            self.count_C -= 1
        self.map[player['y']][player['x']] = '0'
        player['x'], player['y'] = newX, newY
        self.map[newY][newX] = player['symbol']

class Player:
    def __init__(self,id, symbol):
        self.id = id
        self.symbol = symbol
        self.score = 0
class GameManager:
    def __init__(self , map , dict_rooms, group_name , RidForSend , LidForSend , player_container):
        self.parentMap = map
        self.dict_rooms = dict_rooms
        self.group_name = group_name
        self.result = ''
        self.players_ctr = player_container
        self.player_container_for_send = {}
        self.players = {
            'L': {'x': 0, 'y': 1, 'score': 0, 'symbol': 'L' , 'id': LidForSend},
            'R': {'x': len(self.parentMap.map[0]) - 1, 'y': 1, 'score': 0, 'symbol': 'R' , 'id': RidForSend}
        }

    def move_player(self, player_key, dx, dy):
        player = self.players[player_key]
        newX, newY = player['x'] + dx, player['y'] + dy
        if 0 <= newX < len(self.parentMap.map[0]) and 0 <= newY < len(self.parentMap.map):
            if self.parentMap.map[newY][newX] != '1' and self.parentMap.map[newY][newX] not in ['L', 'R']:
                self.parentMap.update_map(player, newX, newY)
                self.dict_rooms[self.group_name] = self.parentMap.map
    def get_game_state(self, player_key , win_ref):
        if self.parentMap.count_C == 0 and self.players['L']['score'] == self.players['R']['score'] and self.players['R']['score'] != 0 and self.players['L']['score'] != 0:
                self.result = 'Draw'
        if player_key == 'L':
            if self.parentMap.count_C == 0 and self.players['L']['score'] >= win_ref:
                self.result = 'Lplayer Win'
            if self.players_ctr and self.players['L']['id'] :
                self.players_ctr[self.players['L']['id']]['Lscore'] = self.players['L']['score']
                self.players_ctr[self.players['L']['id']]['Rscore'] = self.players['R']['score']
                self.player_container_for_send = self.players_ctr[self.players['L']['id']]
           
            return { 'map': self.parentMap.map,
                 'Lscore': self.players['L']['score'],
                 'Rscore': self.players['R']['score'],
                 'id': self.players['L']['id'],
                 'symbol': player_key ,
                 'result': self.result,
                 'player_container': self.player_container_for_send,
                 'message': 'G'
                }
        elif player_key == 'R':
            if self.parentMap.count_C == 0 and self.players['R']['score'] >= win_ref:
                self.result = 'Rplayer Win'
            if self.players_ctr and self.players['R']['id'] :
                self.players_ctr[self.players['R']['id']]['Lscore'] = self.players['L']['score']
                self.players_ctr[self.players['R']['id']]['Rscore'] = self.players['R']['score']
                self.player_container_for_send = self.players_ctr[self.players['R']['id']]
            
            return { 'map': self.parentMap.map,
                    'Rscore': self.players['R']['score'],
                    'Lscore': self.players['L']['score'],
                    'id': self.players['R']['id'],
                    'symbol': player_key ,
                    'result': self.result,
                    'player_container': self.player_container_for_send,
                    'message': 'G'
                    }
        
class LocalGameManager:
    def __init__(self , map):
        self.parentMap = map
        self.players = {
            'L': {'x': 0, 'y': 1, 'score': 0, 'symbol': 'L'},
            'R': {'x': len(self.parentMap.map[0]) - 1, 'y': 1, 'score': 0, 'symbol': 'R'}
        }

    def move_player(self, player_key, dx, dy):
        player = self.players[player_key]
        newX, newY = player['x'] + dx, player['y'] + dy
        if 0 <= newX < len(self.parentMap.map[0]) and 0 <= newY < len(self.parentMap.map):
            if self.parentMap.map[newY][newX] != '1' and self.parentMap.map[newY][newX] not in ['L', 'R']:
                self.parentMap.update_map(player, newX, newY)
    def get_game_state(self):
            return { 'map': self.parentMap.map,
                 'players': self.players,
                 'message': 'G'
                }