from rest_framework import serializers
from .models import *

class Notifs(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'