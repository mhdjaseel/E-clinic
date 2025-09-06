from django.urls import path
from .views import *
urlpatterns = [
    path("patientRegister/",PatientRegisterView.as_view(), name="patientRegister"),
    path("patientLogin/",PatientLoginView.as_view(), name="patientLogin"),
    path("PatientDetailsView/",PatientDetailsView.as_view(), name="PatientDetailsView"),
    path("PatientInsurance/",PatientInsuranceView.as_view(), name="PatientInsurance"),
    path("InsuranceDetails/", InsuranceDetails.as_view(), name="InsuranceDetails"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path("AppointmentView/", AppointmentView.as_view(), name="AppointmentView"),
    path("AvailableSlotView/", AvailableSlotView.as_view(), name="AvailableSlotView"),
    path("DoctorsListView/", DoctorsListView.as_view(), name="DoctorsListView")
]
