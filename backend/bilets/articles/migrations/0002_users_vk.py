# Generated by Django 2.1.4 on 2019-03-23 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users_vk',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_vk', models.IntegerField()),
                ('Firstname', models.TextField()),
                ('Lastname', models.TextField()),
                ('points', models.IntegerField()),
                ('active_tasks', models.IntegerField()),
                ('close_tasks', models.IntegerField()),
                ('failed_tasks', models.IntegerField()),
            ],
        ),
    ]