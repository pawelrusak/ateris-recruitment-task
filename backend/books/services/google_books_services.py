
from urllib.parse import urlencode
from typing import Final

import requests

from .google_books_types import (
    GoogleBooksVolumesResponse,
    GoogleBooksTransformedItem,
)

GOOGLE_BOOKS_BASE_URL: Final = "https://www.googleapis.com/books/v1/volumes"
GOOGLE_BOOKS_QUERY_PARAM: Final = "q"
GOOGLE_BOOKS_INAUTHOR_QUERY_PREFIX: Final = "inauthor:"


class BookFetchError(RuntimeError):
    pass


class QueryParamError(ValueError):
    pass


class GoogleBooksService:
    def fetch_books_by_author(self, author: str):
        """
        https://www.googleapis.com/books/v1/volumes?q=inauthor:<AUTHOR>
        e.g.
        https://www.googleapis.com/books/v1/volumes?q=inauthor:J.R.R.+Tolkien
        """
        author = (author or "").strip()

        if not author:
            raise QueryParamError("Author name must be provided")

        q_param = f"{GOOGLE_BOOKS_INAUTHOR_QUERY_PREFIX}{author}"

        query_params = {
            GOOGLE_BOOKS_QUERY_PARAM: q_param,
        }

        url = f"{GOOGLE_BOOKS_BASE_URL}?{urlencode(query_params)}"

        try:
            resp = requests.get(url, timeout=10.0)
            resp.raise_for_status()
            return resp.json()

        except requests.RequestException:
            raise BookFetchError("Failed to fetch books from external API")

    def transform_google_books_response(
        self,
        data: GoogleBooksVolumesResponse
    ) -> list[GoogleBooksTransformedItem]:

        return [
            {
                "id": item["id"],
                "title": item["volumeInfo"]["title"],
                "authors": item["volumeInfo"]["authors"],
            }
            for item in data["items"]
        ]
