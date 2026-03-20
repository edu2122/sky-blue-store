# Auth.js + Prisma Setup (Manual)

This guide shows how to add Auth.js (NextAuth) with Google OAuth + credentials
and a Prisma SQLite database **manually**. It uses up-to-date guidance from
Next.js App Router and Prisma 7.

## References (Context7)

- Next.js App Router Route Handlers: `/vercel/next.js`
- Prisma SQLite + Driver Adapter: `/prisma/docs`
- Prisma 7 config changes: `/prisma/prisma/7.5.0`

## 1) Install dependencies

```bash
pnpm add next-auth @auth/prisma-adapter bcryptjs
pnpm add -D prisma
pnpm add @prisma/client @prisma/adapter-better-sqlite3 better-sqlite3
pnpm add -D @types/better-sqlite3
```

## 2) Initialize Prisma

```bash
pnpm dlx prisma init --datasource-provider sqlite
```

Prisma 7 uses `prisma.config.ts` for the datasource URL.

### prisma.config.ts

```ts
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env["DATABASE_URL"] },
})
```

### .env

```bash
DATABASE_URL="file:./dev.db"
```

## 3) Prisma schema

Use Prisma Client JS and enable driver adapters if needed.

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "sqlite"
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?
  accounts      Account[]
  sessions      Session[]
  cart          Cart?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Cart {
  id        String     @id @default(cuid())
  userId    String     @unique
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     CartItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model CartItem {
  id        String   @id @default(cuid())
  cartId    String
  cart      Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)
  productId String
  name      String
  size      String
  quantity  Int
  price     Int
  image     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([cartId, productId, size])
}
```

## 4) Migrations + Generate

```bash
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma generate
```

## 5) Prisma client

Prisma 7 requires driver adapters for SQLite.

```ts
import { PrismaClient } from "./generated/prisma"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
})

export const prisma = new PrismaClient({ adapter })
```

## 6) Auth.js config

```ts
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // fetch user, compare bcrypt, return user object
      },
    }),
  ],
  pages: { signIn: "/login" },
}
```

## 7) Route handler (App Router)

```ts
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

## 8) Env vars

```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<openssl rand -base64 32>"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

## 9) Common errors

- `redirect_uri_mismatch`: add `http://localhost:3000/api/auth/callback/google` in Google OAuth.
- `Callback error`: missing DB tables or wrong adapter.
- Prisma 7: make sure driver adapter is used for SQLite.

## 10) Notes

- For production, use a real DB (Postgres) and set secure secrets.
- Use server components for session reads (`getServerSession`).
