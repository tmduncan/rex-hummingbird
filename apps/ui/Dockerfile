
FROM node:8.2.1

RUN mkdir -p /usr/src/rex-hummingbird/ui


COPY . /usr/src/rex-hummingbird/ui

WORKDIR /usr/src/rex-hummingbird/ui

RUN yarn

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
 
