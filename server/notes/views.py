from .serializers import NoteSerializer
from rest_framework import generics, status
from rest_framework.response import Response

from .serializers import Note, NoteSerializer
from .services import Services


class NotesList(generics.ListCreateAPIView):
    queryset = Note.objects.all()

    def get_queryset(self):
        return Note.objects.filter(is_deleted=False).order_by("-id").all()

    serializer_class = NoteSerializer

    def post(self, request, *args, **kwargs):
        request.data["created_by"] = f"{Services().uniq_user_identifier(request.META)}"
        return super().post(request, *args, **kwargs)


class NotesCount(generics.RetrieveAPIView):
    def get(self, request):
        count = Note.objects.filter(is_deleted=False).values("id").count()
        return Response(dict(count=count), status=status.HTTP_200_OK)


class EditNote(generics.UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def put(self, request, pk, *args, **kwargs):
        note = Note.objects.filter(pk=pk).get()
        if note:
            request.data["file_name"] = note.file_name
        request.data["created_by"] = f"{Services().uniq_user_identifier(request.META)}"
        return super().put(request, *args, **kwargs)


class ViewNote(generics.RetrieveDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def destroy(self, request, pk, *args, **kwargs):
        note = Note.objects.filter(pk=pk).get()
        note.is_deleted = True
        note.save()
        return Response(dict(status=True), status=status.HTTP_202_ACCEPTED)
