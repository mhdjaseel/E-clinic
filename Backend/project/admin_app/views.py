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
        appoinments=Appointment.objects.all().count()
        users=User.objects.all().count()
        payments=Payments.objects.all().count()
        return Response ({
            'booking':bookings,
            'reshedule':reschedule,
            'cancel':cancel,
            'appoinments':appoinments,
            'users':users,
            'payments':payments
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
            