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
pages_build_output_dir = "./public"'

# 👉 Go make a cloudflare account if you don't have one

# 👉 Deploy the site, it will prompt to create a new one, do it
wrangler pages deploy
```

👉 Start the local dev server

```sh
wrangler pages dev
```

## Deploy with GitHub Action
