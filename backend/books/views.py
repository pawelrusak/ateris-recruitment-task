from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Book
from .services.google_books_services import GoogleBooksService
from .serializers import BookSerializer


class ExternalBookListViewSet(viewsets.ViewSet):
    google_books_service = GoogleBooksService()

    def list(self, request: Request) -> Response:
        """
        Endpoint:
        GET /api/external-books/?author=<author_name>
        """
        author: str = request.query_params.get("author", "")

        if not author:
            message = {"error": "Author query parameter is required."}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        data = self.google_books_service.fetch_books_by_author(author)
        books = self.google_books_service.transform_google_books_response(data)

        return Response({"books": books})


class BookListCreatedViewSet(viewsets.ViewSet):
    google_books_service = GoogleBooksService()

    def create(self, request: Request) -> Response:
        """
        Endpoint:
        GET /api/books/
        Body parameters:
        - google_volume_id: str (required)
        """
        google_volume_id: str = request.data.get("google_volume_id", "")

        if not google_volume_id:
            message = {"error": "google_volume_id field is required."}
            return Response(
                message,
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        data = self.google_books_service.fetch_book_item_by_id(google_volume_id)  # noqa
        book_detail = self.google_books_service.transform_google_book_detail_response(data)  # noqa

        serializer = BookSerializer(
            data=book_detail,
            context={"request": request}
        )

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            data = serializer.data
            return Response(data, status=status.HTTP_201_CREATED)

        return Response(
            {"error": "Invalid data"},
            status=status.HTTP_400_BAD_REQUEST
        )

    def list(self, request: Request) -> Response:
        """
        Endpoint:
        GET /api/books/
        """
        query_owner = request.query_params.get("owner", None)

        owner = query_owner if query_owner is not None else request.user

        books = Book.objects.filter(owner=owner)

        serializer = BookSerializer(books, many=True)

        return Response(serializer.data)
