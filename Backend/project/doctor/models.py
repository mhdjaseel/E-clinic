from django.db import models
from django.conf import settings
from Patient.models import Patient,Appointment
# Create your models here.
class Doctor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='doctor')
    phone_number = models.CharField(max_length=15)
    specialization = models.ForeignKey("admin_app.Department", related_name='doctor', on_delete=models.CASCADE)
    hospital_name = models.ForeignKey("admin_app.Hospitals", related_name='doctor', on_delete=models.CASCADE,null=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])

    def __str__(self):
        return self.user.username
    



class Prescription(models.Model):
    doctor = models.ForeignKey(Doctor, related_name='prescriptions', on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, related_name='prescriptions', on_delete=models.CASCADE)
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='prescriptions',null=True)
    summary = models.TextField()
    allergy = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True) 

class Medicine(models.Model):
    prescription = models.ForeignKey(Prescription, related_name='medicines', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()