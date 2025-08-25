from django.urls import path
from .views import *
urlpatterns = [
    path("patientRegister/",PatientRegisterView.as_view(), name="patientRegister")
]
