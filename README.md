## Description

API monitoring project for master thesis at [Faculty of Materials Science and Technology](https://www.mtf.stuba.sk/english.html?page_id=760).

## Built With

- [Nest framework](https://github.com/nestjs/nest) version 7.6.15
- [Node.js](https://github.com/nodejs/node) version 14.16.0
- [TypeScript](https://github.com/microsoft/TypeScript) version 4.2.3
- [npm](https://docs.npmjs.com/) version 7.19.0
- [MariaDB](https://mariadb.org/documentation/) version 10.6.5
## Schema

For database schema creation there needs to be launched file `apollo.sql` in the local MariaDB database.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# update e2e tests snapshots
$ npm run test:e2e -- -u