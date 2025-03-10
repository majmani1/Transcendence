# Generated by Django 3.2.12 on 2024-12-31 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Historique_game',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('id_Player1', models.CharField(max_length=100)),
                ('id_Player2', models.CharField(max_length=100)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('score_player1', models.CharField(max_length=100)),
                ('score_player2', models.CharField(max_length=100)),
                ('id_Winner', models.CharField(max_length=100)),
                ('typeGame', models.CharField(max_length=100)),
                ('username1', models.CharField(max_length=100)),
                ('username2', models.CharField(max_length=100)),
                ('pictureUser1', models.CharField(default='default_value', max_length=100)),
                ('pictureUser2', models.CharField(default='default_value', max_length=100)),
            ],
        ),
    ]
