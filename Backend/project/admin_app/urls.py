from django.urls import path
from .views import *
urlpatterns = [
    path("AdminLogin/", AdminLogin.as_view(), name="AdminLogin"),
    path("RequestedAppoinments/", RequestedAppoinments.as_view(), name="RequestedAppoinments"),
    path("DoctorsAvailable/", DoctorsAvailable.as_view(), name="DoctorsAvailable"),
    path("HealthTipsDetails/", HealthTipsDetails.as_view(), name="HealthTipsDetails"),
    path("AppoinmentsCounts/", AppoinmentsCounts.as_view(), name="AppoinmentsCounts"),
    path("RecentPayments/", RecentPayments.as_view(), name="RecentPayments"),
    path("TotalUserList/", TotalUserList.as_view(), name="TotalUserList")
    
]
