from django.db import models


class Notification(models.Model):
    typeOfNotif = models.CharField(max_length=80)
    notifFrom = models.CharField(max_length=80)
    notifTo = models.CharField(max_length=80)
    groupName = models.CharField(max_length=10, default="")
    sender = models.CharField(max_length=8, default="")
# Create your models here.
#A friend request from
#ChatGroup invite from