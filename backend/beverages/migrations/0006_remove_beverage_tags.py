# Generated by Django 3.2.3 on 2021-06-04 16:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('beverages', '0005_beverage_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='beverage',
            name='tags',
        ),
    ]