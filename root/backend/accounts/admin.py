from django.contrib import admin
from .models import Account
from django.contrib.auth.models import Group

# Register your models here.

admin.site.register(Account)

admin.site.unregister(Group)
