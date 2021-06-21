# Generated by Django 3.2.3 on 2021-06-07 14:04

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0003_alter_category_name'),
        ('producers', '0005_auto_20210607_1404'),
        ('beverages', '0006_remove_beverage_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beverage',
            name='base',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Base'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='beverages', to='categories.category'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='classification',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Classification'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='degree',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='Degree (%)'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='name',
            field=models.CharField(max_length=200, unique=True, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100000)], verbose_name='Price'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='producer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='beverages', to='producers.producer'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='volume',
            field=models.PositiveSmallIntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(100), django.core.validators.MaxValueValidator(10000)], verbose_name='Volume (mL)'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='year',
            field=models.DateField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(2021)], verbose_name='Year'),
        ),
    ]