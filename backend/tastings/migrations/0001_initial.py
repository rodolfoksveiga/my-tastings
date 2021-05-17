# Generated by Django 3.2.3 on 2021-05-17 11:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('producers', '0001_initial'),
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tasting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
                ('rating', models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10)], verbose_name='Rating')),
                ('color', models.CharField(choices=[('ruby', 'Pinot Noir - Ruby'), ('garnet', 'Tempranillo - Garnet'), ('violet', 'Shiraz - Violet/Deep Purple'), ('deep_ruby', 'Cabernet Sauvignon - Deep Ruby'), ('pale_yellow', 'Pinot Grigio - Pale Yellow'), ('pale_gold', 'Sauvignon Blanc - Pale Gold/Light Yellow'), ('gold', 'Chardonnay - Gold'), ('deep_gold', 'Semillon - Deep Gold'), ('pale_blush', 'Merlot - Pale Blush'), ('blush', 'Shiraz - Blush'), ('salmon', 'Tempranillo - Salmon'), ('deep_salmon', 'Petite Verdot - Deep Salmon')], max_length=100, verbose_name='Color')),
                ('appearance', models.CharField(max_length=100, verbose_name='Appearance')),
                ('aroma', models.CharField(max_length=100, verbose_name='Aroma')),
                ('finish', models.CharField(max_length=100, verbose_name='Finish')),
                ('price', models.DecimalField(decimal_places=2, max_digits=6, verbose_name='Price')),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='categories.category')),
                ('producer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='producers.producer')),
            ],
        ),
    ]
