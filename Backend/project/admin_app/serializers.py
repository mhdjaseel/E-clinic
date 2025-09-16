from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class AdminLoginSerializers(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField()
