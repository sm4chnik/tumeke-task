### Task:
- Hello! In this task, we have set up a toy version of how our backend sevices operate. Your main goal is to flesh out this implementation, subject to a few restrictions that we describe below. Most of the work that needs to be done is limited to a handful of files: `user->user.service.ts`, `client->client.service.ts`, and `note->note.service.ts`. These files have comments where the missing code should be filled out. 
- The next section has some steps on how to get started. Please follow these carefully to make sure your environment is easily set up.

### Getting started
1. Set up a PostgreSQL database (preferably version 14)
    1. Create a new user `admin` with password `password`.
    2. Create a new database `tumeke-task` (with owner `admin`)
2. Import the database dump (`tumeke-task.sql`) into your `tumeke-task` database
    ```
    psql --username=admin tumeke-task < tumeke-task.sql
    ```
3. Create a `.env` file with the content:
    ```
    DB_URL=postgres://admin:password@localhost:5432/tumeke-task
    ```
4. Install dependencies via `yarn install`
5. Run `yarn prisma:pull` to create a schema for `Prisma` (check `prisma/schema.prisma` file for changes)
6. Run `yarn prisma:generate` to generate models for `Prisma`
7. To launch the backend application, run the command `yarn start`

### Implementation details:
Please keep in mind the following points as you go through your implementation:
- Records from the database shouldn't be deleted - instead they should be flagged as `deletedAt`
- Records with the `deletedAt` flag shouldn't be returned in any response
- When creating a `note`, you should also use the `userId` or `clientId` parameter and create an intermediate table (`usersHasNotes` or `clientsHasNotes`)
- If intermediate tables are created when creating a record, then a `Prisma` transaction should be used
- All requests, except for `clients`->`findAll`, should be written through `Prisma` ORM
- All responses should include cross-tables that are linked by foreign keys
- The `clients`->`findAll` query includes filtering by array in `note` field (by flags `hasUnpaid` and `billAmountLargerThan`). `Prisma` with PostgeSQL [doesn't support such filtering](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-json-fields#filtering-on-object-key-value-inside-array), so this query should be written in raw SQL
- Filtering by `hasUnpaid` should extract all records from `clients` that have `notes` that have in a json field `note` in the `bills` array - `status = "unpaid"` (don't use direct check on the whole json field presented as a string using `LIKE`)
- Filtering by `billAmountLargerThan` should extract all records from `clients` that have `notes` that have in a json field `note` in the `bills` array `amount > billAmountLargerThan`
- No need to create repositories for models
- No need to create unit tests

### Description of the `notes`->`note` json field:
There can be two formats of json field:
First:
```
{
  "type": "info",
  "text": string
}
```
Second:
```
{
  "type": "finance",
  "bills": {
    "date": string,
    "amount": number,
    "number": string,
    "status": "paid" | "unpaid",
    "memo": string
  }[]
}
```

### Additional requirements:
- The code must be written in TypeScript and the maximum possible typing must be used (avoid `any` and `unknown`)
- The code must be written in compliance with all `eslint` rules and pass the `yarn lint` check (please avoid adding new rules and disabling existing ones)
- Don't use additional dependencies

