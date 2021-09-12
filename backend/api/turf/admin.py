from django.contrib import admin

# Register your models here.
from .models import Turf, TurfPhoto
admin.site.register(Turf)
admin.site.register(TurfPhoto)
