from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *


from django.contrib.auth import authenticate
from rest_framework import status
from django.conf import settings
import traceback
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from doctor.models import *
from admin_app.models import *
import stripe
from django.utils import timezone
stripe.api_key = settings.STRIPE_SECRET_KEY

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
        patient.had_insurance = True
        patient.save()
        serializer = PatientInsuranceSerializer(data=request.data,context={'owner':patient})

        if serializer.is_valid():
            patient
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
    permission_classes = [IsAuthenticated]

    def post(self, request):

        patient_id = request.data.get('patient')
        slot_id = request.data.get('slot')
        doctor_id = request.data.get('doctor')
        location_id = request.data.get('Location')
        departments_name = request.data.get('departments')
        request_id = request.data.get('request_id')

        try:
            patient = Patient.objects.get(id=patient_id)
            available_slot = AvailableSlot.objects.get(id=slot_id)
            doctor = Doctor.objects.get(id=doctor_id)
            location = Location.objects.get(id=location_id)
            department = Department.objects.get(name=departments_name)
        except (Patient.DoesNotExist, AvailableSlot.DoesNotExist, Doctor.DoesNotExist, Location.DoesNotExist, Department.DoesNotExist):
            return Response({'error': 'Invalid ID or data provided.'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data['departments'] = department.id

        serializer = AppointmentSerializer(
            data=data,
            context={'patient': patient, 'doctor': doctor, 'location': location, 'departments': department}
        )

        if serializer.is_valid():
            request_form = Appoinment_request.objects.get(id=request_id)

            try:
                request_form.status = 'booked'
                request_form.save()

            except Appoinment_request.DoesNotExist:
                return Response({'error': 'Appointment request not found.'}, status=status.HTTP_400_BAD_REQUEST)

            available_slot.is_booked = True
            available_slot.save()

            appoinment=serializer.save()
            request_form.appointment=appoinment
            request_form.save()

            return Response({'message': 'Booked successfully'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookedPatientAppoinments(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        patient=request.user.user_details
        data=Appointment.objects.filter(patient=patient).exclude(status='Canceled')
        serializer=PatientAppoinmentsSerializer(data,many=True)
        return Response(serializer.data,status.HTTP_200_OK)
    
class PatientAppoinmentsDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            appoinment = Appointment.objects.get(id=pk)
        except Appointment.DoesNotExist:
            return Response({'message': 'Appointment Not Found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            request_obj = Appoinment_request.objects.get(appointment=appoinment)
            request_id=request_obj.id
        except Appoinment_request.DoesNotExist:
            request_obj = None
            request_id = None  
            print("No request linked to this appointment")
        print(request_id)
        serializer = PatientAppoinmentsSerializer(appoinment)
        return Response({
            'data':serializer.data,
            'request_id':request_id
            }, status=status.HTTP_200_OK)


class CancelAppoinmentView(APIView):
    permission_classes=[IsAuthenticated]

    def delete(self,request,pk):
        appoinment=Appointment.objects.get(id=pk)
        request_obj= Appoinment_request.objects.get(appointment=appoinment)
        request_obj.delete() 
        slot_id=appoinment.slot.id
        not_booked=AvailableSlot.objects.get(id=slot_id)
        not_booked.is_booked=False
        not_booked.save()
        appoinment.status ='canceled'
        appoinment.slot=None
        appoinment.save()
        return Response({'message':'successfully Deleted '},status.HTTP_200_OK)
    
class RescheduleView(APIView):
    def put(self, request):
        slot_id = request.data.get('slot')
        doctor_id = request.data.get('doctor')
        location_id = request.data.get('Location')
        departments_name = request.data.get('departments')
        request_id = request.data.get('request_id')
        appointment_id=request.data.get('appointment_id')

        doctor = Doctor.objects.get(id=doctor_id)
        location = Location.objects.get(id=location_id)
        department = Department.objects.get(name=departments_name)
        try:
         
            appointment = Appointment.objects.get(id=appointment_id)
            request_form=Appoinment_request.objects.get(id=request_id)
            request_form.status='booked'
            request_form.save()


            old_slot = appointment.slot
            old_slot.is_booked = False
            old_slot.save()

            new_slot = AvailableSlot.objects.get(id=slot_id)
            new_slot.is_booked = True
            new_slot.save()

            appointment.slot = new_slot
            appointment.status='rescheduled'
            appointment.departments=department
            appointment.doctor=doctor
            appointment.location=location
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
        prescription=Prescription.objects.get(id=pk)
        data=Medicine.objects.filter(prescription=prescription)
        serializer=MedicineDetailsSerializer(data,many=True)
        return Response(serializer.data,status.HTTP_200_OK)

class LocationDetails(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        locations=Location.objects.all()
        serializer=LocationSerializer(locations,many=True)
        print(serializer.data)
        return Response(serializer.data,status.HTTP_200_OK)

class AppoinmentRequest(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):

        user=request.user.user_details.id
        patient=Patient.objects.get(id=user)
        location_id=request.data.get('location')
        location=Location.objects.get(id=location_id)
        print(location)
        serializer=AppoinmentRequestSerializer(data=request.data,context={'patient':patient,'location':location})

        if serializer.is_valid():
            appoinment_request=serializer.save()

            payments = Payments.objects.filter(paid_by=patient, request__isnull=True).order_by('-created_at').first()

            if payments:
                payments.request = appoinment_request
                payments.save()
            return Response({'message':'Successfully Send Request '},status=status.HTTP_201_CREATED)

        
        return Response({'error':' Try again '},status=status.HTTP_400_BAD_REQUEST)


class DepartmentDetails(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        departments=Department.objects.all()
        serializer=DepartmentDetailsSerializer(departments,many=True)
        return Response(serializer.data,status.HTTP_200_OK)
    
class RescheduleRequestView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        user_id = request.user.user_details.id

        try:
            patient = Patient.objects.get(id=user_id)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

        location_id = request.data.get('location')
        departments = request.data.get('departments')
        request_id = request.data.get('request_id')

        date = request.data.get('date')
        try:
            request_form = Appoinment_request.objects.get(id=request_id)
        except Appoinment_request.DoesNotExist:
            return Response({'error': 'Appointment request not found'}, status=status.HTTP_404_NOT_FOUND)
        
        try:
                request_form.date = date
        except ValueError:
                return Response({'error': ' date not found'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            location = Location.objects.get(id=location_id)
        except Location.DoesNotExist:
            return Response({'error': 'Location not found'}, status=status.HTTP_404_NOT_FOUND)
    
        request_form.patient = patient
        request_form.location = location
        request_form.departments = departments
        request_form.status = 'rescheduled'
        request_form.save()

        serializer = AppoinmentRequestDetails(request_form)
        return Response({
            'message': 'Successfully Rescheduled Request',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

class PaymentCheckout(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        amount=request.data.get('amount')
        paid_by=request.user.user_details
        currency=request.data.get('currency')
              
        try:

            YOUR_DOMAIN = "http://localhost:3000"

            stripe_amount = int(float(amount) * 100)
            paid_by_label = 'Appoinment Fee'
            session = stripe.checkout.Session.create(
                 payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': currency,
                        'product_data': {
                            'name': paid_by_label,
                        },
                        'unit_amount': stripe_amount,
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=YOUR_DOMAIN + '/Success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=YOUR_DOMAIN + '/cancel',
                metadata={
                    "user_id": str(paid_by.id),
                }
                
            )

            return Response({'sessionId':session.id},status=status.HTTP_200_OK)
        except Exception as e:
            print("Exception occurred:")
            traceback.print_exc()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PaymentCreation(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        session_id = request.data.get('session_id')
        user = request.user

        try:
            session = stripe.checkout.Session.retrieve(session_id)

            if session.payment_status == 'paid':
                stripe_amount = session.amount_total / 100  
                currency = session.currency

                if not Payments.objects.filter(stripe_payment_id=session.id).exists():
                    patient = Patient.objects.get(user=user)
                    Payments.objects.create(
                        paid_by=patient,
                        amount=stripe_amount,
                        currency=currency,
                        stripe_payment_id=session.id,
                        created_at=timezone.now().date()
                    )

                return Response({"message": "Payment verified and saved."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Payment not successful."}, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PaymentHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = request.user
        print(user)
        patient= Patient.objects.get(user=user)
        print(patient)

        payments = Payments.objects.filter(paid_by = patient)
        print(payments)
        
        serializer = PaymentSerializer(payments,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)