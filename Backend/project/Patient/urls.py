from django.urls import path
from .views import *
urlpatterns = [
    path("patientRegister/",PatientRegisterView.as_view(), name="patientRegister"),
    path("patientLogin/",PatientLoginView.as_view(), name="patientLogin"),
    path("PatientDetailsView/",PatientDetailsView.as_view(), name="PatientDetailsView"),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
