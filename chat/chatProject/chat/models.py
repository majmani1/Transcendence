from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from datetime import timedelta

class user_online(models.Model):
    user_online = models.CharField(max_length=80)
    def __str__(self):
        return self.user_online
class userBlockChat(models.Model):
    user_block = models.CharField(max_length=80)
    def __str__(self):
        return self.user_block

class private_chat(models.Model):
    sender = models.CharField(max_length=255)
    receiver = models.CharField(max_length=255)
    user_online = models.ManyToManyField(user_online, blank=True)
    is_block = models.BooleanField(default=False)
    user_block = models.ManyToManyField(userBlockChat, blank=True)
    def blockUser(self, username):
        self.is_block = True
        # print("hahiya truuuuuuuue")
        user , create = userBlockChat.objects.get_or_create(user_block=username)
        if not self.user_block.filter(user_block=username).exists():
            self.user_block.add(user)
        self.save()
    def unblockUser(self, username):
        user , create = userBlockChat.objects.get_or_create(user_block=username)
        if self.user_block.filter(user_block=username).exists():
            self.user_block.remove(user)
        if self.user_block.count() == 0:
            self.is_block = False
        self.save()
    def checkuserblock(self, username):
        user , create = userBlockChat.objects.get_or_create(user_block=username)
        return self.user_block.filter(user_block=username).exists()

    created = models.DateTimeField(default=now)
    online = models.IntegerField(default=0)
    def get_socketName(self):
        return f'/{self.sender}/{self.receiver}'
    def __str__(self):
        return self.get_socketName()
    class Meta:
        ordering = ['-created']


class chat_mesg(models.Model):
    # test = models.ForeignKey(user_pro, on_delete=models.CASCADE)
    chaaat = models.ForeignKey(private_chat, on_delete=models.CASCADE, default=None)
    # messages = models.OneToOneField(users, on_delete=models.CASCADE)
    # sender = models.ForeignKey(User,related_name='sender' , on_delete=models.CASCADE)
    sender = models.CharField(max_length=300, default=None)
    vu = models.BooleanField(default=False)
    message = models.CharField(max_length=300, default=None)
    # receiver = models.ForeignKey(User,related_name='recaiver' , on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    

    # # def get_user(self):
    # #     return 
    
    # def __str__(self):
    #     return f'{self.sender.get_username()} send : #{self.message}#'

    class Meta:
        ordering = ['-created']
# class user(models.Model):
#     name = models.CharField(max_length=50, unique=True)
#     avatar = models.ImageField()
#     mess = models.OneToOneField(chat_mess, on_delete=models.CASCADE, default=None)
#     sender = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    
#     def __str__(self):
#         return self.name

class GroupUsers(models.Model):
    
    user = models.CharField(max_length=50, default="") ####### nrodo userid 
    username = models.CharField(max_length=50, default="") ###### nziid username
    picture = models.ImageField(default="undefined.jpg")
    owner = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    is_muted = models.BooleanField(default=False)
    muted_until = models.DateTimeField(null=True, blank=True)
    mute_always = models.BooleanField(default=False)
    groupNameUser = models.CharField(max_length=30, default="")

    def muteUser(self, timeout=None):
        self.is_muted = True
        if timeout == None :
            # print("nooooooone")
            self.mute_always = True
            self.muted_until = None
        else :
            # print(timeout)
            self.muted_until = now() + timedelta(minutes=timeout)
        self.save()
    def unmuteUser(self):
        self.mute_always = False
        self.is_muted = False
        self.muted_until = None
        self.save()
    def checkStatusOfMute(self):
        # print(self.mute_always)
        if self.mute_always :
            return 'always'
        if self.is_muted and self.muted_until and now() >= self.muted_until:
            return 0
        elif self.is_muted and self.muted_until:
            return self.muted_until - now()
        else:
            return 0

    def __str__(self):
        return self.user

class Groups(models.Model):
    users = models.ManyToManyField(GroupUsers,blank=True, related_name="users")
    groupName = models.CharField(max_length=10, unique=True)
    typeOfGroup = models.CharField(max_length=50, default="")
    code = models.TextField(default="", null=True)
    users_baned = models.ManyToManyField(GroupUsers, blank=True)
    
    def __str__(self) :
        return self.groupName
class GroupMessages(models.Model):
    group = models.ForeignKey(Groups, on_delete=models.CASCADE)
    sender = models.CharField(max_length=60)
    sender_username = models.CharField(max_length=60, default="") 
    message = models.CharField(max_length=1000)
    create = models.DateField(auto_now_add=True)

    class Meta :
        ordering = ['-create']