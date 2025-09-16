from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from.serializers import *
from django.contrib.auth import authenticate
from rest_framework  import status
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
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
        
