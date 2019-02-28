from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.

class Account(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=64)

    # AbstractBaseUser needs a unique identifier.
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
