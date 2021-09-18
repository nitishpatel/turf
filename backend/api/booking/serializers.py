from rest_framework.serializers import ModelSerializer
from .models import Booking


class BookingSerializer(ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'


class BookingListSerializer(ModelSerializer):
    class Meta:
        model = Booking
        depth = 1
        fields = '__all__'
