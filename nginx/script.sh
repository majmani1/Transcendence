#!/bin/bash

# openssl genrsa -out $path_private_root_key 2048
# openssl req -x509 -new -nodes -key $path_private_root_key -sha256 -days 1024 \
#   -out $path_root_certificate -subj "/C=MA/ST=KECH/L=BENGUERIR/O=1337/OU=OrgUnit/CN=MyRootCA"
# openssl genrsa -out $path_private_certificate 2048
# openssl req -new -key $path_private_certificate -out $Certificate_Signing_Request \
#   -subj "/C=MA/ST=KECH/L=BENGUERIR/O=1337/OU=OrgUnit/CN=localhost"
# openssl x509 -req -in $Certificate_Signing_Request -CA $path_root_certificate -CAkey $path_private_root_key \
#   -CAcreateserial -out $path_certificate -days 500 -sha256
# cp $path_root_certificate $system_certificates
# update-ca-certificates

mkcert -cert-file $path_certificate \
       -key-file $path_private_key \
       localhost 127.0.0.1 ::1

sed -i 's|${path_certificate}|'"$path_certificate"'|g; s|${path_private_certificate}|'"$path_private_key"'|g' /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'

# while true; do
#     sleep 1
# done