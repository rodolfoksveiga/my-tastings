# Generated by Django 3.2.3 on 2021-06-07 14:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('beverages', '0007_auto_20210607_1404'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tastings', '0003_tasting_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasting',
            name='appearance',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Appearance'),
        ),
        migrations.AlterField(
            model_name='tasting',
            name='aroma',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Aroma'),
        ),
        migrations.AlterField(
            model_name='tasting',
            name='beverage',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='beverages.beverage'),
        ),
        migrations.AlterField(
            model_name='tasting',
            name='color',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Color'),
        ),
        migrations.AlterField(
            model_name='tasting',
            name='finish',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Finish'),
        ),
        migrations.AlterField(
            model_name='tasting',
            name='name',
            field=models.CharField(max_length=200, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='tasting',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tastings', to=settings.AUTH_USER_MODEL),
        ),
    ]
