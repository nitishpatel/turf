# Generated by Django 3.1.1 on 2021-06-20 08:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turf', '0004_auto_20210620_1415'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='turf',
            name='turf_ground',
        ),
    ]
