# Tic-Tac-Toe

Tic-Tac-Toe React web app built with Vite.

## Use npm (not Yarn)

This repository is configured for npm.

1. Install root dependencies:

```bash
npm install
```

## Run locally

Start the web app:

```bash
npm run dev
```

## Quality checks

Run static checks and tests:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm test
```

## Build

Build production output for GitHub Pages into `dist/`:

```bash
npm run build
```

## Deploy to GitHub Pages

Preferred: use GitHub Actions deployment in `.github/workflows/static.yml`.

1. In repository settings, set Pages source to `GitHub Actions`.
2. Push to `main`.

Manual fallback: build directly into `dist/` and publish it.

```bash
npm run build
```

The app base path for Pages is configured in `vite.config.mts`.
If your repository name is not `Tic-Tac-Toe`, update the `repoName` constant there.

## CI

Pull requests and pushes to `main` run linting, type checking, unit tests, the production build, and the Playwright smoke suite in `.github/workflows/ci.yml`.
