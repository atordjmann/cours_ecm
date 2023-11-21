from django.db import models
import datetime
from django.db import models
from django.utils import timezone
from django.contrib import admin


class Company(models.Model):
    login = models.CharField(max_length=50)
    hash = models.CharField(max_length=200)
    name = models.CharField(max_length=50)
    createdDate = models.DateTimeField()

    def __str__(self):
        return self.login


class Offer(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    jobTitle = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    pub_date = models.DateTimeField("date published")

    def __str__(self):
        return self.jobTitle

    @admin.display(
        boolean=True,
        ordering="pub_date",
        description="Published recently?",
    )
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now


class User(models.Model):
    login = models.CharField(max_length=50)
    hash = models.CharField(max_length=200)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    isStudent = models.BooleanField()
    createdDate = models.DateTimeField()

    def __str__(self):
        return self.login

    @admin.display(
        boolean=True,
        ordering="createdDate")
    def is_student(self):
        return self.isStudent
