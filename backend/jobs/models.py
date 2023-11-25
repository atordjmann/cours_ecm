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
    id: models.IntegerField()
    id_company: models.IntegerField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    srcImgCompany = models.CharField(max_length=50)
    sector = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    remuneration = models.FloatField()
    duration = models.CharField(max_length=50)
    softSkills = models.CharField(max_length=50)
    domains = models.CharField(max_length=50)
    start_date = models.DateTimeField()
    created_date = models.DateTimeField("date published")

    def __str__(self):
        return self.title

    @admin.display(
        boolean=True,
        ordering="created_date",
        description="Published recently?",
    )
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.created_date <= now


class User(models.Model):
    id: models.IntegerField()
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=200)
    firstName = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    token = models.CharField(max_length=50)
    isStudent = models.BooleanField()

    def __str__(self):
        return self.username

    @admin.display(
        boolean=True,
        ordering="createdDate")
    def is_student(self):
        return self.isStudent
