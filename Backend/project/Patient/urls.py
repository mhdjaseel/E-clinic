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
     path("AppointmentView/", AppointmentView.as_view(), name="AppointmentView"),
    path("AvailableSlotView/", AvailableSlotView.as_view(), name="AvailableSlotView"),
    path("DoctorsListView/", DoctorsListView.as_view(), name="DoctorsListView"),
    path("BookedPatientAppoinments/", BookedPatientAppoinments.as_view(), name="BookedPatientAppoinments"),
    path("PatientAppoinmentsDetails/<int:pk>", PatientAppoinmentsDetails.as_view(), name="PatientAppoinmentsDetails"),
    path("CancelAppoinmentView/<int:pk>", CancelAppoinmentView.as_view(), name="CancelAppoinmentView"),
    path("RescheduleView/", RescheduleView.as_view(), name="RescheduleView"),
    path("MedicalHistoryView/", MedicalHistoryView.as_view(), name="MedicalHistoryView"),
    path("PrescriptionDetailsView/<int:pk>/", PrescriptionDetailsView.as_view(), name="PrescriptionDetailsView"),
    path("AppoinmentRequest/", AppoinmentRequest.as_view(), name="AppoinmentRequest"),
    path("LocationDetails/", LocationDetails.as_view(), name="LocationDetails"),
    path("DepartmentDetails/", DepartmentDetails.as_view(), name="DepartmentDetails"),
    path("RescheduleRequestView/", RescheduleRequestView.as_view(), name="RescheduleRequestView"),
    path("PaymentCheckout/", PaymentCheckout.as_view(), name="PaymentCheckout"),
    path("PaymentCreation/", PaymentCreation.as_view(), name="PaymentCreation"),
    path("PaymentHistoryView/", PaymentHistoryView.as_view(), name="PaymentHistoryView")
]
