from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Book
from .services.google_books_services import GoogleBooksService
from .serializers import BookSerializer

User = get_user_model()


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
        query_owner = (request.query_params.get("owner") or "").strip()

        if query_owner:

            try:
                user = User.objects.get(login=query_owner)
            except User.DoesNotExist:
                return Response(
                    {"error": "Books of owner not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            books = Book.objects.filter(owner=user)
        else:
            books = Book.objects.filter(owner=request.user)

        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def retrieve(self, request: Request, pk: str) -> Response:
        """
        Endpoint:
        GET /api/books/{pk}/?owner=<owner_login>
        """
        owner_login = (request.query_params.get("owner") or "").strip()
        if not owner_login:
            return Response(
                {"error": "Query param 'owner' is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            book = Book.objects.get(pk=pk, owner__login=owner_login)

        except Book.DoesNotExist:
            return Response(
                {"error": "Book not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)
