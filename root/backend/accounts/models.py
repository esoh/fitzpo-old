from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Create your models here.

class AccountManager(BaseUserManager):
    def create_user(self, username, email, password):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError('The given username must be set')

        account = self.model(
            email = self.normalize_email(email),
            username = self.model.normalize_username(username)
        )

        account.set_password(password)
        account.save(using=self._db)
        return account
    def create_superuser(self, username, password, email=None):
        user = self.create_user(
            username=username,
            email=email,
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)

class Account(AbstractBaseUser):
    username = models.CharField(unique=True, max_length=64)
    email = models.EmailField(unique=True)
    is_admin = models.BooleanField(default=False)

    # AbstractBaseUser needs a unique identifier.
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    objects = AccountManager()

    # the methods below allow you to login to the API browser as an admin

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app?"
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

