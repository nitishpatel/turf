# Generated by Django 3.1 on 2020-08-15 16:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_client'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Client',
        ),
    ]