# @Math-Baba-BP/user-crud-management

A plug-and-play user management package for Next.js apps. Includes authentication (login / logout), a user CRUD dashboard, and role-based access control — all styled with Tailwind CSS and ready to drop in.

---

## Features

- Login page with credentials authentication (Auth.js v5)
- Admin dashboard to create, edit and delete users
- Role-based guard (`ADMIN` / `USER`)
- Middleware helper to protect routes
- Tailwind CSS default styles, fully overridable

---

## Prerequisites

- Node.js 20+
- Next.js 15+
- React 18 or 19
- Tailwind CSS v4
- PostgreSQL database

---

## Installation

### 1. Configure GitHub Packages registry

This package is hosted on GitHub Packages. Create or update a `.npmrc` file at the root of your project:

```
@Math-Baba-BP:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

> Generate a token at **GitHub → Settings → Developer settings → Personal access tokens** with the `read:packages` scope.

### 2. Install the package and its peer dependencies

```bash
npm install @Math-Baba-BP/user-crud-management
```

This package requires the following peer dependencies — install any you don't already have:

```bash
npm install next-auth@^5.0.0-beta.30 @tanstack/react-query @tanstack/react-table react-hook-form @hookform/resolvers zod
```

> **Auth.js v5** (`next-auth@^5.0.0-beta.x`) is required. v4 is not compatible.

### 3. Add the Prisma model to your schema

In your `prisma/schema.prisma`, add:

```prisma
enum UCR_Role {
    ADMIN
    USER
}

model UCR_User {
    id        String   @id @default(cuid())
    name      String?
    email     String   @unique
    password  String
    role      UCR_Role @default(USER)
    createdAt DateTime @default(now())
    updateAt  DateTime @updatedAt

    @@map("ucr_users")
}
```

Then run:

```bash
npx prisma migrate dev --name add-user-crud
```

### 4. Set environment variables

In your `.env`:

```env
DATABASE_URL=postgresql://...
AUTH_SECRET=your-random-secret
AUTH_URL=http://localhost:3000
```

Generate a secret:

```bash
openssl rand -base64 32
```

### 5. Configure the package

Create `lib/user-crud.ts` in your app:

```ts
import { configureUserCrudManagement } from "@Math-Baba-BP/user-crud-management/server"
import { prisma } from "@/lib/prisma" // your existing Prisma client

configureUserCrudManagement({ prisma })
```

Import it in your root layout so it runs on every server request:

```ts
// app/layout.tsx
import "@/lib/user-crud"
```

### 6. Add the auth API route

Create `app/api/auth/[...nextauth]/route.ts`:

```ts
import "@/lib/user-crud"
import { handlers } from "@Math-Baba-BP/user-crud-management/server"

export const { GET, POST } = handlers
```

### 7. Add Tailwind source scanning

In your `app/globals.css`:

```css
@import "tailwindcss";
@source "../node_modules/@Math-Baba-BP/user-crud-management/dist";
```

### 8. Add the middleware

Create `middleware.ts` at the root of your app:

```ts
import { createAuthMiddleware } from "@Math-Baba-BP/user-crud-management/auth"

export default createAuthMiddleware({
    loginPath: "/login",
    protectedPaths: ["/dashboard"],
})

export const config = {
    matcher: ["/dashboard/:path*"],
}
```

### 9. Activate the session types

The package ships a type augmentation that adds `role` to `session.user`. Without it, TypeScript won't know about the `role` field.

Create a `global.d.ts` at the root of your project:

```ts
/// <reference types="@Math-Baba-BP/user-crud-management/types" />
```

Make sure this file is picked up by your `tsconfig.json`:

```json
{
  "include": ["global.d.ts", "next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

### 10. Seed an admin user

```bash
npx tsx node_modules/@Math-Baba-BP/user-crud-management/src/db/seeds/seed-admin.ts
```

Default credentials: `admin@example.com` / `Admin1234!`

---

## Usage

### Login page

```tsx
// app/login/page.tsx
"use client"

import { LoginPage } from "@Math-Baba-BP/user-crud-management/client"

export default function Page() {
    return <LoginPage redirectTo="/dashboard" />
}
```

### Dashboard page

```tsx
// app/dashboard/page.tsx
import { getUsers } from "@Math-Baba-BP/user-crud-management/server"
import { UserCrudDashboard } from "@Math-Baba-BP/user-crud-management/dashboard"

export default async function Page() {
    const users = await getUsers()
    return <UserCrudDashboard users={users} />
}
```

### Protect a server component

In the LoginPage, change the path of the redirectTo (example: redirectTo="/auth/redirect")

```ts
// app/auth/redirect/page.tsx (Example)
import { getAuthSession } from "@Math-Baba-BP/user-crud-management/server"
import { redirect } from "next/navigation"

export default async function AuthRedirectPage() {
    const session = await getAuthSession()

    if (!session?.user) {
        redirect("/login")
    }

    if (session.user.role === "ADMIN") {
        redirect("/dashboard")
    }

    redirect("/chat")
}
```

### Override default styles

Wrap your app (or just the dashboard) with `UserCrudStyleProvider` and pass custom Tailwind classes:

```tsx
"use client"

import { UserCrudStyleProvider } from "@Math-Baba-BP/user-crud-management/client"

export function Providers({ children }) {
    return (
        <UserCrudStyleProvider
            classNames={{
                button: "bg-blue-600 text-white px-4 py-2 rounded-lg",
                card: "rounded-2xl border border-gray-100 p-8",
            }}
        >
            {children}
        </UserCrudStyleProvider>
    )
}
```

Available keys: `dashboard`, `table`, `tableHeader`, `tableRow`, `input`, `button`, `card`, `form`.

---

## Common Errors

### `UserCrudManagement is not configured`

You forgot to import `@/lib/user-crud` somewhere it actually runs on the server.

**The two places where it is mandatory:**

```ts
// app/layout.tsx
import "@/lib/user-crud"
```

```ts
// app/api/auth/[...nextauth]/route.ts
import "@/lib/user-crud"  // ← required, layout does NOT run for API routes
import { handlers } from "@Math-Baba-BP/user-crud-management/server"
export const { GET, POST } = handlers
```

The middleware runs in the Edge Runtime and has no access to your app modules — `configureUserCrudManagement` must never be called from middleware.

---

### `Property 'role' does not exist on type 'User'`

The package ships a `next-auth` type augmentation that adds `role` to `session.user`, but it needs to be explicitly referenced in your project.

Create a `global.d.ts` at the root of your project:

```ts
/// <reference types="@Math-Baba-BP/user-crud-management/types" />
```

Then make sure `global.d.ts` is included in your `tsconfig.json`:

```json
{
  "include": ["global.d.ts", "next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

If the error persists after adding the file, restart the TypeScript server in your editor (VS Code: `Ctrl+Shift+P` → *TypeScript: Restart TS Server*).

---

### `CLIENT_FETCH_ERROR: Cannot convert undefined or null to object`

This usually means the auth session endpoint (`/api/auth/session`) is returning HTML instead of JSON — which happens when the auth route is broken.

Check that:
- `app/api/auth/[...nextauth]/route.ts` exists and exports `GET` and `POST`
- `AUTH_SECRET` and `AUTH_URL` are set in `.env` (Auth.js v5 uses these names, not `NEXTAUTH_SECRET`)
- You are using `next-auth` v5 (`^5.0.0-beta.x`), not v4

---

### `MissingSecret` or empty secret error on login

Auth.js v5 reads `AUTH_SECRET` from the environment, not `NEXTAUTH_SECRET`. Make sure your `.env` has:

```env
AUTH_SECRET=your-secret-here
AUTH_URL=http://localhost:3000
```

---

### No CSS — the page renders unstyled HTML

Tailwind v4 only scans your project files by default. It does not scan `node_modules`.

You must explicitly tell Tailwind to scan the package dist files. In your `app/globals.css`:

```css
@import "tailwindcss";
@source "../node_modules/@Math-Baba-BP/user-crud-management/dist";
```

Do **not** try `@import "@Math-Baba-BP/user-crud-management/styles"` — Tailwind v4's CSS resolver does not support package export maps for `@import`.

---

### `createContext` error in a Server Component

This happens when you import `UserCrudDashboard` from the wrong entry point.

```ts
// correct
import { UserCrudDashboard } from "@Math-Baba-BP/user-crud-management/dashboard"

// wrong — this pulls in React context into the server bundle
import { UserCrudDashboard } from "@Math-Baba-BP/user-crud-management/server"
```

---

### `revalidatePath` / server action called in a client bundle

You imported a server-only export inside a Client Component or a file that ends up in the client bundle.

Rule of thumb:
- `@Math-Baba-BP/user-crud-management/server` → only in Server Components, API routes, and server actions
- `@Math-Baba-BP/user-crud-management/client` → only in Client Components
- `@Math-Baba-BP/user-crud-management/dashboard` → Server Component only
- `@Math-Baba-BP/user-crud-management/auth` → only in `middleware.ts`

---

### `PrismaClientKnownRequestError P2025` on delete

This error means "record not found". It is not a bug — it simply means you tried to delete a user that does not exist anymore (e.g. already deleted, or stale UI). The package handles this gracefully; just refresh the page.

---

### Seed fails with unique constraint error

```
PrismaClientKnownRequestError: Unique constraint failed on the fields: (`email`)
```

The admin user already exists in the database. The seed is safe to ignore — your admin account is already there.

---

### `next-auth` v4 and v5 conflict

If you had `next-auth` v4 installed before, make sure you upgraded to v5:

```bash
npm install next-auth@^5.0.0-beta.30
```

Mixing v4 and v5 causes silent auth failures and session errors.

---

## Contributing / Local development

### Build the package

The package is compiled with [tsup](https://tsup.egoist.dev). Install dev dependencies first:

```bash
npm install
```

Then build:

```bash
npm run build
```

This generates:
- `dist/client/index.js` — client components (`"use client"` auto-injected)
- `dist/server/index.js` — server utilities and NextAuth handlers
- `dist/auth/index.js` — middleware-safe auth helpers
- `dist/dashboard/index.js` — dashboard component (compiled, no transpilePackages needed)
- `dist/types/next-auth.d.ts` — `next-auth` type augmentation (`session.user.role`)
- `dist/styles/index.css` — Tailwind v4 `@source` directive

To watch and rebuild on change:

```bash
npm run dev
```

### Seed an admin user (dev)

```bash
npm run prisma:seed
```

Default credentials: `admin@example.com` / `Admin1234!`
