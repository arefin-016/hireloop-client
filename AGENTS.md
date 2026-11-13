<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hireloop

Single-package Next.js 16 app (not a monorepo). Essentially a fresh shadcn/ui template — most features are not built yet. `CLAUDE.md` is just `@AGENTS.md`; this file is the source of truth.

## Commands (npm — `package-lock.json`, not pnpm/yarn)

- `npm run dev` — dev server; re-writes the `nextjs-agent-rules` block above. Never delete that block from a diff.
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint flat config (`eslint-config-next`)
- `npm run format` — Prettier `--write` on `**/*.{ts,tsx}` **only** (other file types aren't auto-formatted)
- `npm run build` — production build

There is **no test runner and no CI workflow**. Verification gate is `npm run lint` + `npm run typecheck` — run both before finishing.

## Conventions that differ from defaults

- Prettier: **no semicolons**, double quotes, LF (`.prettierrc`). It also runs `prettier-plugin-tailwindcss` for `cn`/`cva` calls — run `npm run format` instead of hand-sorting Tailwind classes.
- Path alias `@/*` → repo root (`@/components/...`, `@/lib/...`).
- Tailwind **v4** via `@tailwindcss/postcss`: there is no `tailwind.config.*` file. Theme tokens live in `app/globals.css` (`@theme inline` + CSS variables) — edit there.
- shadcn style is `base-nova`: generated components use **Base UI** (`@base-ui/react`), not Radix. Add with `npx shadcn@latest add <name>` → `components/ui/`.
- `cn` is an npm package (dependency); `@/lib/utils` just re-exports it, and generated components often `import { cn } from "cn"` directly. Both are correct.
- `components.json` has `"rsc": true` — keep components as server components; add `"use client"` only where state/effects are needed (see `components/theme-provider.tsx`).

## Codebase state

- Entry points: `app/layout.tsx` (Geist fonts + `ThemeProvider` + site-wide `Navbar`), `app/page.tsx` (placeholder).
- Navbar lives in `components/navbar.tsx` (client component: shadcn `Button` + `Sheet` for the mobile menu).
- better-auth is wired: `lib/auth.ts` (server config), `lib/auth-client.ts` (react client), catch-all handler at `app/api/auth/[...all]/route.ts`. Auth needs a **local MongoDB** at the hardcoded `mongodb://localhost:27017` plus `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` / `BETTER_AUTH_URL` — no `.env*` file exists yet.
- Dark mode via `next-themes` (`class` attribute); `d` key toggles theme — implemented in `components/theme-provider.tsx`.
