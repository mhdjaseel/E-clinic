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
    path("InsuranceVerified/", InsuranceVerified.as_view(), name="InsuranceVerified"),
    path("ResourseCounts/", ResourseCounts.as_view(), name="ResourseCounts"),
    path("HospitalDetailsView/", HospitalDetailsView.as_view(), name="HospitalDetailsView"),
    path("departmentsAndLocations/", departmentsAndLocations.as_view(), name="departmentsAndLocations"),
    path("CreateHospitalView/", CreateHospitalView.as_view(), name="CreateHospitalView"),
    path("DeleteHospitalView/", DeleteHospitalView.as_view(), name="DeleteHospitalView"),
    path("LocationDetailsView/", LocationDetailsView.as_view(), name="LocationDetailsView"),
    path("CreateLocationView/", CreateLocationView.as_view(), name="CreateLocationView"),
    path("DeleteLocationView/", DeleteLocationView.as_view(), name="DeleteLocationView"),
    path("CreateDepartmentView/", CreateDepartmentView.as_view(), name="CreateDepartmentView"),
    path("DeleteDepartmentView/", DeleteDepartmentView.as_view(), name="DeleteDepartmentView"),
    path("TimeslotDetailsView/", TimeslotDetailsView.as_view(), name="TimeslotDetailsView"),
    path("CreateTimeslotsView/", CreateTimeslotsView.as_view(), name="CreateTimeslotsView"),
    path("DeleteTimeslotsView/", DeleteTimeslotsView.as_view(), name="DeleteTimeslotsView"),
    path("HealthtipsDetailsView/", HealthtipsDetailsView.as_view(), name="HealthtipsDetailsView"),
    path("DeleteHealthtipsView/", DeleteHealthtipsView.as_view(), name="DeleteHealthtipsView"),
    path("CreateHealthTipView/", CreateHealthTipView.as_view(), name="CreateHealthTipView"),
    

    
]
