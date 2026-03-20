# Development

## Setup

```bash
pnpm install
```

## Run Dev Server

```bash
pnpm dev
```

Open http://localhost:3000

## Lint

```bash
pnpm lint
```

## Tests

There is no test runner configured yet. If adding tests, document the runner
and a single-test command here.

## Code Organization

- UI components live in `components/` and `components/ui/`.
- State and shared utilities live in `lib/`.
- Static assets are in `public/`.

## Working with shadcn

Add components with:

```bash
pnpm dlx shadcn@latest add <component>
```

## Adding Products

- Add images to `public/shirts/`.
- Update the `products` array in `app/page.tsx`.

## Cart Behavior

- Cart state is persisted with Zustand (`sky-blue-cart`).
- Product identity includes size: `${productId}-${size}`.

## Toasts

- Toast provider is registered in `app/layout.tsx`.
- Trigger using `toast.success()` from `sonner`.

## Theming

- Theme uses `next-themes` with `ThemeProvider` in `app/layout.tsx`.
- `ModeToggle` toggles light/dark/system.
