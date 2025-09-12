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
from django.shortcuts import get_object_or_404
from doctor.models import *
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

class AvailableSlotView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        doctor_id = request.data.get('doctor')
        date=request.data.get('date')
        if doctor_id is None:
            return Response({
                'message': 'Doctor not available'
            },status=status.HTTP_400_BAD_REQUEST)
        slots=AvailableSlot.objects.filter(doctor_id=doctor_id,date=date,is_booked=False)
        if not slots.exists():
            return Response({
                'message': 'slots not available please Try Later'
            },status=status.HTTP_404_NOT_FOUND)
        serializer = AvailableSlotsSerializer(slots, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DoctorsListView(APIView):

    def get(self,request):
        doctors_list=Doctor.objects.all()
        print(doctors_list)
        serializer=DoctorsListSeriualizer(doctors_list,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

class AppointmentView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        patient=request.user.user_details
        AvailableSlot_id=request.data.get('slot')
        serializer=AppointmentSerializer(data=request.data,context={'patient':patient})
        if serializer.is_valid():
            booked=AvailableSlot.objects.get(id=AvailableSlot_id)
            booked.is_booked=True
            booked.save()
            serializer.save()
            return Response({
                'message':'Booked successfully'
            },status.HTTP_201_CREATED)
        return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)
    
class BookedPatientAppoinments(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        patient=request.user.user_details
        data=Appointment.objects.filter(patient=patient).exclude(status='Canceled')
        serializer=PatientAppoinmentsSerializer(data,many=True)
        return Response(serializer.data,status.HTTP_200_OK)
    
class PatientAppoinmentsDetails(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request,pk):
        appoinment=Appointment.objects.get(id=pk)
        try:
            serializer=PatientAppoinmentsSerializer(appoinment)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except appoinment.DoesNotExist:
            return Response({'message':'Not Found '},status=status.HTTP_404_NOT_FOUND)

class CancelAppoinmentView(APIView):
    permission_classes=[IsAuthenticated]

    def delete(self,request,pk):
        appoinment=Appointment.objects.get(id=pk)
        slot_id=appoinment.slot.id
        not_booked=AvailableSlot.objects.get(id=slot_id)
        not_booked.is_booked=False
        not_booked.save()
        appoinment.delete()
        return Response({'message':'successfully Deleted '},status.HTTP_200_OK)
    
class RescheduleView(APIView):
    def put(self, request):
        slot_id = request.data.get('selected_slot')
        appointment_id = request.data.get('id')
        patient = request.user.user_details  # assuming user is authenticated

        try:
         
            appointment = Appointment.objects.get(id=appointment_id)

            old_slot = appointment.slot
            old_slot.is_booked = False
            old_slot.save()

            new_slot = AvailableSlot.objects.get(id=slot_id)
            new_slot.is_booked = True
            new_slot.save()

            appointment.slot = new_slot
            appointment.status='rescheduled'
            appointment.save()
            return Response({'message': 'Successfully changed slot'}, status=status.HTTP_200_OK)

        except Appointment.DoesNotExist:
            return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)
        except AvailableSlot.DoesNotExist:
            return Response({'error': 'Slot not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class MedicalHistoryView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        patient=request.user.user_details
        appoinments=Prescription.objects.filter(patient=patient)
        serializer=PrescriptionDetailsSerializer(appoinments,many=True)
        return Response(serializer.data,status.HTTP_200_OK)

class PrescriptionDetailsView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request,pk):
        print(pk)

        prescription=Prescription.objects.get(id=pk)
        print(prescription)

        data=Medicine.objects.filter(prescription=prescription)
        print(data)

        serializer=MedicineDetailsSerializer(data,many=True)
        return Response(serializer.data,status.HTTP_200_OK)
