# AGENTS.md

This document guides agentic tools working in this repo.

## Project Summary

- Framework: Next.js App Router (Next 16)
- UI: Tailwind v4 + shadcn/ui components (Radix Nova preset)
- State: Zustand for cart
- Fonts: next/font (Inter + Playfair), shadcn tokens in `app/globals.css`

## Commands

Use pnpm for scripts and installs.

### Dev

- `pnpm dev` — start dev server

### Build / Start

- `pnpm build` — production build
- `pnpm start` — start production server

### Lint

- `pnpm lint`

### Tests

- No test runner configured in `package.json`.
- There is no single-test command yet.
- If adding tests, document the runner and a single-test command here.

## Code Style Guidelines

### Formatting

- Prefer the existing style in each file (single quotes in TSX here).
- Keep JSX attributes aligned and readable.
- Avoid large inline objects inside JSX when they can be extracted.

### Imports

- Order: external libs, then UI/components, then local utils/hooks, then styles.
- Use absolute aliases (`@/components`, `@/lib`) where available.
- Keep named imports compact; avoid unused imports.

### TypeScript

- Use explicit types for shared data structures (e.g. cart items).
- Prefer `type` aliases for object shapes used across files.
- Avoid `any`. Use narrow unions for known modes (e.g. `'light' | 'dark'`).

### Naming

- Components: `PascalCase`.
- Functions/vars: `camelCase`.
- Constants: `SCREAMING_SNAKE_CASE` for true constants (e.g. URLs).
- Keep ids stable and derived from product + option when needed.

### React / Next.js

- Default to Server Components; add `'use client'` only when needed.
- Do not use browser APIs in Server Components.
- Use `next/image` for all images (local or remote).
- For remote images, ensure `next.config.ts` `images.remotePatterns` is set.
- Prefer `next/font` over manual `<link>` font imports.

### State (Zustand)

- Store file lives in `lib/` and is client-only.
- Persisted state uses `zustand/middleware` with a clear key name.
- Cart item identity should include size (e.g. `${productId}-${size}`).

### UI / shadcn

- Use shadcn components (`Button`, `Card`, `Badge`, `Sheet`) when possible.
- Tokens and color variables come from `app/globals.css` (shadcn theme).
- Keep UI neutral/monochrome unless explicitly requested.

### Accessibility

- Icon-only buttons need `aria-label`.
- Use semantic elements (`button`, `a`, `header`, `main`, `footer`).
- Preserve focus styles; avoid removing outlines without replacement.

### Error Handling

- Handle empty states gracefully (e.g. empty cart).
- Avoid throwing in render; guard with conditionals.
- Prefer early returns for simple conditionals.

### File Conventions

- App Router routes in `app/` (`page.tsx`, `layout.tsx`).
- Static assets live in `public/`.
- UI components in `components/ui/` (shadcn).
- Shared logic in `lib/`.

## Build Notes

- If you add new remote image domains, update `next.config.ts`.
- If you add new shadcn components, use the CLI:
- `pnpm dlx shadcn@latest add <component>`

## Docs

- Project docs live in `docs/`.
- Update docs when changing architecture, build steps, or deployment flow.

## Repo-Specific Notes

- No Cursor rules or Copilot instructions are present.
- Keep `AGENTS.md` updated when adding new tooling or commands.
