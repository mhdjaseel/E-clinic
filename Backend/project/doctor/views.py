from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

class DoctorRegisterView(APIView):
    def post(self,request):
        serializer=DoctorRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Successfullt Registered '},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_200_OK)
        