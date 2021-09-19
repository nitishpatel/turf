from django.db import models

# Create your models here.
from api.turf.models import Turf
from api.vendor.models import Vendor
from api.user.models import CustomUser
import uuid
from django.contrib.auth import get_user_model
UserModel = get_user_model()
STATUS_CHOICES = (
    ('APPROVED_BY_VENDOR', 'APPROVED_BY_VENDOR'),
    ("REQUESTED", "REQUESTED"),
    ("IN_PROGRESS", "IN_PROGRESS"),
    ("CONFIRMED", "CONFIRMED"),
    ("CANCELLED_BY_USER", "CANCELLED_BY_USER"),
    ("CANCELLED_BY_VENDOR", "CANCELLED_BY_VENDOR"),
)
PAYMENT_CHOICES = (
    ('CASH', 'CASH'),
    ('CREDIT_CARD', 'CREDIT_CARD'),
    ('PAYPAL', 'PAYPAL'),
    ('OTHER', 'OTHER'),
    ('NOT_SPECIFIED', 'NOT_SPECIFIED'),
    ('UPI', 'UPI'),
    ('DEBIT_CARD', 'DEBIT_CARD'),
)


class Booking(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    turf = models.ForeignKey(Turf, on_delete=models.CASCADE)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    status = models.CharField(
        max_length=100, choices=STATUS_CHOICES, default='REQUESTED')
    payment_method = models.CharField(
        max_length=100, choices=PAYMENT_CHOICES, default='NOT_SPECIFIED')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.turf.name + ' - ' + self.user.first_name + ' ' + self.user.last_name
