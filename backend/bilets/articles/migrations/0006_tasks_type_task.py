# Generated by Django 2.1.4 on 2019-03-23 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0005_auto_20190323_1249'),
    ]

    operations = [
        migrations.AddField(
            model_name='tasks',
            name='type_task',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]