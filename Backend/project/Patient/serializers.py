# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model


from django.contrib.auth.hashers import make_password
from .models import *

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
        fields = [ 'id','username', 'email']

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested serializer to include user details

    class Meta:
        model = Patient
        fields = [ 'user', 'phone_number', 'address', 'date_of_birth', 'gender']

class PatientInsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model=PatientInsurance
        fields=['Company_name','Policy_number','Policy_holder','Plan_type','Policy_date','Insurance_img']

    def create(self, validated_data):

        return (PatientInsurance.objects.create(owner=self.context['owner'], **validated_data))
    

class InsuranceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientInsurance
        fields=['Company_name','Policy_number','Policy_holder','Plan_type','Policy_date','Insurance_img','Verified']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['patient','doctor','status']
