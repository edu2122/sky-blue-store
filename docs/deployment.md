# Deployment

## Requirements

- Node.js 20+
- pnpm 10+

## Build

```bash
pnpm install
pnpm build
```

## Start (Production)

```bash
pnpm start
```

The app will start on the default Next.js port (3000).

## Environment Variables

No required env vars today. If adding integrations, document here and in
`README.md` or this file.

## Images

If you add remote image domains, update `next.config.ts`:

```ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "example.com" }]
}
```

## Hosting Notes

- Vercel works out of the box with `next build`.
- For other hosts, ensure `pnpm start` is used and `NODE_ENV=production`.
- Set `PORT` if your host requires a custom port.
