# fabora Storefront

Premium editorial fashion storefront built with React + Vite, Tailwind CSS, Axios, TanStack React Query, React Router, Zod, React Hook Form, i18next and Lucide.

## Structure

```text
asset/
  icons/
  images/
  style/
api/
component/
pages/
layout/
utils/
context/
src/
```

## Run

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to the API host. The provided API contract intentionally has no server URL, so the host is configured at runtime.

## API contract

`api/contracts.ts` maps the storefront to the uploaded fabora API contract: catalog, product details, categories, cart, discount and local authentication/reset-password endpoints. The project sends the `x-country-code` header (`EG` / `AE`) and attaches a Bearer token from client session state.

The catalog/product UI includes local visual fallback data so the interface remains reviewable before the backend is configured. Mutating cart/auth actions use the API contract directly and surface failures through toast notifications.

## UX / architecture

- React Query is used for server state.
- Context is limited to auth session, locale, country and cart badge state.
- React Hook Form + Zod validate auth forms.
- i18next supports EN/AR and switches the document direction for RTL.
- Routes, images and product views are designed for lazy-friendly composition and skeleton loading states.
- `react-helmet-async` supplies page-level SEO metadata.
