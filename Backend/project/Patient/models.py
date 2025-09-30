from django.db import models
from django.conf import settings

class Patient(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='user_details')
    phone_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    date_of_birth = models.DateField()
    address = models.TextField()
    had_insurance=models.BooleanField(default=False)
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


class AvailableSlot(models.Model):
    doctor = models.ForeignKey('doctor.Doctor', on_delete=models.CASCADE,related_name='availableslots')
    date = models.DateField()
    slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    is_booked=models.BooleanField(default=False)
    class Meta:
        unique_together = ('doctor', 'date', 'slot')  

    def __str__(self):
        return f"{self.doctor} - {self.date} - {self.slot}"


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('booked', 'Booked'),
        ('canceled', 'Canceled'),
        ('rescheduled', 'Rescheduled'),
    ]
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey('doctor.Doctor', on_delete=models.CASCADE)
    slot = models.ForeignKey(AvailableSlot, on_delete=models.CASCADE, unique=True, related_name='appoinmentSlot')
    booked_at = models.DateTimeField(auto_now_add=True)
    location=models.ForeignKey("admin_app.Location", related_name='appoinments', on_delete=models.CASCADE,null=True)
    departments=models.ForeignKey("admin_app.Department",related_name='appoinments' , on_delete=models.CASCADE,null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='booked')
    def __str__(self):
        return self.patient.user.username




class Appoinment_request(models.Model):
    STATUS_CHOICES = [
        ('booked', 'booked'),
        ('pending', 'pending'),
        ('rescheduled', 'rescheduled'),
    ]
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE,related_name='Request')
    date=models.DateField()
    departments=models.CharField( max_length=50,null=True)
    location=models.ForeignKey( 'admin_app.Location',on_delete=models.CASCADE)
    appointment = models.ForeignKey('Appointment', on_delete=models.SET_NULL, null=True, blank=True, related_name='request')
    status=models.CharField( max_length=20,choices=STATUS_CHOICES,default='pending')
    is_paid=models.BooleanField(default=False)

    def __str__(self):
        return self.patient.user.username
    

class Payments(models.Model):
    paid_by=models.ForeignKey(Patient, related_name='payments', on_delete=models.CASCADE,null=True, blank=True)
    currency=models.CharField( max_length=50,default='usd')
    amount=models.DecimalField( max_digits=10, decimal_places=2)
    created_at=models.DateField( auto_now_add=False)
    stripe_payment_id=models.CharField( max_length=200,null=True,blank=True)
    request = models.ForeignKey(Appoinment_request, related_name='payments', on_delete=models.CASCADE,null=True,blank=True)
