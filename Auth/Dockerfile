FROM python:3.11

RUN apt-get update

COPY requirements.txt .
RUN python3.11 -m pip install -r requirements.txt
COPY AuthProject/ /AuthProject/

COPY script.sh /bin/

RUN chmod +x /bin/script.sh
ENV PYTHONUNBUFFERED=1

RUN apt-get install dos2unix

RUN dos2unix /bin/script.sh

RUN pip install --upgrade pip

RUN pip install django-two-factor-auth[phonenumbers]
RUN pip install pyotp
RUN pip install shortuuid
# RUN pip install -U 'channels[daphne]'
# RUN chmod +x script.sh
ENTRYPOINT [ "script.sh" ]
# CMD ["sh", "-c", "while true; do echo 'Infinite loop'; sleep 1; done"]
