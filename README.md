# NexMart

A modern, portfolio-focused e-commerce storefront built with Next.js App Router, TypeScript, Tailwind CSS, and Fake Store API data.

## Highlights

- Responsive storefront with custom NexMart UI.
- Home page sections:
  - spotlight hero slider
  - trust badges
  - featured rails
  - campaign blocks
  - trending/recommended content
  - FAQ and blog highlights
- Product flows:
  - `/products` catalog with category + sorting + pagination
  - `/products/[productId]` detail page with zoom, wishlist, cart actions, and recently viewed tracking
  - `/search` query-driven discovery
- Cart and wishlist:
  - localStorage-backed cart and wishlist persistence
  - header cart drawer + dedicated `/cart` and `/wishlist` pages
- Payments:
  - Razorpay checkout integrated on `/cart`
  - server endpoints for Razorpay order creation and signature verification
- Auth UX:
  - demo-style email/password login + register + profile flow (localStorage-backed)
- UX extras:
  - dark mode toggle
  - cookie consent banner
  - back-to-top button
- Pricing:
  - all price display is formatted in INR (₹)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma + PostgreSQL (for server-side auth/order-related modules)
- Better Auth
- Radix UI primitives
- Sonner (toasts)
- Motion

## Project Structure

- `src/app` - routes (App Router)
- `src/features` - domain modules (storefront, cart, checkout, auth, shipping, etc.)
- `src/core` - shared UI, routing, forms, DB helpers
- `utils/api.js` - centralized Fake Store API utilities
- `context` - local cart/wishlist state providers used by storefront UX

## Environment Variables

Copy from `.env.example` and set values in `.env.local`.

Required for full project:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`

Optional:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

Required for Razorpay checkout on `/cart`:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. (Optional but recommended) Start local database:

```bash
pnpm db:start
```

3. Run migrations:

```bash
pnpm db:migrate
```

4. Start development server:

```bash
pnpm dev
```

5. Open:

```text
http://localhost:3000
```

## Scripts

- `pnpm dev` - run dev server
- `pnpm build` - production build
- `pnpm start` - start built app
- `pnpm lint` - ESLint checks
- `pnpm format` - Prettier check
- `pnpm types:check` - TypeScript check
- `pnpm codequality` - format + lint + types
- `pnpm unused` - dead code/dependency scan (knip)
- `pnpm db:start` / `pnpm db:stop` - local postgres via Docker
- `pnpm db:migrate` / `pnpm db:reset` / `pnpm db:seed` - Prisma DB tasks

## API Endpoints

- `/api/auth/[...all]` - Better Auth handlers
- `/api/payments/razorpay/order` - create Razorpay order
- `/api/payments/razorpay/verify` - verify Razorpay payment signature

## Route Map

- `/` - home
- `/products` - catalog
- `/products/[productId]` - product detail
- `/products/favorites` - redirects to wishlist
- `/search` - search results
- `/cart` - cart + Razorpay checkout
- `/wishlist` - wishlist board
- `/login` - demo sign in
- `/register` - demo sign up
- `/profile` - demo profile
- `/about`
- `/blog`
- `/contact`
- `/checkout` - shipping + server-driven checkout flow
- `/orders`
- `/orders/[orderId]`

## Notes

- Product/category data is sourced from Fake Store API and normalized in app utilities.
- Storefront cart/wishlist/auth UX is intentionally demo-friendly and localStorage-backed.
- Razorpay payment flow currently targets the `/cart` checkout UI.
# NexMart
