from django.shortcuts import render
from .models import Turf, TurfPhoto, Ground
from .serializers import TurfSerializer, TurfImageSerializer, GroundSerializer, TurfListSerializer
# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets


class TurfViewSet(viewsets.ModelViewSet):
    queryset = Turf.objects.all().order_by('id')
    serializer_class = TurfListSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['vendorId', ]

    # def get_serializer_class(self, *args, **kwargs):
    #     if self.request.method == 'POST':
    #         return TurfSerializer
    #     return TurfListSerializer


class TurfPhotoViewSet(viewsets.ModelViewSet):
    queryset = TurfPhoto.objects.all().order_by('id')
    serializer_class = TurfImageSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['turfId', ]


class GroundViewSet(viewsets.ModelViewSet):
    queryset = Ground.objects.all().order_by('id')
    serializer_class = GroundSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['turfId', ]
