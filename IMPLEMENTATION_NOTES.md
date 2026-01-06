# Implementation Notes

I made mistakes when estimating the time required to complete this project.
What’s worse, I had technical problems with both software and hardware, as well as some health issues.
I was in a hurry to finish the project on time, so the final result is not as good as my usual standard.

## Main project decisions

The most important decision I made during the implementation of this project was the relationship between the `User` and `Book` models.
I decided to use a `one-to-many` relationship because I interpreted the requirements as: one user can have multiple books (and is the only owner). However, we could also use a `many-to-many` relationship to create a list of all added books, where many users can mark that they added a book to their list. **It would be better if I had full context about the project idea/goals to make better decisions.**

## My Project Goals

I want to start with an overview of the completed/partially completed goals for this project:

### 1. Used Docker to create an isolated environment with Docker Compose.

- When I built the images and installed the required dependencies, I tried to use specific versions of software to avoid compatibility issues.
- I tried to use LTS versions of Django to ensure stability and security for a long time.

### 2. Hid sensitive settings by using environment variables.

I used a `.env` file to store `SECRET_KEY` in `backend/.env`. I did not commit this file to the repository (see `backend/.gitignore`). I am aware that I still keep `SECRET_KEY` in `backend/.env.example`, but this is only for demonstration purposes. In a real project, this kind of file should never be committed, and we should use a secret manager to store sensitive data.

### 3. Used `JWT` authentication instead of the default Django REST Framework token authentication.

I used `djangorestframework-simplejwt`. If it is implemented correctly, it should be more secure than the default token authentication (`rest_framework.authtoken.views.ObtainAuthToken`).

## Known Issues and Improvements

### Backend

#### 1. Protect the database

We can use a `PostgreSQL` database with Docker and ensure the database password is stored in an environment variable.

#### 2. Follow Test Driven Development (TDD) principles

I didn't create tests for this project because of time constraints. However, in a real project it is good practice to create tests for the backend. I prefer to create behavior tests and integration tests to avoid testing implementation details (I agree with [Kent C. Dodds](https://kentcdodds.com/blog/testing-implementation-details) about this approach).

#### 3. Improve data models

In `Book`, I used a `CharField` for the `published_at` field instead of a `DateField` because I had to make a quick fix.
Normalizing dates before saving (for example, using `datetime.strptime`) should solve the issue.

#### 4. Use helper functions to reduce boilerplate

I can use helpers like `get_object_or_404` or `get_list_or_404` to reduce boilerplate code in views.

#### 5. Improve endpoint structure for votes

Right now, voting has 2 endpoints:

- POST `http://localhost:8000/api/votes/:book_id/toggle/`
- GET `http://localhost:8000/api/votes/:book_id/`

In a RESTful API, it would be better to use:

- POST or PUT `http://localhost:8000/api/books/:book_id/votes/`
- GET `http://localhost:8000/api/books/:book_id/votes/`

#### 6. Protect resources from unauthorized changes

I should add permissions for unsafe methods like update and delete in views.

#### 7. Use code linters, formatters, and type checkers

I should use linters and formatters like `ruff` with strict rules to ensure code quality and consistency.
It is also good practice to use `django-stubs` and `djangorestframework-stubs` to add type hints to the Django and DRF codebase.

#### 8. Implement book deletion

I didn't implement the book deletion feature because I forgot it.

#### 9. Optimize database queries

I should use `django-debug-toolbar`. Then I can use `select_related` and `prefetch_related` to optimize queries.

#### 10. Use transactions

I can use [database transactions](https://docs.djangoproject.com/en/6.0/topics/db/transactions/#django.db.transaction.atomic)

### Frontend

#### 1. Improve UI/UX

I created a very basic HTML structure without any CSS styling. This has a negative impact on usability and conversion rates. I even installed Material UI, but I did not have enough time to use it.

#### 2. Implement proper error handling

Currently, the frontend does not handle errors properly. I should improve this.

#### 3. Change directory structure

I should restructure the frontend directory by separating components by `feature`, like in the [Redux tutorial](https://redux.js.org/tutorials/essentials/part-2-app-structure#application-contents). This will improve maintainability and scalability.

#### 4. Use constants

I can use constants for API endpoint paths to avoid hardcoding URLs and text strings in multiple places.

#### 5. Improve ESLint configuration

I should use a stricter ESLint configuration.

#### 6. Implement tests

I didn't implement frontend tests because of time constraints. If I do this, I will use React Testing Library with [MSW](https://mswjs.io/) to mock API requests.
