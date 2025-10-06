# patient serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.Serializers import (
    UserSerializer,
    HospitalSerializer,
    DepartmentDetailsSerializer,
    TimeSlotSerializer,
    
)
from django.contrib.auth.hashers import make_password
from .models import *
from doctor.models import *
from admin_app.models import *
User = get_user_model()

class PatientRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Patient
        fields = [
            'username', 'email', 'password',  
            'phone_number', 'gender', 'date_of_birth', 'address'  
        ]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value
    
    def create(self, validated_data):
        # Extract user-related fields
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        # Create the user
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password),
            user_type='patient'
        )

        # Create the patient linked to the user
        patient = Patient.objects.create(user=user, **validated_data)
        return patient

class PatientLoginSerializer(serializers.Serializer):
        username = serializers.CharField()
        password = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'id','username', 'email','user_type']


class InsuranceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientInsurance
        fields='__all__'

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested serializer to include user details
    class Meta:
        model = Patient
        fields = [ 'id','user', 'phone_number', 'address', 'date_of_birth', 'gender','had_insurance']

class PatientInsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model=PatientInsurance
        fields=['Company_name','Policy_number','Policy_holder','Plan_type','Policy_date','Insurance_img']

    def create(self, validated_data):

        return (PatientInsurance.objects.create(owner=self.context['owner'], **validated_data))
    


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['doctor','slot']
    def create(self, validated_data):
        
        patient=self.context['patient']
        location=self.context['location']
        department=self.context['departments']

        return Appointment.objects.create(patient=patient,location=location,departments=department,**validated_data)

class AvailableSlotsSerializer(serializers.ModelSerializer):
    slot=TimeSlotSerializer()
    class Meta:
        model = AvailableSlot
        fields = ['id','doctor','date','slot']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields= '__all__'

class DepartmentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields= '__all__'

class DoctorsListSeriualizer(serializers.ModelSerializer):
    user=UserSerializer()
    hospital_name=HospitalSerializer()
    specialization=DepartmentDetailsSerializer()
    class Meta:
        model = Doctor
        fields = ['id','user', 'phone_number', 'specialization', 'hospital_name', 'gender']

class PatientAppoinmentsSerializer(serializers.ModelSerializer):
    slot=AvailableSlotsSerializer()
    doctor=DoctorsListSeriualizer()
    location=LocationSerializer()
    class Meta:
        model = Appointment
        fields = '__all__'

class PrescriptionDetailsSerializer(serializers.ModelSerializer):
    doctor=DoctorsListSeriualizer(read_only=True)
    patient=PatientSerializer(read_only=True)
    appointment=PatientAppoinmentsSerializer(read_only=True)
    class Meta:
        model = Prescription
        fields = '__all__'

class MedicineDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'

class AppoinmentRequestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Appoinment_request
        fields= '__all__'
        read_only_fields = ['patient', 'location', 'status'] 
    def create(self, validated_data):
        patient=self.context['patient']
        location=self.context['location']

        return Appoinment_request.objects.create(
            patient=patient,location=location,is_paid=True,**validated_data
        )
    

class AppoinmentRequestDetails(serializers.ModelSerializer):
    appointment= PatientAppoinmentsSerializer()
    location=LocationSerializer()
    class Meta:
        model = Appoinment_request
        fields =  '__all__'