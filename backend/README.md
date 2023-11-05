# Starbucks Clone (Backend)

This project is a Starbucks Clone application built using AdonisJS (PostgreSQL) and ReactNative.

## Installation

1. Clone the project:

```bash
git clone https://github.com/sergenkabakci/startbucksClone.git
```

2. Install project dependencies:
```bash
# cd backend
# npm install
```

3.Create a .env file in the project root and add the following variables:

```bash
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=n2351BMa7jnqbtLZ5sgUkutb4f82Cnu4
DRIVE_DISK=local

DB_CONNECTION=pg
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=user
PG_PASSWORD=password
PG_DB_NAME=database
```

Create and run the database migrations and start the application:

```bash
# node ace migration:run
# node ace serve --watch
```

