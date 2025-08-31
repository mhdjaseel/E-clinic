from django.db import models
from doctor.models import Doctor
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
    

# TimeSlot is the definition of fixed 6 slots
class TimeSlot(models.Model):
    label = models.CharField(max_length=50)  
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return self.label

# AvailableSlot is a slot for a specific doctor and date
class AvailableSlot(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('doctor', 'date', 'slot')  

    def __str__(self):
        return f"{self.doctor} - {self.date} - {self.slot}"

# Appointment ties a patient to a slot
class Appointment(models.Model):
    STATUS_CHOICES = [
        ('booked', 'Booked'),
        ('canceled', 'Canceled'),
        ('rescheduled', 'Rescheduled'),
    ]
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    slot = models.ForeignKey(AvailableSlot, on_delete=models.CASCADE, unique=True)
    booked_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='booked')
    def __str__(self):
        return f"{self.patient.user.username} - {self.slot}"


