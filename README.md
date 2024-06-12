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

👉 Create a Cloudflare token

1. Go to your [profile tokens page](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Select "Edit Cloudflare Workers" template
4. Copy the token

👉 Add the token to your GitHub repo

1. Go to your repo action secrets page: https://github.com/[user]/[repo]/settings/secrets/actions
2. Click "New repository secret"
3. Paste your secret first so you don't lose it from your clipboard
4. Name it `CLOUDFLARE_API_TOKEN`

👉 Add the GitHub Action

```sh
mkdir -p .github/workflows
touch .github/workflows/deploy.yml
```

👉 Paste this into deploy.yml

```yml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

Now your site will deploy on every push to main.

👉 Make a change to your function's response and push

```sh
git push origin main
```
