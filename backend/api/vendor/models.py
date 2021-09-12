from django.db import models
from api.user.models import CustomUser
import uuid
# Create your models here.


class Vendor(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200)
    typeOfEntity = models.CharField(max_length=200)
    vendorCIN = models.CharField(max_length=200, null=True)
    registrationAddress = models.CharField(max_length=2000, null=True)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=200)
    panNumber = models.CharField(max_length=200)
    gstin = models.CharField(max_length=200)
    ownerName = models.CharField(max_length=200)
    ownerEmail = models.EmailField(max_length=254)
    ownerPhone = models.CharField(max_length=200)
    isVerified = models.BooleanField(default=False, null=True, blank=True)

    class Meta:
        verbose_name = ("vendor")
        verbose_name_plural = ("vendors")

    def __str__(self):
        return self.name
