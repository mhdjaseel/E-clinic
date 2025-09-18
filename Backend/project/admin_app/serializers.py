from rest_framework import serializers
from django.contrib.auth import get_user_model
from Patient.models import *
from Patient.serializers import PatientSerializer,LocationSerializer,DepartmentDetailsSerializer
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