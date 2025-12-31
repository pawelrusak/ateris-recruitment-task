from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response
from .services.google_books_services import GoogleBooksService

# Create your views here.


class GoogleBookListViewSet(viewsets.ViewSet):
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
