from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import GoogleBookListViewSet

router = SimpleRouter()
router.register(
    "external-books",
    GoogleBookListViewSet,
    basename="external-books"
)

urlpatterns = [
    path("", include(router.urls)),
]
