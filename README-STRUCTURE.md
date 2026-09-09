# Fabora Frontend Structure

This version reorganizes the existing storefront without changing the UI/design or business flow.

## Architecture

- `src/api/` — API client, integration adapter, and API entry point.
- `src/assets/` — imported application assets such as logos.
- `src/components/` — reusable shared UI components.
- `src/constants/` — shared constants, including API routes.
- `src/features/` — feature/domain modules. Each feature owns its components and API facade when needed.
- `src/hooks/` — shared application hooks.
- `src/layouts/` — application layouts.
- `src/lib/` — low-level library adapters.
- `src/pages/` — route-level page components only.
- `src/providers/` — React providers and application context.
- `src/routes/` — route definitions.
- `src/types/` — shared domain types.
- `src/utils/` — pure utilities and i18n setup.

## Integration boundary

The integration implementation remains behind the `src/api` entry point. Feature API folders provide thin domain-facing facades without duplicating business logic.

To connect the backend, update the API integration implementation and endpoint constants rather than changing page/component code.

## Verification

All relative imports were checked after the migration and resolved successfully.
A full TypeScript/Vite build could not be completed in this environment because the available `node_modules` does not include the required React/Babel type definitions.
