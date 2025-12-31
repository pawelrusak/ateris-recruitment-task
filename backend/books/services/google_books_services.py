
from urllib.parse import urlencode
from typing import Final

import requests

from .google_books_types import (
    GoogleBooksVolumesResponse,
    GoogleBooksTransformedItem,
    GoogleBooksVolumeItem,
)

GOOGLE_BOOKS_BASE_URL: Final = "https://www.googleapis.com/books/v1/volumes"
GOOGLE_BOOKS_QUERY_PARAM: Final = "q"
GOOGLE_BOOKS_INAUTHOR_QUERY_PREFIX: Final = "inauthor:"


class BookFetchError(RuntimeError):
    pass


class QueryStringError(ValueError):
    pass


class UrlParamError(ValueError):
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
            raise QueryStringError("Author name must be provided")

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

    def fetch_book_item_by_id(self, google_volume_id: str):
        if not google_volume_id:
            raise UrlParamError("google_volume_id must be provided")

        url = f"{GOOGLE_BOOKS_BASE_URL}/{google_volume_id}"

        try:
            resp = requests.get(url, timeout=10.0)
            resp.raise_for_status()
            return resp.json()

        except requests.RequestException:
            raise BookFetchError("Failed to fetch book item from external API")

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

    def transform_google_book_detail_response(
            self,
            data: GoogleBooksVolumeItem
    ):

        volume_info = data.get("volumeInfo", {})

        authors = volume_info.get("authors", [])  # <-- remove comma

        authors_list = [{"name": a.strip()}
                        for a in authors if a and a.strip()]

        payload = {
            "title": volume_info.get("title", ""),
            "authors": authors_list,
            "google_volume_id": data.get("id", ""),
            "published_at": volume_info.get("publishedDate", None),
        }
        return payload
