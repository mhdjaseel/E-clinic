# serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from doctor.models import Doctor
from admin_app.models import Department,Location,Hospitals
from Patient.models import TimeSlot,Patient

User = get_user_model()



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'id','username', 'email','user_type']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields= '__all__'
class DepartmentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'      
         
class HospitalSerializer(serializers.ModelSerializer):
    location=LocationSerializer()
    departments = DepartmentDetailsSerializer(many=True)
    class Meta:
        model = Hospitals
        fields = '__all__'



class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = '__all__'

