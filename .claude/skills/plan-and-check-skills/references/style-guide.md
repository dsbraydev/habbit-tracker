# Style Guide — Dark/Futuristic Mobile App Shell

Derived from the HABITUS design references. This is a hard constraint for any UI work in this project, not a suggestion. Exact accent colors may change later — everything below is written so the palette can be swapped by editing tokens in one place, never by changing hardcoded values in components.

## Foundation

- Dark theme only. Near-black layered backgrounds: a base background layer and a slightly lighter card/surface layer on top of it.
- Elevation comes from glow (soft accent-colored blur behind/around active elements), not heavy drop shadows.
- Generous rounded corners on cards, buttons, and inputs (~20–24px radius).

## Color tokens

Define these as CSS custom properties in Tailwind 4's `@theme` block in `app/globals.css` — never hardcode a color value directly in a component. This is the single place to swap the palette later.

- `--color-bg` — base app background (near-black)
- `--color-surface` — card/panel background (slightly lighter than bg)
- `--color-text-primary` / `--color-text-secondary` — high-contrast heading text vs. muted label/caption text
- `--color-accent-from` / `--color-accent-via` / `--color-accent-to` — the gradient used for progress rings, primary buttons, active nav state, and glow effects. Default: purple → violet → blue/fuchsia (indigo/violet/fuchsia family), the thread consistent across both design references.
- `--color-success` — completed/checked state (green)
- `--color-streak` — flame/streak accent (orange)
- `--color-locked` — locked/inactive state (neutral gray)

## Typography

Reuse the existing Geist font setup in `app/layout.tsx`. Bold, high-contrast headers for stat numbers (percentages, streak counts); smaller muted labels/captions beneath them.

## Component patterns

Standardize on these recurring patterns instead of inventing new ones per screen:

- **Progress ring/gauge** — circular or semi-circular, gradient stroke using the accent tokens, soft glow.
- **Icon badges** — hexagonal outline per habit category, soft glow, tinted per category.
- **History calendar** — dot-grid, one dot per day, with a completed/partial/missed/today legend.
- **Progress chart** — gradient-filled line/area chart.
- **Segmented tabs** — for controls like Create/Edit or Daily/Weekdays/Weekends/Custom.
- **Bottom tab bar** — fixed, 5 items, highlighted active state.
- **Floating action button** — circular, gradient fill, for primary "add" actions.
- **Primary CTA button** — full-width, gradient fill.
- **Form inputs** — dark, rounded, subtle border.
- **Milestone/checklist rows** — trailing check icon (achieved) or lock icon (not yet reached).

## Mobile app-shell rules

This is a Next.js app, but it must feel like a native mobile app, not a responsive website:

- Lock the layout to mobile width. Do not add desktop responsive breakpoints.
- `viewport-fit=cover` in the viewport meta, with safe-area padding via `env(safe-area-inset-*)` on any edge-anchored chrome (header, bottom nav).
- App-shell layout: optional fixed header + scrollable content region + fixed bottom tab bar. The content region scrolls; the shell chrome doesn't.
- Disable overscroll bounce and text-selection/tap-highlight on interactive chrome elements.
- Minimum 44px touch targets.
- No interaction that depends on `:hover` — every affordance must work on tap alone.

## PWA installability

The app must be installable to a phone home screen and launch without browser chrome:

- A manifest (Next.js's `app/manifest.ts` convention, or `public/manifest.json` if that convention doesn't apply in this Next.js version — verify against `node_modules/next/dist/docs/` per this project's AGENTS.md rule before implementing) with `name`, `short_name`, `theme_color`/`background_color` matched to the dark theme, icons, `display: "standalone"`, and `start_url`.
- `apple-mobile-web-app-capable` and `apple-touch-icon` meta tags in the root layout for iOS home-screen installs.
