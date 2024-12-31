from django.contrib import admin
from subscrib.models import *
from django.contrib.auth.admin import UserAdmin
from .models import user_pro

# Register your models here.
admin.site.register(user_pro)
