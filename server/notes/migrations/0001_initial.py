# Generated by Django 4.2.1 on 2023-05-20 17:36

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Note",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_by", models.CharField(max_length=100)),
                (
                    "current_owner",
                    models.CharField(
                        default=models.CharField(max_length=100), max_length=100
                    ),
                ),
                ("text", models.CharField(default="", max_length=160)),
                ("content", models.TextField(default="")),
                (
                    "created_at",
                    models.DateTimeField(
                        default=django.utils.timezone.now, editable=False
                    ),
                ),
                ("updated_at", models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="NotesEditHistory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("current_owner", models.CharField(default=0, max_length=100)),
                ("text", models.CharField(default="", max_length=160)),
                ("content", models.TextField(default="")),
                (
                    "created_at",
                    models.DateTimeField(
                        default=django.utils.timezone.now, editable=False
                    ),
                ),
                (
                    "note",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="note",
                        to="notes.note",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ActiveEditableNotes",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_by", models.CharField(max_length=100)),
                ("text", models.CharField(default="", max_length=160)),
                ("content", models.TextField(default="")),
                (
                    "created_at",
                    models.DateTimeField(
                        default=django.utils.timezone.now, editable=False
                    ),
                ),
                ("updated_at", models.DateTimeField(blank=True, null=True)),
                (
                    "note",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="target_note",
                        to="notes.note",
                    ),
                ),
            ],
        ),
    ]