from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
import shortuuid

class user_pro(AbstractUser):
    id = models.CharField(
        max_length=22,  
        primary_key=True,  
        default=shortuuid.uuid,  
        editable=False  
    )

    id_user = models.CharField(null=True ,max_length=101)
    picture = models.ImageField(default="undefined.jpg")
    friends = models.ManyToManyField('self', blank=True)
    Oauth_from = models.CharField(null=True, max_length=100)
    number_of_games = models.IntegerField(default=0)
    number_of_wins = models.IntegerField(default=0)
    number_of_loses = models.IntegerField(default=0)
    number_of_wins_pong = models.IntegerField(default=0)
    number_of_wins_hunter = models.IntegerField(default=0)
    level = models.FloatField(default=0)
    status_player = models.CharField(default="out Game", max_length=100)
    online = models.BooleanField(default=False)

    def send_friend_request(self, to_user):
        FriendRequest.objects.create(from_user=self, to_user=to_user)

    def accept_friend(self, from_user):
        try:        
            request = FriendRequest.objects.get(from_user=from_user, to_user=self)
            self.friends.add(from_user)
            from_user.friends.add(self)
            request.delete()
        except FriendRequest.DoesNotExist:
            raise ValueError("Friend request does not exist.")

    def refuse_friend(self, from_user):
        try:
            request = FriendRequest.objects.get(from_user=from_user, to_user=self)
            request.delete()
        except FriendRequest.DoesNotExist:
            raise ValueError("Friend request does not exist.")
        
    def remove_friend(self, friend):
        if friend in self.friends.all():
            self.friends.remove(friend)
            friend.friends.remove(self)
        else:
            raise ValueError(f"{friend.username} is not your friend.")


from django.conf import settings

class FriendRequest(models.Model):
    from_user = models.ForeignKey(user_pro, related_name='sent_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(user_pro, related_name='received_requests', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.from_user} -> {self.to_user}"

    def accept(self):
        self.to_user.friends.add(self.from_user)
        self.from_user.friends.add(self.to_user)
        self.delete()