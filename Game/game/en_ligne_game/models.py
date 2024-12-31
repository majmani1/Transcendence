from django.db import models

# Create your models here.

class Historique_game(models.Model):
    id = models.AutoField(primary_key=True)
    id_Player1 = models.CharField(max_length=100)
    id_Player2 = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    score_player1 = models.CharField(max_length=100)
    score_player2 = models.CharField(max_length=100)
    id_Winner = models.CharField(max_length=100)
    typeGame = models.CharField(max_length=100)
    username1 = models.CharField(max_length=100)
    username2 = models.CharField(max_length=100)
    pictureUser1 = models.CharField(max_length=100,null=False, default="default_value")
    pictureUser2 = models.CharField(max_length=100,null=False, default="default_value")


    def __str__(self):
        return self.name
    pass