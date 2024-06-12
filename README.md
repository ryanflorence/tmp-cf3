# Cloudflare Pages

## Getting started

```sh
# 👉 make the project
mkdir my-cf-app
cd my-cf-app

# 👉 setup deps
npm init -y
npm i -D wrangler

# 👉 create a hello world function
mkdir functions
echo 'export function onRequest() {
  return new Response("Hello, cf3!")
}' > functions/path.js

# 👉 make the public dir and favicon
mkdir public
curl -o public/favicon.ico https://reactrouter.com/favicon.ico
echo '{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/favicon.ico"]
}' > public/_routes.json

# 👉 create a wrangler.toml
touch wrangler.toml
echo 'name = "my-cf-app"
compatibility_date = "2024-06-11"
pages_build_output_dir = "./public"
```

## Connect to GitHub

Your app will be automatically deployed when pushed to GitHub.

👉 [Create a new repo with repo.new](https://repo.new)

👉 Push

```sh
git remote add origin git@github.com:<username>/<my-cf-app>.git
git branch -M main
git push -u origin main
```

👉 Go to the cloudflare dashboard and create a new pages project

[a few terrible screenshots]

Done!

Now make changes and push to GitHub

## Add a D1 Database

👉 Create a database

```
wrangler d1 create my-cf-app-db
```

👉 Bind it to your project

Copy/paste the toml from the previous command, it'll look like this:

```
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "my-cf-app-db"
database_id = "<some id>"
```

👉 Create a migration

```sh
wrangler d1 migrations create my-cf-app-db schema
```

👉 Write out the DB schema you want

```sql
DROP TABLE IF EXISTS Customers;

CREATE TABLE
  IF NOT EXISTS Customers (
    CustomerId INTEGER PRIMARY KEY,
    CompanyName TEXT,
    ContactName TEXT
  );

INSERT INTO
  Customers (CustomerID, CompanyName, ContactName)
VALUES
  (1, 'Alfreds Futterkiste', 'Maria Anders'),
  (4, 'Around the Horn', 'Thomas Hardy'),
  (11, 'Bs Beverages', 'Victoria Ashworth'),
  (13, 'Bs Beverages', 'Random Name');
```

### Local D1 Development

👉 Run the migration locally

```sh
wrangler d1 migrations apply my-cf-app-db --local
```

👉 Run a query:

```sh
wrangler d1 execute my-cf-app-db --local --command="SELECT * FROM Customers"
```

👉 Query in your function

```js
export async function onRequest(context) {
  let customers = await context.env.DB.prepare("SELECT * FROM Customers").all();
  return Response.json(customers);
}
```

### D1 Deployment

👉 Apply the migrations to the actual database, same as before, but with the `--remote` flag.

TODO: Put this in a GitHub action?

```sh
wrangler d1 migrations apply my-cf-app-db --remote
```

👉 Verify the migration was applied

```sh
wrangler d1 execute my-cf-app-db --remote --command="SELECT * FROM Customers"
```

👉 Deploy by pushing to GitHub

```
git add . -m "adds D1 database"
git push origin main
```
