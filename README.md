# fabora Storefront

Premium editorial fashion storefront built with React + Vite, Tailwind CSS, Axios, TanStack React Query, React Router, Zod, React Hook Form, i18next and Lucide.

## API integration architecture

All storefront API integration lives under `src/api`.

```text
src/api/
  client.ts                  # Axios client + auth/country headers
  contracts.ts               # Stable facade imported by the UI
  integration/
    endpoints.ts             # All storefront endpoint paths
    incoming-data.ts         # API data models + isolated development fixtures
    index.ts                 # Integration functions and local development behavior
```

The UI imports only functions from `src/api/contracts.ts`. That file is intentionally a compatibility facade, so backend integration can remain confined to `src/api` without changing pages or components.

### How to connect the real API

1. Configure `VITE_API_BASE_URL` for the real API host, or set the base URL in `src/api/client.ts` if the deployment uses a fixed host.
2. Verify endpoint paths in `src/api/integration/endpoints.ts` against the backend contract.
3. Put request/response shape adjustments and business-specific mapping in `src/api/integration/index.ts`.
4. The UI does not need to be edited to switch from the isolated development fixtures to the real API.

When `VITE_API_BASE_URL` is not configured, `src/api/integration/incoming-data.ts` supplies isolated development fixtures through the integration layer so the storefront remains reviewable. No page, component, or utility imports dummy products directly.

## Run

```bash
npm install
npm run dev
```

## Current storefront endpoints

The integration layer covers catalog/product data, categories, cart operations, discount application, restock subscription, and authentication endpoints already used by the storefront. Endpoint paths are centralized in `src/api/integration/endpoints.ts`.
