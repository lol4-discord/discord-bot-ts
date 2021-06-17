FROM node:12

WORKDIR /usr/app

COPY package*.json ./
RUN yarn

ENV TZ=Asia/Tokyo

COPY . .
RUN yarn compile

CMD ["yarn", "start"]
