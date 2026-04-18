# Copilot Instructions

These are the canonical agent instructions for this repository.

## Source Of Truth

If another instruction file exists (for example AGENTS.md or CLAUDE.md), treat this file as the primary source of behavior.

## Project Context

- This is a TypeScript React Tic-Tac-Toe project built with Vite from the repository root.
- Use npm for all package and script operations.
- Do not introduce or rely on Yarn commands or Yarn lockfiles.
- Treat package.json scripts as the source of truth for build, test, and verification commands.

## Build And Verify

- Install dependencies: npm install
- Start dev server: npm run dev
- Production build: npm run build
- Type check: npm run typecheck
- Lint: npm run lint
- Unit tests: npm run test:unit
- Full test suite: npm run test
- Playwright e2e: npm run test:e2e

## Change Guidelines

- Prefer minimal, targeted edits over broad refactors.
- Keep GitHub Pages behavior intact in vite.config.mts.
- Update README.md when command flows or setup behavior changes.

## Safety

- Do not revert unrelated local changes.
- Avoid destructive git operations unless explicitly requested.
