from django.urls import path, re_path
from .views import NotesList, EditNote, ViewNote, NotesCount

urlpatterns = [
    path("<int:pk>/view", ViewNote.as_view(), name="view-note"),
    path("<int:pk>", ViewNote.as_view(), name="view-delete-note"),
    path("<int:pk>/edit", EditNote.as_view(), name="edit-note"),
    path("count", NotesCount.as_view(), name="notes-count"),
    path("", NotesList.as_view(), name="list"),
]
