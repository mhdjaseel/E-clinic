from django.db import models
from django.conf import settings

# Create your models here.
class Doctor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='doctor')
    phone_number = models.CharField(max_length=15)
    specialization = models.CharField(max_length=100)
    Hospital_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])

    def __str__(self):
        return self.user.username