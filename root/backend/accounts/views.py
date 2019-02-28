from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AccountSerializer
from .models import Account

# Create your views here.

class AccountView(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
