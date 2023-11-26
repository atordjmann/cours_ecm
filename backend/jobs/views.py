from django.http import HttpResponse, JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, generics

from .models import Offer, Company, User
from .serializers import OfferSerializer


def get_data(request):
    data = Offer.objects.all()
    if request.method == 'GET':
        serializer = OfferSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

class OfferViewSet(generics.ListAPIView):
    serializer_class = OfferSerializer
    http_method_names = ['get', ]

    filter_backends = [
        DjangoFilterBackend,
    ]

    filterset_fields = {
        "title": ["exact", "icontains", "startswith"],
        "location": ["exact", "icontains", "startswith"],
        "sector": ["exact", "icontains", "startswith"],
        "type": ["exact", "icontains", "startswith"],
        "remuneration": ["range"],
        "duration": ["range"],
    }

    def get_queryset(self):
        query_set = self.filter_queryset(Offer.objects.all())
        # do action on query_set
        return query_set
