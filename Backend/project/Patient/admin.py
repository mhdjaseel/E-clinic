from django.contrib import admin
from.models import *
# Register your models here.
admin.site.register(Patient)
admin.site.register(PatientInsurance)
admin.site.register(Appointment)
admin.site.register(AvailableSlot)
admin.site.register(TimeSlot)
admin.site.register(Appoinment_request)
admin.site.register(Payments)




