FROM kyma/docker-nginx
COPY dist/spa/ /var/www/

EXPOSE 80 443
CMD 'nginx'
