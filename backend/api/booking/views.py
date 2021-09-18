from django.shortcuts import render

# Create your views here.
from .models import Booking
from .serializers import BookingSerializer, BookingListSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('id')
    serializer_class = BookingSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['vendorId', 'vendor', 'user']

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == 'POST':
            return BookingSerializer
        elif self.request.method == 'PUT':
            return BookingSerializer
        return BookingListSerializer
