from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.

class PatientRegisterView(APIView):

    def post(self,request):
        serializer=PatientRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'messages':'Patient registered successfully!'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PatientLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        serializer=PatientLoginSerializer(data=request.data)
        if serializer.is_valid():
            username= serializer.data['username']
            password= serializer.data['password']

            user=authenticate(username=username,password=password)
            if user :
                refresh = RefreshToken.for_user(user)

                return Response({
                    'message': 'Successfully logged in',
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }, status=status.HTTP_200_OK)

            else:
                return Response({
                    'message':'Invalid details'
                }) 
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PatientDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            patient=request.user.user_details

        except Patient.DoesNotExist:
            return Response({'error': 'Patient profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PatientSerializer(patient)
        return Response(serializer.data)