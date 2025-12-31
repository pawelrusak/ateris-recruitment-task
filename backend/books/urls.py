from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import (
    ExternalBookListViewSet,
    BookListCreatedViewSet,
    VoteViewSet
)

router = SimpleRouter()
router.register(
    "external-books",
    ExternalBookListViewSet,
    basename="external-books"
)

router.register(
    "books",
    BookListCreatedViewSet,
    basename="books"
)

router.register(
    "votes",
    VoteViewSet,
    basename="votes"
)


urlpatterns = [
    path("", include(router.urls)),
]
