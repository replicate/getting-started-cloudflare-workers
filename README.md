# Getting started with Cloudflare Workers and Replicate

This is a template for a simple web app using [Cloudflare Workers](https://developers.cloudflare.com/workers/), [Hono](https://honojs.dev/), and [Replicate](https://replicate.com/) to generate images using [Flux Schnell](https://replicate.com/black-forest-labs/flux-schnell), a fast and high-quality open-source image generation model.

🍿 [Watch the 60-second demo on YouTube](https://www.youtube.com/watch?v=esO33ejanZs)

---

![screenshot](https://github.com/user-attachments/assets/f123b271-09a1-468c-9aac-5fdd4ed75184)

## Stack

- [Cloudflare Workers](https://developers.cloudflare.com/workers/) is a serverless platform for building web applications. You can run "serverless" functions in a Node.js-like environment, plus serve static web pages and assets.
- [Hono](https://honojs.dev/) is a minimalist web framework for building serverless applications. It's built and maintained by Cloudflare.
- [Replicate](https://replicate.com/) is a platform for building and running machine learning models.
- [Flux Schnell](https://replicate.com/black-forest-labs/flux-schnell) is a fast and high-quality open-source image generation model, made by the original creators of Stable Diffusion.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) - You'll need a recent version of Node.js installed to run the app locally.
- [Cloudflare account](https://dash.cloudflare.com) - You'll need a Cloudflare account to deploy the app.
- [Replicate account](https://replicate.com) - You'll need a Replicate account to run the Flux Schnell model.

## Getting started

To create a new Cloudflare Workers project using this repo as a template, run this command:

```bash
npm create cloudflare@latest -- cloudflare-replicate-demo --template replicate/getting-started-cloudflare-workers
```

This will run you through an interactive series of prompts to create a new project, create a Git repository, install dependencies, and optionally deploy it to Cloudflare.

## Development

To run the app locally, create a [Replicate API token](https://replicate.com/account/api-tokens) and copy it to a `.dev.vars` file.

Install your dependencies:

```bash
npm install
```

Run local server:

```bash
npm run dev
```

Hit the `b` key to open the server in your browser.

## Deployment

To deploy your app to Cloudflare, you'll need to upload your Replicate API token as a Cloudflare secret:

```bash
npx wrangler secret put REPLICATE_API_TOKEN
```

Then, deploy your app:

```bash
npm run deploy
```