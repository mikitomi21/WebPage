FROM python:3.10-slim
MAINTAINER Tim Schopinski

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

COPY ./backend/dependencies /dependencies

RUN pip3 install -r dependencies/requirements.txt

COPY ./backend /app/backend
RUN adduser django
RUN chown -R django /app

COPY ./gunicorn.sh /gunicorn.sh

RUN chmod +x /gunicorn.sh

WORKDIR /app

ENTRYPOINT ["/gunicorn.sh"]
