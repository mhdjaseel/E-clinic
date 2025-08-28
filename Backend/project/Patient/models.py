from django.db import models
    
from django.conf import settings

class Patient(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='user_details')
    phone_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    date_of_birth = models.DateField()
    address = models.TextField()

    def __str__(self):
        return self.user.username


class PatientInsurance(models.Model):
    owner=models.ForeignKey(Patient, related_name='insurance',on_delete=models.CASCADE)
    Company_name=models.CharField( max_length=50)
    Policy_number=models.CharField(max_length=50)
    Policy_holder=models.CharField( max_length=50)
    Plan_type=models.CharField( max_length=50 ,choices=[('PPO','PPO'),('MMO','MMO'),('Medicare','Medicare')])
    Policy_date=models.DateField( auto_now=False, auto_now_add=False)
    Insurance_img=models.ImageField( upload_to='insuranceImg/')
    Verified=models.BooleanField(default=False)

    def __str__(self):
        return self.owner.user.username