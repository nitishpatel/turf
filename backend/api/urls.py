from django.urls import path, include
from rest_framework.authtoken import views

from api.turf.views import GroundViewSet, TurfPhotoViewSet
from rest_framework import routers

ground = routers.DefaultRouter()

ground.register(r'', GroundViewSet)


turfphoto = routers.DefaultRouter()

turfphoto.register(r'', TurfPhotoViewSet)


urlpatterns = [
    path('user/', include('api.user.urls')),
    path('vendor/', include('api.vendor.urls')),
    path('turf/', include('api.turf.urls')),
    path('ground/', include(ground.urls)),
    path('turfphoto/', include(turfphoto.urls)),
    path('api-token-auth/', views.obtain_auth_token),

]
