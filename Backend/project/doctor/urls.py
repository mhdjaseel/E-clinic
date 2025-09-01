from django.urls import path
from .views import *
urlpatterns = [
path("DoctorRegisterView/", DoctorRegisterView.as_view(), name="DoctorRegisterView"),
path("DoctorLoginView/", DoctorLoginView.as_view(), name="DoctorLoginView"),
path("DoctorProfileView/", DoctorProfileView.as_view(), name="DoctorProfileView")
]