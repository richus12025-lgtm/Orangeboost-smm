[README.md](https://github.com/user-attachments/files/28659568/README.md)
# OrangeBoost SMM

Premium Social Media Marketing (SMM) panel built with **Next.js + Tailwind + Supabase**.

## What you get (MVP)

- Landing page (glassmorphism + neon orange)
- Auth: signup/login/forgot/reset (Supabase Auth)
- User dashboard:
  - Services browser
  - New order form + order tracking
  - Wallet + transaction history
  - Support tickets + thread view
  - Profile + API key generation (reseller API)
- Admin panel:
  - Services management (add/disable)
  - Users / Orders / Tickets overview
- Payments (MVP):
  - Paystack + Flutterwave “initialize payment” endpoints
  - Webhook endpoints to credit wallet (production-ready pattern)

## Quick start

### 1) Install dependencies

```bash
npm install
```

### 2) Create a Supabase project

1. Create a new Supabase project
2. In Supabase SQL Editor, run:
   - `supabase/schema.sql`
3. Copy your project keys (Settings → API)

### 3) Configure environment variables

Create `.env.local` from `.env.example` and fill in values.

### 4) Run dev server

```bash
npm run dev
```

Open http://localhost:3000

## Make yourself an admin

After you create an account, run this SQL in Supabase:

```sql
update public.profiles set is_admin = true where id = '<YOUR_USER_ID>';
```

## Payments notes

- Deposits are created as `initiated` transactions.
- Wallet crediting should happen **only** after verification (webhook).
- For Paystack, set webhook URL to:
  - `https://YOUR_DOMAIN.com/api/webhooks/paystack`
- For Flutterwave, set webhook URL to:
  - `https://YOUR_DOMAIN.com/api/webhooks/flutterwave`

## Reseller API (MVP)

Generate an API key in **Dashboard → Profile → API Access**.

Example:

```bash
curl -H "x-api-key: YOUR_KEY" https://YOUR_DOMAIN.com/api/v1/services
```
