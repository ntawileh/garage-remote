FROM raspbian/stretch

WORKDIR /app

RUN apt-get update \
    && apt-get -y install python3 \
    python3-redis \
    python3-rpi.gpio

ADD ./src/ /app

# Run app.py when the container launches
CMD ["python3", "daemon.py"]
