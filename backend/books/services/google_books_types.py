from typing import TypedDict


class GoogleBooksVolumeInfo(TypedDict):
    title: str
    authors: list[str]


class GoogleBooksVolumeItem(TypedDict):
    id: str
    volumeInfo: GoogleBooksVolumeInfo


class GoogleBooksVolumesResponse(TypedDict):
    items: list[GoogleBooksVolumeItem]


class GoogleBooksTransformedItem(TypedDict):
    id: str
    title: str
    authors: list[str]
