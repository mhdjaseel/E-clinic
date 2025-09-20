# doctor serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from Patient.models import TimeSlot,AvailableSlot
from admin_app.models import *
from django.contrib.auth.hashers import make_password
from .models import *
from accounts.Serializers import (
    UserSerializer,
    HospitalSerializer,
    DepartmentDetailsSerializer,
    TimeSlotSerializer,
    LocationSerializer
)

User = get_user_model()


class DoctorRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Doctor
        fields = [
            'username', 'email', 'password',  
            'phone_number', 'gender' ,'specialization','hospital_name' 
        ]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value
    
    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        validated_data.pop('specialization', None)
        validated_data.pop('hospital_name', None)

        hospital_name=self.context['hospital']
        specialization=self.context['department']

        # Create the user
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password),
            user_type='doctor'
        )

        doctor = Doctor.objects.create(user=user, hospital_name=hospital_name,specialization=specialization,**validated_data)
        return doctor

class DoctorLoginSerializer(serializers.Serializer):
        username=serializers.CharField()
        password=serializers.CharField()



class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospitals
        fields = '__all__'


class DoctorProfileSerializer(serializers.ModelSerializer):
    user = DoctorSerializer()
    hospital_name=HospitalSerializer()
    specialization=DepartmentDetailsSerializer()
    class Meta:

        model = Doctor
        fields = ['user', 'phone_number', 'specialization', 'hospital_name', 'gender']

class TimeSlotSerializer(serializers.ModelSerializer):
        class Meta:
            model = TimeSlot
            fields = '__all__'

class SetSlotSerializer(serializers.Serializer):
    date=serializers.DateField()
    slots=serializers.ListField(child=serializers.CharField())

    def create(self, validated_data):
         doctor=self.context['doctor']
         date=validated_data['date']
         slots=validated_data['slots']
         for label in slots:
                try:
                    timeslot = TimeSlot.objects.get(label=label)
                    AvailableSlot.objects.get_or_create(
                        doctor=doctor,
                        date=date,
                        slot=timeslot
                    )
                except TimeSlot.DoesNotExist:
                    raise serializers.ValidationError(f"Slot '{label}' not found")

         return {"message": "Slots saved"}
    
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'id','username', 'email']

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested serializer to include user details

    class Meta:
        model = Patient
        fields = [ 'id','user', 'phone_number', 'address', 'date_of_birth', 'gender']

class AvailableSlotsSerializer(serializers.ModelSerializer):
    slot=TimeSlotSerializer()
    class Meta:
        model = AvailableSlot
        fields = ['id','doctor','date','slot']

class DoctorAppoinmentsSerializer(serializers.ModelSerializer):
     patient=PatientSerializer()
     slot=AvailableSlotsSerializer()
     doctor=DoctorProfileSerializer()
     location=LocationSerializer()
     class Meta:
            model = Appointment
            fields = '__all__'

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
     model= Medicine
     fields=['name','dosage','quantity']

class PrescriptionSerializer(serializers.ModelSerializer):
    medicines=MedicineSerializer(many=True)
    class Meta:
        model = Prescription
        fields = ['patient','doctor','summary','appointment','allergy','medicines']
        read_only_fields = ['patient', 'doctor']

    def create(self, validated_data):
        med_data=validated_data.pop('medicines')
        doctor=self.context['doctor']
        patient = self.context['patient']
        appointment=self.context['appoinmnet']
        prescription = Prescription.objects.create(
              doctor=doctor,patient=patient,appointment=appointment ,**validated_data
         )
         
        for med in med_data:
            Medicine.objects.create(prescription=prescription,**med)
        return prescription