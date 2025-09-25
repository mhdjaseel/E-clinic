# admin serializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from Patient.models import *
from doctor.models import *
from admin_app.models import *
from Patient.serializers import PatientSerializer,LocationSerializer
from accounts.Serializers import (
    UserSerializer,
    HospitalSerializer,
    DepartmentDetailsSerializer,
    TimeSlotSerializer,
)
User = get_user_model()

class AdminLoginSerializers(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField()



class DoctorsSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class DoctorsAvailableSerializer(serializers.ModelSerializer):
    user=DoctorsSerializers()
    hospital_name=HospitalSerializer()
    class Meta:

        model = Doctor
        fields= '__all__'

class AvailableSlotsSerializer(serializers.ModelSerializer):
    slot=TimeSlotSerializer()
    class Meta:
        model = AvailableSlot
        fields = ['id','doctor','date','slot']

class AppoinmentsDetailSerializer(serializers.ModelSerializer):
    patient=PatientSerializer()
    doctor=DoctorsAvailableSerializer()
    slot=AvailableSlotsSerializer()
    class Meta:
        model = Appointment
        fields = '__all__'

class RequestedAppoinmentSerializer(serializers.ModelSerializer):
    patient=PatientSerializer()
    location=LocationSerializer()
    appointment=AppoinmentsDetailSerializer()
    class Meta:
        model = Appoinment_request
        fields ='__all__'

class HealthTipsDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthTips
        fields ='__all__'