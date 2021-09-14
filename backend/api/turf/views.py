from django.shortcuts import render
from .models import Turf, TurfPhoto, Ground
from .serializers import TurfSerializer, TurfImageSerializer, GroundSerializer, TurfListSerializer
# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


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
    parser_classes = (FormParser, MultiPartParser, FileUploadParser)


class CreateTurfPhoto(APIView):
    permission_classes = (AllowAny,)
    parser_class = (MultiPartParser,)

    def post(self, request, pk):
        print(pk)
        turf = Turf.objects.get(id=pk)
        print(request.data)
        image = request.data['image']
        turfPhoto = TurfPhoto(turfId=turf, image=image)
        turfPhoto.save()
        return Response({'message': 'success'})


class GroundViewSet(viewsets.ModelViewSet):
    queryset = Ground.objects.all().order_by('id')
    serializer_class = GroundSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['turfId', ]
