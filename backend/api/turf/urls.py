from rest_framework import routers
from django.urls import path, include
from .views import TurfViewSet, TurfPhotoViewSet, GroundViewSet, CreateTurfPhoto


router = routers.DefaultRouter()

router.register(r'', TurfViewSet)


urlpatterns = [
    path('createturfphoto/<uuid:pk>',
         CreateTurfPhoto.as_view(), name='create_turf_photo'),

    path('', include(router.urls)),
]
