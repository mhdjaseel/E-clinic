from django.urls import path
from .views import *
urlpatterns = [
path("DoctorRegisterView/", DoctorRegisterView.as_view(), name="DoctorRegisterView"),
path("DoctorLoginView/", DoctorLoginView.as_view(), name="DoctorLoginView"),
path("DoctorProfileView/", DoctorProfileView.as_view(), name="DoctorProfileView"),
path("TimeSlotsView/", TimeSlotsView.as_view(), name="TimeSlotsView"),
path("SetSlots/", SetSlots.as_view(), name="SetSlots"),
path("BookedDoctorAppoinments/", BookedDoctorAppoinments.as_view(), name="BookedDoctorAppoinments"),
path("CreatePrescription/", CreatePrescription.as_view(), name="CreatePrescription"),
path("DoctorsMedicalHistory/", DoctorsMedicalHistory.as_view(), name="DoctorsMedicalHistory"),
path("PatientMedicalHistory<int:pk>/", PatientMedicalHistory.as_view(), name="PatientMedicalHistory")

]