from rest_framework import routers
from django.urls import path, include
from .views import VendorViewSet


router = routers.DefaultRouter()
router.register(r'', VendorViewSet)
urlpatterns = [


    path('', include(router.urls)),
]
