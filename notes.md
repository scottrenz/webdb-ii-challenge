# notes

## ways of managing a db schema

- migrations === preferred.
- using a gui/cli tool.
- use sql scripts.

## story

- v1: record client's phone number 2000
- v3: 2002, record client's email.
- v4: 2007, contact info (type, value), multiple emails/phones/social media accounts.
  --- here you don't have an email or phone number on your client table.

what happens if you run v3 code against v4 database.

**Every table MUST have a Primary Key (PK)**

Data Model > validation > db constraints

## Steps

- npx knex init to create knexfile.js
- moved config object to knexfile.js from fruits router.
- removed staging and production properties from knexfile.js
- added db-config.js
- changed the reference on fruits router to bring db from db-config.js

**every change to the schema, needs a new migration**
