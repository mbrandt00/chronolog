from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.db import models


class SocialAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    provider = models.CharField(max_length=100)
    access_token = models.CharField(max_length=255)
    secret = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s {self.provider} Account"
