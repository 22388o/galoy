FROM node:14-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

RUN apk update && apk add git

COPY ./package.json ./tsconfig.json ./yarn.lock ./

RUN yarn install --frozen-lockfile

FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

COPY ./src/ ./*.js ./default.yaml ./package.json ./tsconfig.json ./yarn.lock ./.env ./

CMD sleep infinity