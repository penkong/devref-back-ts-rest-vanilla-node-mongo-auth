# FROM node:15.13.0-alpine

# ENV REDIS=http://127.0.0.1
# ENV PORT=5002
# ENV DBURL=mongodb://localhost:27017
# ENV DBNAME=vanillanodemongo
# ENV NODE_ENV=development
# ENV MONGOPASS=root
# ENV MONGOUSER=secret
# ENV CORS=http://localhost:3000
# ENV JWT_KEY=uy6hw65hywtrnbewhnterwhg
# ENV JWT_TTL=365d


# RUN mkdir -p /app
# WORKDIR "/app"


# COPY package*.json ./



# RUN npm config set unsafe-perm true
# # we use npm ci here so only the package-lock.json file is used
# RUN npm config list \
#     && npm ci \
#     && npm cache clean --force





# COPY . .
# EXPOSE 5002

# CMD ["node", "./dist/index.js"]






FROM node:15.13.0-alpine as base

RUN mkdir -p /app
WORKDIR "/app"



# docker build -t sl:prod --target prod .
# use target to hit specific stage
FROM base as prod


FROM base as dev
CMD ["npm", "run", "dev"]

# for ci infra before building prod
FROM base as test
CMD ["npm", "run", "test"]


# 12 factor for distributed cloud app
# 12factor.net
# use env var for config
# log to stdout / stderr
# pin all versions , even npm
# graceful exit sigterm/init
# dockerignore
# 12factor.net/config, logs
# use winston, bunyan, morgan