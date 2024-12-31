from django.contrib import admin
from .models import *

admin.site.register(chat_mesg)
admin.site.register(private_chat)
admin.site.register(Groups)
admin.site.register(GroupMessages)
admin.site.register(user_online)
admin.site.register(GroupUsers)

# Register your models here.
