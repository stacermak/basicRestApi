#How to create basic REST API

##How to run it?

Install [https://nodejs.org/en](https://nodejs.org/en)

Use npm or yarn.

1. Clone this repository.
2. Run yarn install
3. Run yarn start


##DB

1. Use [Prisma Studio](https://www.prisma.io/docs/orm/tools/prisma-studio) to browser DB 

## Start with branch Hello World

There is index.js file with hello world endpoint.

### Install packages needed for this project.

`yarn add @prisma/client bcryptjs express jsonwebtoken nodemon prisma `


### Check package.json
1. Check if packages was added.
2. Add script to start instead of test, nodemon will automatically restart our application after you save changes.

```
 "scripts": {
    "start": "nodemon index.js"
  },
```

Start with `yarn start`.

### Set up db

1. If you don't have docker, install [here](https://docs.docker.com/get-docker/)
2. Create docker-compose file (see below)
3. Start it `docker-compose up -d`

**Docker-compose file**

```
version: '3.8'

services:
  postgres:
    image: postgres:latest
    container_name: mypostgres
    environment:
      POSTGRES_PASSWORD: password 
      POSTGRES_USER: user               
      POSTGRES_DB: mydb                   
    ports:
      - "5432:5432"
    volumes:
      - mypostgresdata:/var/lib/postgresql/data
    restart: always

volumes:
  mypostgresdata:
  
```
## Initialize prisma

In your project folder, type to terminal: `npx prisma init`

Create database schema in `prisma/schema.prisma`.

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id  Int @id @default(autoincrement())
  name String  @unique
  password String
  posts Post[]
} 

model Post {
  id  Int   @id @default(autoincrement())
  title String
  content String
  author User @relation(fields: [authorId], references: [id])
  authorId Int
}
```

Create .env file in root folder and add DATABASE_URL.

`DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"`

**To map your data model to db use**

`npx prisma migrate dev --name init`

### Check tables in db via prisma studio

`npx prisma studio`

### Set Prisma Client

1. Create folder for eg. utils
2. Create there file db.js
3. Use code below

```
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()
```


