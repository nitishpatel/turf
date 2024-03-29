from django.db import migrations

from api.user.models import CustomUser


class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name="nitish", email="nitish@gmail.com",
                          is_staff=True, is_superuser=True, phone="9920812442")

        user.set_password("admin")
        user.save()

    dependencies = [
    ]
    operations = [
        migrations.RunPython(seed_data),
    ]
