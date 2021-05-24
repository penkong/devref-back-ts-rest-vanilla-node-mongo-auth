# use docker image scanner.
# it is better PID in code
FROM node:15.13.0-alpine

RUN apk add --no-cache bash tini curl

ENV REDIS=http://127.0.0.1
ENV PORT=5002
ENV DBURL=mongodb://localhost:27017
ENV DBNAME=vanillanodemongo
ENV NODE_ENV=development
ENV MONGOPASS=secret
ENV MONGOUSER=root
ENV CORS=http://localhost:3000
ENV JWT_KEY=uy6hw65hywtrnbewhnterwhg
ENV JWT_TTL=365d
ENV RESET_TOKEN_EXP=300
ENV SENDGRID_USER=nazemi.works@gmail.com
ENV SENDGRID_PASS=https://signup.sendgrid.
ENV EMAIL_FROM=security@devref.ir
ENV SMTP_SERVER=fdsfsdfsdfsdfsdf



RUN mkdir -p /app
WORKDIR "/app"


COPY package*.json ./


RUN npm install -g mongodb
RUN chown -R node:node .
USER node
RUN npm config set unsafe-perm true

# we use npm ci here so only the package-lock.json file is used
RUN npm config list \
    && npm ci \
    && npm cache clean --force



COPY --chown=node:node . .

RUN cd /app/src
RUN npm link mongodb

EXPOSE 5002

# entrypoint frist run and wrap cmd
# tini run as main process and if we SIGINT or SIGTERM
# it will remove node process as zombie process .
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "run", "dev"]














