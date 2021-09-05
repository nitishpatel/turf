from rest_framework import routers
from django.urls import path, include


from .views import signin,signout,UserViewSet

router = routers.DefaultRouter()
router.register(r'',UserViewSet)
urlpatterns = [
    path('login/', signin,name='signin'),
    path('logout/<int:id>', signout,name='signout'),

    path('', include(router.urls)),
]
