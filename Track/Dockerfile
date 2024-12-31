FROM python:3.11

COPY requirements.txt .
RUN python3.11 -m pip install -r requirements.txt
COPY track/ /track/

COPY script.sh .
ENV PYTHONUNBUFFERED=1

RUN chmod +x script.sh
CMD [ "./script.sh" ]