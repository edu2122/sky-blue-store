# Architecture

## Overview

Sky Blue Shop VE is a Next.js App Router project focused on a single product page
for World Cup shirts. The UI is built with Tailwind v4 and shadcn/ui components.
Cart state lives in a client-side Zustand store with localStorage persistence.

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- shadcn/ui (Radix Nova preset)
- Zustand (cart store)
- next-themes (theme control)
- sonner (toast notifications)

## App Structure

- `app/`
  - `layout.tsx` root layout (fonts, ThemeProvider, Toaster)
  - `page.tsx` home page composition
- `components/`
  - `site-header.tsx` header + cart sidebar
  - `hero-section.tsx` hero copy and CTAs
  - `product-grid.tsx` product cards + size select + buy links
  - `site-footer.tsx` payment badges and meta info
  - `mode-toggle.tsx` light/dark toggle
  - `theme-provider.tsx` next-themes wrapper
  - `icons/` inline SVG icons (PayPal, Binance, Mastercard, Venezuela flag)
- `components/ui/` shadcn components (Button, Card, Sheet, Badge, Sonner, etc.)
- `lib/`
  - `cart-store.ts` Zustand cart store with persistence
- `public/`
  - `shirts/` product images
  - `sky-blue-shop.svg` logo

## Data Flow

1. `app/page.tsx` provides product list + message builders.
2. `SiteHeader` reads cart data and shows a sheet sidebar.
3. `ProductGrid` renders cards and calls `addItem`.
4. Cart actions update Zustand store and persist to localStorage.
5. WhatsApp/Instagram buy links are generated from product data and cart state.

## State Management

- `useCartStore` provides:
  - `items` array with `id`, `name`, `price`, `image`, `size`, `quantity`
  - `addItem`, `updateQuantity`, `removeItem`, `clear`, `count`
- IDs include size: `${productId}-${size}`
- Persist key: `sky-blue-cart`

## Theming

- `ThemeProvider` uses next-themes to set class on `html`.
- `ModeToggle` switches light/dark/system.
- `Toaster` consumes theme from next-themes.

## Rendering Notes

- The page is a client component (uses hooks and Zustand).
- Use `next/image` for all images and update `next.config.ts` for remote domains.
- Keep product data local for now; replace with CMS/API if needed.

## Extending

- Add more products: extend the `products` array and images in `public/shirts/`.
- Add new payment icons: create SVG component in `components/icons/` and map it
  in `site-footer.tsx`.
- Add checkout flow: create new routes in `app/` and read cart from store.
