from django.shortcuts import render
from .models import Vendor
from .serializers import VendorSerializer, VendorListSerializer
# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets


class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all().order_by('id')
    serializer_class = VendorSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['user', 'isVerified']

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == 'POST':
            return VendorSerializer
        return VendorListSerializer
