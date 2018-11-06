# GraphQL with Prisma Boilerplate Project

This is a personal repo used to get started quickly with GraphQL and Prisma. Feel free to use this.

## Prerequisites

- Docker
- NodeJS

## Setting up local and test environment

Clone this project:

```shell
git clone <repo_url>
```

Open the project folder (or rename it beforehand)

```shell
cd graphql-prisma-boilerplate
```

Install NPM packages:

```shell
npm install
```

Launch docker by going into the Prisma directory and starting up Docker

```shell
cd prisma
docker-compose up -d
```

Adjust the env files' endpoint to:

```shell
# <project_root>/config/dev.env
http://localhost:4466/<project_name>/dev

# <project_root>/config/test.env
http://localhost:4466/<project_name>/test
```

Adjust .graphqlconfig file's endpoint to:

```shell
# <project_root>/.graphqlconfig
http://localhost:4466/<project_name>/dev
```

Deploy both environments:

```shell
cd <project_root>/prisma

prisma deploy -e ../config/dev.env
prisma deploy -e ../config/test.env
```

You can now run the local and test environments:

```shell
# Starts up Jest with unit tests
npm test

# Starts up local development environment with node server
npm run dev
```

## Setting up the production environment with Heroku

Adjust prod.env endpoint to match your prisma server:

```shell
# <project_root>/config/prod.env
PRISMA_ENDPOINT=<URL>/<project_name>/prod
```

Deploy Prisma to the production server:

```shell
cd <project_root>/prisma
prisma deploy -e ../config/prod.env
```

Create a Heroku project

```shell
cd <project_root>
heroku create
```

Set Heroku environment variables:

```shell
heroku config:set PRISMA_ENDPOINT=<URL>/<project_name>/prod
heroku config:set PRISMA_SECRET=<SECRET>
heroku config:set JWT_SECRET=<SECRET>
```

Deploy codebase to Heroku:

```shell
git push heroku master
```
