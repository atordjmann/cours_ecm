from rest_framework import serializers
from .models import Offer


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ('title', 'company', 'location', 'sector', 'type', 'created_date')
