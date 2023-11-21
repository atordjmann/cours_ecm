from django.http import HttpResponse, JsonResponse


from .models import Offer, Company, User
from .serializers import OfferSerializer


def get_data(request):
    data = Offer.objects.all()
    if request.method == 'GET':
        serializer = OfferSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)