FROM alpine/git as git
ARG token
WORKDIR /repo
ADD https://api.github.com/repos/tronxi/framework-educativo-front/git/refs/heads/develop version.json
RUN git clone https://github.com/tronxi/framework-educativo-front.git
RUN cd framework-educativo-front && git checkout develop

FROM node:13.5.0-alpine3.11 as builder
ARG environment=dev
COPY --from="git" /repo/framework-educativo-front /front
WORKDIR /front
RUN npm install -y
RUN npm install -g @angular/cli -y
RUN ng build --configuration= ${environment} --base-href /

FROM nginx:1.17.6-alpine
RUN rm -r /usr/share/nginx/html/
COPY --from="builder" /front/dist/framework-educativo-front/ /usr/share/nginx/html/
