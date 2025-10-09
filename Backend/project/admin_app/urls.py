from django.urls import path
from .views import *
urlpatterns = [
    path("AdminLogin/", AdminLogin.as_view(), name="AdminLogin"),
    path("RequestedAppoinments/", RequestedAppoinments.as_view(), name="RequestedAppoinments"),
    path("DoctorsAvailable/", DoctorsAvailable.as_view(), name="DoctorsAvailable"),
    path("HealthTipsDetails/", HealthTipsDetails.as_view(), name="HealthTipsDetails"),
    path("AppoinmentsCounts/", AppoinmentsCounts.as_view(), name="AppoinmentsCounts"),
    path("RecentPayments/", RecentPayments.as_view(), name="RecentPayments"),
    path("TotalUserList/", TotalUserList.as_view(), name="TotalUserList"),
    path("BlockUserView/", BlockUserView.as_view(), name="BlockUserView"),
    path("UnBlockUserView/", UnBlockUserView.as_view(), name="UnBlockUserView"),
    path("TotalAppoinmentList/", TotalAppoinmentList.as_view(), name="TotalAppoinmentList"),
    path("TotalPayments/", TotalPayments.as_view(), name="TotalPayments"),
    path("InsuranceVerify/", InsuranceVerify.as_view(), name="InsuranceVerify"),
    path("InsuranceVerified/", InsuranceVerified.as_view(), name="InsuranceVerified")

    
]
