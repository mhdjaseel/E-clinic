from django.contrib import admin
from . models import *
# Register your models here.

admin.site.register(Location)

@admin.register(Hospitals)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ('name', 'location')
    filter_horizontal = ('departments',)  # or use filter_vertical

admin.site.register(Department)
admin.site.register(HealthTips)
