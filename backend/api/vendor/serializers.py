from rest_framework import serializers


from .models import Vendor

from api.user.serializers import UserSerializer


class VendorSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)

    class Meta:
        model = Vendor
        # depth = 1
        fields = ('id', 'user', 'name',
                  'typeOfEntity',
                  'vendorCIN',
                  'registrationAddress',
                  'email',
                  'phone',
                  'panNumber',
                  'gstin',
                  'ownerName',
                  'ownerEmail',
                  'ownerPhone', 'isVerified')


class VendorListSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Vendor
        depth = 1
        fields = ('id', 'user', 'name',
                  'typeOfEntity',
                  'vendorCIN',
                  'registrationAddress',
                  'email',
                  'phone',
                  'panNumber',
                  'gstin',
                  'ownerName',
                  'ownerEmail',
                  'ownerPhone', 'isVerified')
