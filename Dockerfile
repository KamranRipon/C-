#FROM docker.artifactory-extern.dataport.de/cypress/base:10.18.0
FROM cypress/included:3.4.1

# ENV HTTP_PROXY="http://wall.lit.hamburg.de:80/"
# ENV HTTPS_PROXY="http://wall.lit.hamburg.de:80/"

# ENV http_proxy="http://wall.lit.hamburg.de:80/"
# ENV https_proxy="http://wall.lit.hamburg.de:80/"

ENV HTTP_PROXY="http://10.61.16.6:3128"
ENV HTTPS_PROXY="http://10.61.16.6:3128"
ENV NO_PROXY="git.dataport.de,sonarqube.dataport.de,127.0.0.1,minio.gitlab-runner-minio.svc.cluster.local,al.s3.dataport.de,docker:2375,docker:2376,artifactory-extern.dataport.de,localhost:80"

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install

RUN npx browserslist@latest --update-db

#RUN sleep 20

#Führe tests aus
ENTRYPOINT RUN sleep 20; npm run cySpec

RUN npm run cySpec