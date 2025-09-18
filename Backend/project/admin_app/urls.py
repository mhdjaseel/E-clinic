from django.urls import path
from .views import *
urlpatterns = [
    path("AdminLogin/", AdminLogin.as_view(), name="AdminLogin"),
    path("RequestedAppoinments/", RequestedAppoinments.as_view(), name="RequestedAppoinments")
]
