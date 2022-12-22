# Backend

Notes on the Fastify/Supabase backend for **oddjobs**.

## Fastify Server

-   To start the local dev server:

```sh
    npm run dev
```

## Supabase Management

-   To start the local dev database server:

```sh
    npx supabase start
```

-   To stop the local dev database server:

```sh
    npx supabase stop
```

-   To migrate the local dev database (store recent changes):

```sh
    npx supabase db diff <name> -f <name>
```

-   To reset the database (revert changes, refresh `seed.sql` for sample data):

```sh
    npx supabase db reset
```
