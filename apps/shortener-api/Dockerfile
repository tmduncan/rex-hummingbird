FROM node:8.2.1

ENV NODE_PATH /usr/src/lib/node_modules/
ENV PATH ${NODE_PATH}/.bin:${PATH}
RUN mkdir -p {/usr/src/rex-hummingbird/shortener-api,/usr/src/lib/}
WORKDIR /usr/src/rex-hummingbird/shortener-api

COPY . .
COPY ./package.json /usr/src/lib/
COPY ./yarn.lock /usr/src/lib/

RUN cd /usr/src/lib/ && yarn


EXPOSE 5000

CMD ["npm", "run", "start"]
