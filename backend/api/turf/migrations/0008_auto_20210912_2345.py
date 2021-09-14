# Generated by Django 3.1.1 on 2021-09-12 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('turf', '0007_auto_20210912_1434'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='turfphoto',
            options={},
        ),
        migrations.AddField(
            model_name='turf',
            name='price',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=6),
            preserve_default=False,
        ),
    ]
