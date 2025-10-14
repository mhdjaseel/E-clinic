from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from.serializers import *
from django.contrib.auth import authenticate
from rest_framework  import status
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from Patient.models import *
from doctor.models import *
from admin_app.models import *
from django.db.models import Q

# Create your views here.


class AdminLogin(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        serializer=AdminLoginSerializers(data=request.data)
        if serializer.is_valid():

            username= serializer.data['username']
            password= serializer.data['password']

            user=authenticate(username=username,password=password)
            if user is not None:
                
                if user.is_superuser:
                    
                    refresh=RefreshToken.for_user(user)
                    return Response({
                        'message':'Succesfully Login',
                        'access':str(refresh.access_token),
                        'refresh':str(refresh)
                    },status=status.HTTP_200_OK)
                
                return Response({'error':'Login Failed '},status=status.HTTP_400_BAD_REQUEST)
            return Response({'error':'Invalid Credentials '},status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class RequestedAppoinments(APIView):
    def get(self,request):
        appoinments=Appoinment_request.objects.all()
        serializer=RequestedAppoinmentSerializer(appoinments,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class DoctorsAvailable(APIView):
    def post(self,request):
        specialization=request.data.get('departments')
        location=request.data.get('location')

        doctors=Doctor.objects.filter(specialization__name=specialization,hospital_name__location=location)
        serializer=DoctorsAvailableSerializer(doctors,many=True)
        return Response(serializer.data)
    
class HealthTipsDetails(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        tips=HealthTips.objects.all()
        serializer=HealthTipsDetailsSerializer(tips, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AppoinmentsCounts(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        bookings=Appoinment_request.objects.filter(status='pending').count()
        reschedule=Appoinment_request.objects.filter(status='rescheduled').count()
        cancel=Appointment.objects.filter(status='Canceled').count()
        appoinments=Appointment.objects.filter(status='booked').count()
        users=User.objects.all().count()
        payments=Payments.objects.all().count()
        insurance = PatientInsurance.objects.filter(Verified=False).count()
        return Response ({
            'booking':bookings,
            'reshedule':reschedule,
            'cancel':cancel,
            'appoinments':appoinments,
            'users':users,
            'payments':payments,
            'insurance':insurance
        },status=status.HTTP_200_OK)
    
class RecentPayments(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        payments=Payments.objects.order_by('-created_at')[:5]
        serializer = PaymentSerializer(payments,many = True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class TotalUserList(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        users=User.objects.all().exclude(user_type = 'admin')
        serializer = UserDetails(users,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class BlockUserView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request):
        id = request.data.get('id')
        user = User.objects.get(id=id)
        if user is not None :
            user.is_active = False
            user.save()
            return Response({'message':'block User'},status=status.HTTP_200_OK)
        

class UnBlockUserView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request):
        id = request.data.get('id')
        user = User.objects.get(id=id)
        if user  :
            user.is_active = True
            user.save()
            return Response({'message':'Unblock User'},status=status.HTTP_200_OK)

class TotalAppoinmentList(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        appoinments = Appointment.objects.filter(Q (status='booked') | Q (status='rescheduled'))
        serializer = AppoinmentsDetailSerializer(appoinments, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)

class TotalPayments(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        payments = Payments.objects.all()
        serializer = PaymentSerializer(payments,many = True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class InsuranceVerify(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        insurance = PatientInsurance.objects.filter(Verified=False)
        serializer = InsuranceSerializer(insurance, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class InsuranceVerified(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        id = request.data.get('id')
        insurance = PatientInsurance.objects.get(id=id)
        insurance.Verified = True
        insurance.save()
        return Response({'message':'Insurance Verified'},status=status.HTTP_200_OK)
        
class ResourseCounts(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        hospitals = Hospitals.objects.all().count()
        locations = Location.objects.all().count()
        departments = Department.objects.all().count()
        timeslots = TimeSlot.objects.all().count()

        return Response({
            'hospitals':hospitals,
            'locations':locations,
            'departments':departments,
            'timeslots':timeslots
        },status=status.HTTP_200_OK)
    
class HospitalDetailsView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        hospitals = Hospitals.objects.all()
        serializer = HospitalSerializer(hospitals, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class departmentsAndLocations(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        dep_obj = Department.objects.all()
        dep_serializer = DepartmentDetailsSerializer(dep_obj,many=True)

        loc_obj = Location.objects.all()
        Loc_serializer = LocationSerializer(loc_obj,many=True)

        return Response({
            'departments':dep_serializer.data,
            'locations':Loc_serializer.data
        },status=status.HTTP_200_OK)

class CreateHospitalView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request):
        serializer = CreateHospitalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class DeleteHospitalView(APIView):
    def delete(self,request):
        id=request.data.get('id')
        try:
            hospital = Hospitals.objects.get(id=id)
            if hospital :
                hospital.delete()
                return Response(status=status.HTTP_200_OK)
        except Hospitals.DoesNotExist:
            return Response({"error": "Hospital not found"}, status=status.HTTP_404_NOT_FOUND)
        
