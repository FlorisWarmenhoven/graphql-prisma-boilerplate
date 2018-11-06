# GraphQL with Prisma Boilerplate Project

---

This is a personal repo used to get started quickly with GraphQL and Prisma. Feel free to use this.

## Prerequisites

---

- Docker
- NodeJS

## Setting up local and test environment

---

Clone this project:

```
git clone <repo_url>
```

Open the project folder (or rename it beforehand)

```
cd graphql-prisma-boilerplate
```

Install NPM packages:

```
npm install
```

Launch docker by going into the Prisma directory and starting up Docker

```
cd prisma
docker-compose up -d
```

Adjust the env files' endpoint to:

```
// <project_root>/config/dev.env
http://localhost:4466/<project_name>/dev

// <project_root>/config/test.env
http://localhost:4466/<project_name>/test
```

Adjust .graphqlconfig file's endpoint to:

```
// <project_root>/.graphqlconfig
http://localhost:4466/<project_name>/dev
```

Deploy both environments:

```
cd <project_root>/prisma

prisma deploy -e ../config/dev.env
prisma deploy -e ../config/test.env
```

You can now run the local and test environments:

```
// Starts up Jest with unit tests
npm test

// Starts up local development environment with node server
npm run dev
```
