from rest_framework import routers
from django.urls import path, include
from .views import TurfViewSet, TurfPhotoViewSet, GroundViewSet


router = routers.DefaultRouter()

router.register(r'', TurfViewSet)


urlpatterns = [


    path('', include(router.urls)),
]
