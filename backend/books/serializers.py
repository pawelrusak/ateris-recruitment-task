"""
Serializer for book APIs
"""
from rest_framework import serializers

from .models import Book, Author
from django.contrib.auth import get_user_model


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['name']
        extra_kwargs = {
            # disable UniqueValidator for nested writes
            "name": {"validators": []},
        }


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'login']


class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, required=False)
    owner = OwnerSerializer(read_only=True)

    class Meta:
        model = Book
        fields = [
            'id',
            'title',
            'authors',
            'owner',
            'google_volume_id',
            'published_at',
            'created_at',
        ]
        read_only_fields = ['id',  'owner', 'created_at']

    def _get_or_create_authors(self, authors: list[dict], book: Book):
        unique = set()

        for author in authors:
            name = (author.get("name") or "").strip()
            if not name:
                continue

            key = name.lower()
            if key in unique:
                continue
            unique.add(key)

            author_obj, _ = Author.objects.get_or_create(name=name)
            book.authors.add(author_obj)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['authors'] = list(instance.authors.values_list('name', flat=True))
        return data

    def create(self, validated_data):
        authors = validated_data.pop('authors', [])
        auth_user = self.context['request'].user

        google_volume_id = validated_data.get('google_volume_id')

        book = Book.objects.filter(
            owner=auth_user,
            google_volume_id=google_volume_id,
        ).first()
        if book:
            return book

        book = Book.objects.create(
            owner=auth_user,
            **validated_data,
        )
        self._get_or_create_authors(authors, book)

        return book
