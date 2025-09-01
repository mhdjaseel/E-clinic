from rest_framework import serializers
from django.contrib.auth import get_user_model


from django.contrib.auth.hashers import make_password
from .models import *

User = get_user_model()


class DoctorRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Doctor
        fields = [
            'username', 'email', 'password',  
            'phone_number', 'gender' ,'specialization','Hospital_name' 
        ]

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value
    
    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        # Create the user
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password),
            user_type='doctor'
        )

        doctor = Doctor.objects.create(user=user, **validated_data)
        return doctor

class DoctorLoginSerializer(serializers.Serializer):
        username=serializers.CharField()
        password=serializers.CharField()

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class DoctorProfileSerializer(serializers.ModelSerializer):
    user = DoctorSerializer()

    class Meta:
        model = Doctor
        fields = ['user', 'phone_number', 'specialization', 'Hospital_name', 'gender']


