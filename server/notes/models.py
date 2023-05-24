from datetime import datetime

from django.db import models
from django.utils.timezone import now


class Note(models.Model):
    created_by = models.CharField(max_length=100)
    current_owner = models.CharField(max_length=100, default=created_by)

    file_name = models.CharField(max_length=160, db_index=True, unique=True)
    text = models.CharField(max_length=160, default="")
    content = models.TextField(default="")

    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(null=True, blank=True)

    is_deleted = models.BooleanField(default=False, db_index=True)

    def __str__(self) -> str:
        return f"{self.text}\n{self.content}"


class NotesEditHistory(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="history")
    current_owner = models.CharField(max_length=100, default=0)

    text = models.CharField(max_length=160, default="")
    content = models.TextField(default="")

    created_at = models.DateTimeField(default=now, editable=False)


class ActiveEditableNotes(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="target_note")
    created_by = models.CharField(max_length=100)

    text = models.CharField(max_length=160, default="")
    content = models.TextField(default="")

    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(null=True, blank=True)
