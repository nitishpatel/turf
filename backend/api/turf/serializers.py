from rest_framework import serializers


from .models import Turf, Ground, TurfPhoto


class GroundSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ground
        fields = ('turfId',
                  'size',
                  )


class TurfImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = TurfPhoto
        fields = ('id', 'turfId',
                  'image',
                  )


class TurfSerializer(serializers.ModelSerializer):

    class Meta:
        model = Turf
        fields = (
            'vendorId',

            'name',
            'location',
            'rules',
            'price',
            'description',
            'amenities',
            'city',
            'slug', 'featured', 'active')


class TurfListSerializer(serializers.ModelSerializer):
    turf_ground = GroundSerializer(
        read_only=True, many=True, )
    turf_image = TurfImageSerializer(
        read_only=True, many=True, )

    class Meta:
        model = Turf
        fields = ['id',
                  'turf_ground',
                  'turf_image',
                  'vendorId',
                  'name',
                  'price',
                  'location',
                  'rules',
                  'description',
                  'amenities',
                  'city',
                  'slug', 'featured', 'active', ]
