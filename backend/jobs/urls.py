from django.urls import path
from django.views.generic import TemplateView
from .views import get_data, OfferViewSet

app_name = "jobs"
urlpatterns = [
    path('offers', OfferViewSet.as_view()),
    path('', TemplateView.as_view(template_name="home.html"), name="home")
]
