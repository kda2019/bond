FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

WORKDIR /var/www

COPY bond ./bond/
COPY canberra ./canberra/

