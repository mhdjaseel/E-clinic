from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from Patient.models import *
# Create your views here.

class DoctorRegisterView(APIView):
    def post(self,request):
        serializer=DoctorRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Successfullt Registered '},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_200_OK)
    
class DoctorLoginView(APIView): 
    permission_classes = [AllowAny]
    def post(self,request):
        serializer=DoctorLoginSerializer(data=request.data)
        if serializer.is_valid():
            username=serializer.validated_data['username']
            password=serializer.validated_data['password']    

            user=authenticate(username=username,password=password)

            if user is not None:
                if user.user_type =='doctor':
                    refresh=RefreshToken.for_user(user)

                    return Response({
                        'message':'Succesfully Login',
                        'access':str(refresh.access_token),
                        'refresh':str(refresh)
                    },status=status.HTTP_200_OK)
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
                
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class DoctorProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            doctors=request.user.doctor
        except AttributeError:
            return Response({'error': 'Doctor profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer=DoctorProfileSerializer(doctors)
        return Response(serializer.data)

class TimeSlotsView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        slots=TimeSlot.objects.all()
        serializer = TimeSlotSerializer(slots, many=True)
        
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class SetSlots(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        doctor=request.user.doctor
        serializer=SetSlotSerializer(data=request.data,context={'doctor':doctor})
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message':'successfully Added '
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
