# Generated by Django 2.1.4 on 2019-03-23 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_tasks_task_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='users_vk',
            name='concerts',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='users_vk',
            name='wasted',
            field=models.TextField(default=0),
            preserve_default=False,
        ),
    ]
