from django.db import models

# Create your models here.


class User(models.Model):
    class Meta(object):
        db_table = 'user'

    user_name = models.CharField(
        'User Name', blank=False, null=False, max_length=50, db_index=True
    )
    password = models.CharField(
        'Password', blank=False, null=False, max_length=500, db_index=True
    )
    email = models.EmailField(
        'email', blank=False, null=False, max_length=254, db_index=True
    )
    token = models.CharField(
        'token', blank=True, null=True, max_length=500, db_index=True
    )
    token_expires_at = models.DateTimeField(
        'Token Expires Datetime', blank=True, null=True, 
    )
    created_at = models.DateTimeField(
        'Created Datetime', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Updated Datetime', blank=True, auto_now=True
    )

    def __str__(self):
        return self.user_name

