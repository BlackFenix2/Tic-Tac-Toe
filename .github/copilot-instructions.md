# Copilot Instructions

These are the canonical agent instructions for this repository.

## Source Of Truth

If another instruction file exists (for example AGENTS.md or CLAUDE.md), treat this file as the primary source of behavior.

## Project Context

- This is a TypeScript React Tic-Tac-Toe project with a Vite demo app in demo/.
- Use npm for all package and script operations.
- Do not introduce or rely on Yarn commands or Yarn lockfiles.

## Build And Verify

- Demo app install: npm run demo:install
- Demo app dev: npm run demo:dev
- Demo app build: npm run demo:build
- Root package build remains legacy and may have older toolchain constraints.

## Change Guidelines

- Prefer minimal, targeted edits over broad refactors.
- Keep GitHub Pages behavior intact in demo/vite.config.ts (base path controlled by GITHUB_PAGES).
- Update README.md when command flows or setup behavior changes.

## Safety

- Do not revert unrelated local changes.
- Avoid destructive git operations unless explicitly requested.
