from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from rest_framework import status
# Create your views here.

class PatientRegisterView(APIView):
    def post(self,request):
        if request.method =='POST':
            serializer=PatientRegisterSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'messages':'Patient registered successfully!'})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)