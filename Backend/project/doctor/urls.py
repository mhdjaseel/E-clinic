from django.urls import path
from .views import *
urlpatterns = [
path("DoctorRegisterView/", DoctorRegisterView.as_view(), name="DoctorRegisterView")
]