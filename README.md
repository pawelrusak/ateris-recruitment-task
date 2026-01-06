# Ateris recruitment task

> [!WARNING]  
> This source code is not as good as what I usually write. That is why I added the [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) file to explain what I did and what I would improve.

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

2. We can login to app using two users accounts:

| login | password |
| ----: | -------- |
| user1 | user1    |
| user2 | user2    |

### create more users

I created a management command to create a user via terminal (not superuser).

```bash
# in the project root directory

docker compose run --rm backend sh -c "python manage.py createuser"s
```
