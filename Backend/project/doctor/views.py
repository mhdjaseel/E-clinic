from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from Patient.models import *
from Patient.serializers import*
# Create your views here.


class RegisteredHospitalDetails(APIView):
    def get(self,request):
        hospitals=Hospitals.objects.all()
        serializer=HospitalSerializer(hospitals,many=True)

        return Response(serializer.data)

class RegisteredDepartmentsDetails(APIView):
    def get(self,request):
        departments=Department.objects.all()
        serializer=DepartmentDetailsSerializer(departments,many=True)

        return Response(serializer.data)

class DoctorRegisterView(APIView):
    def post(self,request):
        hospital_id=request.data.get('hospital_name')
        department_id=request.data.get('specialization')
        hospital=Hospitals.objects.get(id=hospital_id)
        department=Department.objects.get(id=department_id)

        serializer=DoctorRegisterSerializer(data=request.data,context={'hospital':hospital,'department':department})
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
            hospital=Hospitals.objects.get(doctor=doctors)
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
        
class BookedDoctorAppoinments(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        doctor=request.user.doctor
        print('doctor ',doctor)
        data=Appointment.objects.filter(doctor=doctor).exclude(status='Canceled')

        serializer=DoctorAppoinmentsSerializer(data,many=True)
        return Response(serializer.data,status.HTTP_200_OK)

class CreatePrescription(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request):
        try:
            doctor = request.user.doctor
        except AttributeError:
            return Response({'error': 'Doctor profile not found.'}, status=status.HTTP_403_FORBIDDEN)
        id=request.data.get('patient')
        patient=Patient.objects.get(id=id)
        appoinmentId=request.data.get('appoinmentId')
        appoinmnet=Appointment.objects.get(id=appoinmentId)  
        print(appoinmnet)  
        appoinmnet.status='canceled'
        appoinmnet.save()
        serializer = PrescriptionSerializer(data=request.data,context={'doctor': doctor, 'patient': patient,'appoinmnet':appoinmnet})
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'successfully upload prescription'},status.HTTP_201_CREATED)
        return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)
        
class DoctorsMedicalHistory(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        doctor=request.user.doctor
        print('doctors  ',doctor)
        appoinments=Prescription.objects.filter(doctor=doctor)
        print(appoinments)
        serializer=PrescriptionDetailsSerializer(appoinments,many=True)
        return Response(serializer.data,status.HTTP_200_OK)
    

class PatientMedicalHistory(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request,pk):
        patient=Patient.objects.get(id=pk)
        appoinments=Prescription.objects.filter(patient=patient)
        serializer=PrescriptionDetailsSerializer(appoinments,many=True)
        return Response(serializer.data,status.HTTP_200_OK)
