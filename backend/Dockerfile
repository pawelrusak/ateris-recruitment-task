FROM python:3.14.2-alpine3.23

ENV PYTHONUNBUFFERED=1

RUN python -m venv /opt/venv \
    && /opt/venv/bin/python -m pip install --upgrade pip

ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app/backend

COPY requirements.txt /app/backend/
RUN pip install -r requirements.txt

COPY . /app/backend/

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
