from django.urls import path
from django.views.generic import TemplateView
from .views import get_data

app_name = "jobs"
urlpatterns = [
    path('offers', get_data),
    path('', TemplateView.as_view(template_name="home.html"), name="home")
]
