from django.db import models

# Create your models here.


class User(models.Model):
    email=models.EmailField(verbose_name="eメール",null=False,blank=False)
    password=models.CharField(verbose_name="パスワード",null=False,blank=False,max_length=255)