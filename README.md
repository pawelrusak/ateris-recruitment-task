# Ateris recruitment task

## How to run

### start the application

1. Build docker images and make migrations

> [!IMPORTANT]  
> Project should have a SQLite in /backend/db.sqlite3

```bash
# in the project root directory
docker compose up --watch --build

# in the project root directory
docker compose run --rm backend sh -c "python manage.py makemigrations"

# in the project root directory
docker compose run --rm backend sh -c "python manage.py migrate"
```

### create more users

I created a management command to create a user via terminal (not superuser).

```bash
# in the project root directory

docker compose run --rm backend sh -c "python manage.py createuser"s
```
