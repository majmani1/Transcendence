#!/bin/bash

# Variables
URL="http://Auth:9080/health"  # Replace with the actual URL of the first service
TIMEOUT=120                              # Max time to wait in seconds
INTERVAL=6                              # Time between checks in seconds
START_TIME=$(date +%s)

while true; do
    # Send a request to the service
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

    # Check if the response is valid (e.g., HTTP 200)
    if [ "$HTTP_CODE" -eq 200 ]; then
        break
    fi

    # Check if timeout has been reached
    CURRENT_TIME=$(date +%s)
    ELAPSED_TIME=$((CURRENT_TIME - START_TIME))
    if [ "$ELAPSED_TIME" -ge "$TIMEOUT" ]; then
        echo "Timeout reached! Service did not become available."
        exit 1
    fi

    sleep $INTERVAL
done

cd second_game

python3.11 manage.py makemigrations
python3.11 manage.py migrate
# python3.11 manage.py collectstatic
python3.11 manage.py runserver 0.0.0.0:9070
# exec python manage.py runserver 0.0.0.0:8000