FROM nginx

RUN apt-get update && \
    apt-get install -y libnss3-tools dos2unix

RUN mkdir -p /etc/nginx/ssl
COPY  config.conf /etc/nginx/conf.d/default.conf
COPY proxy_params /etc/nginx/proxy_params
RUN  mkdir -p /var/www/ft_trendenden/chat
RUN  mkdir -p /var/www/ft_trendenden/AuthProject
RUN  mkdir -p /var/www/ft_trendenden/front
COPY ./mkcert ./mkcert
RUN mv mkcert /usr/local/bin/
RUN chmod +x /usr/local/bin/mkcert
RUN mkcert -install

COPY ./script.sh /script.sh
RUN chmod 777 script.sh
RUN dos2unix script.sh
# COPY script.js /var/www/ft_trendenden/chat
# COPY style.css /var/www/ft_trendenden/chat
# COPY image/ /var/www/ft_trendenden/chat/image

CMD ["./script.sh"]