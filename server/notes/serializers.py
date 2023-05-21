from rest_framework import serializers
from .models import Note, NotesEditHistory, ActiveEditableNotes


class NotesEditHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NotesEditHistory
        fields = "__all__"
        extra_kwargs = {"created_by": {"read_only": True}}


class ActiveEditableNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveEditableNotes
        fields = "__all__"


class NoteSerializer(serializers.ModelSerializer):
    editHistory = NotesEditHistorySerializer(many=True, required=False)
    active_editable_notes = ActiveEditableNotesSerializer(many=True, required=False)

    class Meta:
        model = Note
        fields = "__all__"
