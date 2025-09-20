# admin serializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from Patient.models import *
from doctor.models import *
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

class RequestedAppoinmentSerializer(serializers.ModelSerializer):
    patient=PatientSerializer()
    location=LocationSerializer()
    class Meta:
        model = Appoinment_request
        fields ='__all__'


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