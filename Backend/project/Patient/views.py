from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser

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
            if user is not None :
                if user.user_type =='patient':
                    print(user.user_type)

                    refresh = RefreshToken.for_user(user)

                    return Response({
                        'message': 'Successfully logged in',
                        'access': str(refresh.access_token),
                        'refresh': str(refresh)
                    }, status=status.HTTP_200_OK)
                return Response({
                    'message':'Invalid details'
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    'message':'Invalid details'
                }, status=status.HTTP_400_BAD_REQUEST) 
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PatientDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            patient=request.user.user_details

        except Patient.DoesNotExist:
            return Response({'error': 'Patient profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PatientSerializer(patient)
        return Response(serializer.data)

class PatientInsuranceView(APIView):
    permission_classes=[IsAuthenticated]
    parser_classes=[MultiPartParser,FormParser]
    def post(self,request):
        try:
            patient = Patient.objects.get(user=request.user)
        except patient.DoesNotExist():
            return Response({'message':'Profile not Existed'},status=404)

        serializer = PatientInsuranceSerializer(data=request.data,context={'owner':patient})

        if serializer.is_valid():
            serializer.save()
            return Response({'message':'successfully Added Insurance details'},status=201)
        print(serializer.errors)
        return Response(serializer.errors,status=400)


class InsuranceDetails(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        user=request.user.user_details
        Insurance = PatientInsurance.objects.filter(owner=user)
        if Insurance.exists():
            serializer= InsuranceDetailSerializer(Insurance,many=True)
            return Response (serializer.data)
        return Response ({
            'message':'No Insurance Details'
        })