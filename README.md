# Incorrect Number

A highly-styled agentic one-action website.

## Setup

1. Copy `.env.example` to `.env`
2. Add your ElevenLabs API key
3. Generate audio files:
   - `bun run generate:audio`
4. Start the dev server:
   - `bun run dev`

## Commands

- `bun run dev`
- `bun run build`
- `bun run typecheck`
- `bun run generate:audio`

## GitHub Pages

This app can be deployed as a static site on GitHub Pages.

Important:
- Generate the MP3 files locally first with `bun run generate:audio`
- Commit `public/audio/*.mp3` and `public/audio/manifest.json`
- The ElevenLabs API key is only needed locally for generation, not on GitHub Pages

Deployment steps:
1. Create a GitHub repository
2. Push this project to the `main` branch
3. In GitHub repo settings, enable **Pages** and select **GitHub Actions** as the source
4. Push to `main` and the workflow in `.github/workflows/deploy.yml` will publish the site
