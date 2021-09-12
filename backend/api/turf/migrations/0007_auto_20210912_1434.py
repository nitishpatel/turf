# Generated by Django 3.1.1 on 2021-09-12 09:04

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('turf', '0006_auto_20210803_2107'),
    ]

    operations = [
        migrations.AlterField(
            model_name='turf',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='turfphoto',
            name='turfId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='turf_image', to='turf.turf'),
        ),
    ]
