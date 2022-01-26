FROM python:3.9

ENV PYTHONUNBUFFERED 1

RUN mkdir -p /opt/code && mkdir /opt/requirements
WORKDIR /opt/code

ADD requirements /opt/requirements
RUN pip install --no-cache-dir --upgrade -r /opt/requirements/requirements.txt

COPY backend /opt/code/backend
COPY wsgi.py /opt/code/wsgi.py
COPY cli.py /opt/code/cli.py

EXPOSE 8080

CMD ["uvicorn", "wsgi:app", "--reload", "--proxy-headers", "--host",  "0.0.0.0", "--port", "8080"]
