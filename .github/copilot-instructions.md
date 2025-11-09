<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# E‑Shop — Copilot Instructions (quick reference)

Purpose: Give an AI coding agent the minimal, actionable knowledge to be productive in this codebase. Keep edits small, preserve existing conventions, and point to concrete files/examples.

1) Big picture (why and where)
- Frontend only: this repo is the Next.js App (Next.js 16 / App Router, React 19) for an e‑commerce frontend. See `ARCHITECTURE.md` and `src/app/` for routing structure.
- The frontend calls four backend microservices (product, order, review, inventory) running on ports 8080–8083. Default envs live in `.env.local` and docs in `README.md` / `DEVELOPMENT.md`.
- React Compiler is enabled via `babel-plugin-react-compiler` for automatic optimizations.

2) Key locations (start here)
- Root scripts & runtime: `package.json` (scripts: `dev`, `build`, `start`, `lint`).
- Pages / routing: `src/app/` (App Router). Example: `src/app/products/page.tsx` and `src/app/products/[id]/page.tsx`.
- Components: `components/` (feature folders: `product/`, `cart/`, `review/`, and primitives in `components/ui/`). Use these when adding UI.
- API client layer: `lib/api/` with `client.ts` + service files (`products.ts`, `inventory.ts`, `orders.ts`, `reviews.ts`) — modify here for backend integration.
- Types: `lib/types/` for domain types (product, cart, order, review, inventory).
- State: `store/cart.ts` (Zustand). Cart persists to localStorage.

3) Developer workflows & commands (concrete)
- Install: `npm install`
- Dev server (hot reload): `npm run dev` → app available at http://localhost:3000
- Build: `npm run build` then `npm start` for production
- Lint: `npm run lint` (repo uses ESLint + `eslint-config-next`)
- Backend: start the microservices (outside this repo) via `docker-compose up -d` in the microservices root; the frontend expects the services on ports 8080/8081/8082/8083.

4) Project-specific conventions (do this, not generic rules)
- App Router pages live under `src/app/` and use the Next.js 16 file conventions. Add server components by default; add `'use client'` only inside components that use state/hooks/events. React 19 server components are the default.
- Naming: components are PascalCase (file name kebab-case). Example: `components/product/product-card.tsx` exports `ProductCard`.
- Styling: Tailwind v4 utilities with `cn()` helper in `lib/utils/cn.ts`. Prefer `cn()` when merging conditional classes.
- State: The cart store (`store/cart.ts`) persists to localStorage — updates must maintain the same action signatures (addItem, removeItem, updateQuantity, clearCart).
- API client: use `lib/api/client.ts` for HTTP behavior (interceptors, error mapping). All service wrappers call the client — prefer adding new endpoints in matching service files (e.g., `lib/api/products.ts`).
- Images: Use Next.js Image component with configured remote patterns for product images from backend (see `next.config.ts`).

5) Integration & network assumptions
- Local dev expects backend services reachable at the env vars shown in `.env.local` (e.g. `NEXT_PUBLIC_PRODUCT_SERVICE_URL=http://localhost:8080/api`). Do not hardcode URLs; use `process.env.NEXT_PUBLIC_*`.
- Keep CORS and error-handling expectations: errors returned by backend are mapped in `lib/api/client.ts` and surfaced to UI components as friendly messages.

6) Tests, CI, and missing pieces
- There are no tests committed (testing is listed as TODO). If you add tests, prefer `vitest` or `jest` and keep them co-located near logic (e.g., `components/.../__tests__` or `lib/api/__tests__`).
- CI: no GitHub Actions visible; avoid changing CI assumptions. If you add CI, include `npm run build && npm run lint` as a minimal pipeline.

7) Common tasks for an agent (examples)
- Add a new product API call:
  - Add function to `lib/api/products.ts` using `client.ts`.
  - Add/adjust types in `lib/types/product.ts`.
  - Update `src/app/products/page.tsx` to call the new method.
- Add a small UI component:
  - Create file in `components/ui/`, follow `Button`, `Card` patterns (see existing components).
  - Export/use `cn()` and ensure prop typing via `interface`.
- Fixing stock display bug:
  - Inspect `lib/api/inventory.ts` and `components/product/product-card.tsx`. Stock logic and label variants live in `components/ui/badge.tsx`.

8) What to avoid / preserve
- Don't convert server components to client unnecessarily. Only add `'use client'` if component uses hooks or browser APIs.
- Preserve API client conventions (centralized `client.ts`) and Zustand signatures — migrating to another store is a major change and should be proposed as its own PR.

9) Useful files to reference quickly
- `package.json` — scripts & deps
- `ARCHITECTURE.md` — data flows and service ports (good single-page overview)
- `DEVELOPMENT.md` — recommended local dev steps and conventions
- `lib/api/client.ts` — base HTTP client
- `store/cart.ts` — cart behavior and persistence
- `components/ui/` — base primitives to copy patterns from

10) Interaction style for PRs
- Keep changes small and self-contained. Each PR should include:
  - A short description referencing affected files
  - A minimal manual test plan (how to reproduce locally)
  - If backend changes are required, include sample responses or mocks

If any of these items are ambiguous, ask a single, focused question (e.g., which backend URL should be used for staging?).

-- End of instructions --
