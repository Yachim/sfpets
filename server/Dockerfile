FROM python:3.10-bullseye

RUN pip install "poetry==1.2.2"

WORKDIR /pets_backend
COPY poetry.lock pyproject.toml ./

RUN poetry config virtualenvs.create false \
	&& poetry install --no-dev --no-interaction --no-ansi

COPY . .

EXPOSE 8000

ENV DOCKER=1
RUN chmod +x ./entrypoint_docker.sh
