# Cloudflare Pages

## Getting started

```sh
# make the project
mkdir my-cf-app
cd my-cf-app

# setup deps
npm init -y
npm i -D wrangler

# create a hello world function
mkdir functions
echo 'export function onRequest() {
  return new Response("Hello, cf3!")
}' > functions/path.js

# make the public dir and favicon
mkdir public
curl -o public/favicon.ico https://reactrouter.com/favicon.ico

# create a wrangler.toml
touch wrangler.toml
echo 'name = "my-cf-app"
compatibility_date = "2024-06-11"
pages_build_output_dir = "./public"
'
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
