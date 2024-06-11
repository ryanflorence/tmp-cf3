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

# deploy
wrangler pages deploy

# dev
wrangler pages dev
```

## Connect to GitHub

[Create a new repo with repo.new](https://repo.new)

## Add a D1 Database
