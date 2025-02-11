# Getting started with Cloudflare Workers and Replicate

This is a basic example app that uses [Cloudflare Workers](https://developers.cloudflare.com/workers/), [Hono](https://honojs.dev/), and [Replicate](https://replicate.com/) to generate images using Flux, a fast and high-quality open-source image generation model.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Cloudflare account](https://dash.cloudflare.com)
- [Replicate account](https://replicate.com)

## Development

To get started running this locally, you'll need to create a [Replicate API token](https://replicate.com/account/api-tokens) and copy it to a `.dev.vars` file.

Install your dependencies:

```bash
npm install
```

Run local server:

```bash
npm run dev
```

Hit the `b` key to open the server in your browser.

## Deploy

To deploy your app to Cloudflare, you'll need to upload your Replicate API token as a Cloudflare secret:

```bash
npx wrangler secret put REPLICATE_API_TOKEN
```

Then, deploy your app:

```bash
npm run deploy
```