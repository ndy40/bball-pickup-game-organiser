FROM python:3.9

ENV PYTHONUNBUFFERED 1

RUN mkdir -p /opt/code && mkdir /opt/requirements
WORKDIR /opt/code

ADD requirements /opt/requirements
RUN pip install --no-cache-dir --upgrade -r /opt/requirements/requirements.txt

COPY backend /opt/code/backend
COPY wsgi.py /opt/code/wsgi.py

EXPOSE 8000

CMD ["uvicorn", "wsgi:app", "--reload", "--proxy-headers", "--host",  "0.0.0.0"]
