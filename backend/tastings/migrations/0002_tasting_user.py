# Generated by Django 3.2.3 on 2021-05-24 15:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tastings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tasting',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tastings', to=settings.AUTH_USER_MODEL),
        ),
    ]
