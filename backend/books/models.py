from django.db import models
from django.contrib.auth import get_user_model


class Author(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=512)
    authors = models.ManyToManyField(Author, related_name="books")
    google_volume_id = models.CharField(max_length=64)
    published_at = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="books"
    )

    class Meta:
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["owner", "google_volume_id"],
                name="unique_google_volume_id_per_owner",
            )
        ]

    def __str__(self):
        return self.title
