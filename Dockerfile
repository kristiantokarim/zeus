FROM node:8.11.4

ADD . /zeus
WORKDIR /zeus
COPY .env.prod .env
RUN yarn
EXPOSE 80
CMD ["yarn", "run", "prod"]
