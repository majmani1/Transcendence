from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class PrivateChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = private_chat
        fields = '__all__'

class msgSerializer(serializers.ModelSerializer):
    chaaat = PrivateChatSerializer(read_only=True)
    class Meta:
        model = chat_mesg
        fields = '__all__'

#replace with user with freind
class fetchUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class fetchGrp(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = '__all__'

class fetchGroupMessages(serializers.ModelSerializer):
    # sender = fetchUser(read_only=True)
    
    class Meta:
        model = GroupMessages
        fields = '__all__'
    

class fetchGroupUsers(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()
    class Meta:
        model = GroupUsers
        fields = '__all__'

    def get_picture(self, obj):
        return str(obj.picture) if obj.picture else None