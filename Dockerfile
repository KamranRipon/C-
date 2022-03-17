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

# RUN apt-get update -y \
#     && apt-get upgrade -y \
#     && apt-get install curl -y \
#     && apt-get install docker-compose -y \
#     && apt-get install -y \
#     libgtk2.0-0 \
#     libgtk-3-0 \
#     libgbm-dev \
#     libnotify-dev \
#     libgconf-2-4 \
#     libnss3 \
#     libxss1 \
#     libasound2 \
#     libxtst6 \
#     xauth \
#     xvfb
# RUN apt-get install -y docker

# RUN curl -L https://github.com/docker/compose/releases/download/1.20.0-rc2/docker-compose-`uname -s`-`uname -m` -o ./docker-compose

#RUN npm start

RUN npm install

RUN npx browserslist@latest --update-db

#Führe tests aus
RUN sleep 30; 
RUN npm run CyTest