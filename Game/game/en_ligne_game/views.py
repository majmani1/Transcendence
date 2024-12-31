from django.http import JsonResponse
from .models import Historique_game
from rest_framework.views import APIView
import json
import requests
from django.core.exceptions import PermissionDenied
from django.db.models import Q

def Authorization(request):
   auth_header = request.headers.get("Authorization")
   if not auth_header or not auth_header.startswith("Bearer "):
      raise PermissionDenied("Authorization token is missing or invalid.")

   token = auth_header.split(" ")[1]

   auth_service_url = "https://localhost:4443/Authe/user/Autorization_service"  # Update with actual URL
   try:
      res = requests.post(auth_service_url, headers={"Authorization": f"Bearer {token}"})
      if res == 200:
        #  print('\n\n===========-----============\n\n')
         return True
      else :
        #  print('\n\n||||||||||||||||||||||||\n\n')
         raise PermissionDenied("token is not valid.")
   except Exception as e:
      return str(e)

class game_history_view(APIView):
    
    def get(self, request, idPlayer):
        try:
            Authorization(request)
        except PermissionDenied as e:
            return JsonResponse(str(e), status=401, safe=False)
        try:
            # print(idPlayer)
            games = Historique_game.objects.filter(Q(id_Player2=idPlayer) | Q(id_Player1=idPlayer))
            # print(games)
            games_data = [
                {
                    "id_Player1": game.id_Player1,
                    "id_Player2": game.id_Player2,
                    "score_player1": game.score_player1,
                    "score_player2": game.score_player2,
                    "id_Winner": game.id_Winner,
                    "typeGame": game.typeGame,
                    "username1": game.username1,
                    "username2": game.username2,
                    "pictureUser1": game.pictureUser1 ,
                    "pictureUser2": game.pictureUser2 ,
                    "date": game.date,
                }
                for game in games
            ]
            return JsonResponse(games_data, safe=False, status=200)

        except Exception as e:
            # Log the exception for debugging purposes
            # print(f"Error retrieving game history: {e}")
            return JsonResponse({"error": "An error occurred while retrieving game history."}, safe=False, status=500)


class add_game_history_view(APIView):
    # print("add_game_history_view")
    def post(self, request):
        try:
            data = json.loads(request.body)
            # print(data)
            game = Historique_game.objects.create(
                id_Player1=data["id_Player1"],
                id_Player2=data["id_Player2"],
                # date=data["date"],
                score_player1=data["score_player1"],
                score_player2=data["score_player2"],
                id_Winner=data["id_Winner"],
                typeGame=data["typeGame"],
                username1=data["username1"],
                username2=data["username2"],
                pictureUser1=data["pictureUser1"],
                pictureUser2=data["pictureUser2"],
            )
            game.save()
            return JsonResponse({"message": "Game history added successfully."}, status=201)

        except Exception as e:
            # Log the exception for debugging purposes
            # print(f"Error adding game history: {e}")
            return JsonResponse({"error": "An error occurred while adding game history."}, safe=False, status=500)