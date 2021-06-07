# Generated by Django 3.2.3 on 2021-06-07 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('beverages', '0009_alter_beverage_volume'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beverage',
            name='degree',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='Degree (%)'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True, verbose_name='Price'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='volume',
            field=models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Volume (mL)'),
        ),
        migrations.AlterField(
            model_name='beverage',
            name='year',
            field=models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Year'),
        ),
    ]
