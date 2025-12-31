from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import ExternalBookListViewSet, BookListCreatedViewSet

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


urlpatterns = [
    path("", include(router.urls)),
]
