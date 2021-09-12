from django.db import models
from api.vendor.models import Vendor
# Create your models here.

import os
from uuid import uuid4
from django.urls import reverse
# Create your models here.

from autoslug import AutoSlugField


def path_and_rename(instance, filename):
    upload_to = 'turfphoto'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)


class Turf(models.Model):
    vendorId = models.ForeignKey(Vendor, verbose_name=(
        "Vendor"), on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=2000)
    rules = models.CharField(max_length=5000)
    description = models.CharField(max_length=5000)
    amenities = models.CharField(max_length=5000)
    city = models.CharField(max_length=200)
    featured = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    slug = AutoSlugField(populate_from='name', unique=True)

    class Meta:
        verbose_name = ("turf")
        verbose_name_plural = ("turfs")
        unique_together = ('name', 'slug')

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("turf_detail", kwargs={"pk": self.pk})


class Ground(models.Model):
    turfId = models.ForeignKey(
        Turf, related_name='turf_ground', on_delete=models.CASCADE)
    size = models.CharField(max_length=50)

    class Meta:
        verbose_name = ("ground")
        verbose_name_plural = ("grounds")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("ground_detail", kwargs={"pk": self.pk})


class TurfPhoto(models.Model):
    turfId = models.ForeignKey(
        Turf, related_name="turf_image", on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to=path_and_rename, max_length=255, null=True, blank=True)

    class Meta:
        verbose_name = ("ground")
        verbose_name_plural = ("grounds")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("ground_detail", kwargs={"pk": self.pk})
