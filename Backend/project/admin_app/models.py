from django.db import models

# Create your models here.

class Department(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Location(models.Model):
    location_name=models.CharField( max_length=50)
    def __str__(self):
        return self.location_name
    
class Hospitals(models.Model):
    name=models.CharField( max_length=50)
    location=models.ForeignKey( Location,on_delete=models.CASCADE)
    departments=models.ManyToManyField( Department)
    staffs=models.IntegerField()