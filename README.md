# NestJS API

To support OAuth, you must create an application with each vendor. 

`entity.*.ts`: database model
`model.ts`: business objects
`service.ts`: business logic wrapper around `dao.ts`
`dao.ts`: direct access to data
`dto.ts`: transferring data via request
`controller.ts`: handles routes and requests
`module.ts`: provides and manages context of all the above


## Improvements

- Complete Terraform for Linode
- Add support for AWS Secret Manager
- TypeORM entities should use DAOs where appropriate
- Add foreign key relations once structure is solidified
- Use AuthGuard for user role rules and move middleware to isolated modules

## Using Postgres Database

To run the DB locally:

```
docker pull postgres
docker run --rm --name local-postgres -e POSTGRES_PASSWORD=topsecret -p 5432:5432 -d postgres
docker exec -d local-postgres psql postgres postgres -c 'create database demo;'
```

To run the DB via (Fly.io)[https://fly.io]:

```
flyctl postgres create
flyctl proxy 5432 -a template-nestjs-postgres
```

## Sample .env

```
# Runtime config
NODE_ENV=development
PORT=8080

# Postgres config
DB_NAME=
DB_USER=
DB_HOST=
DB_PWD=
DB_PORT=

# Security config
JWT_SECRET=

# IP location service config
USERSTACK_API_KEY=

# Email service config
SENDGRID_SENDER=
SENDGRID_API_KEY=

# Google config
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Discord config
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Twitch config
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=

# Facebook config
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

# Microsoft config
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
MICROSOFT_CLIENT_TENANT_ID=

# Twitter config
TWITTER_API_KEY=
TWITTER_CLIENT_SECRET=
TWITTER_BEARER_TOKEN=
```