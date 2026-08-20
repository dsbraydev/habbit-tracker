# Style Guide — Dark/Futuristic Mobile App Shell

Derived from the HABITUS design references. This is a hard constraint for any UI work in this project, not a suggestion. Exact accent colors may change later — everything below is written so the palette can be swapped by editing tokens in one place, never by changing hardcoded values in components.

## Foundation

- Dark theme only. Near-black layered backgrounds: a base background layer and a slightly lighter card/surface layer on top of it.
- Elevation comes from glow (soft accent-colored blur behind/around active elements), not heavy drop shadows.
- Generous rounded corners on cards, buttons, and inputs (~20–24px radius).

## Color tokens

Defined as CSS custom properties in Tailwind 4's `@theme` block in `app/globals.css` — never hardcode a color value directly in a component. This is the single place to swap the palette later. Current values (purple/violet/blue-fuchsia default, confirmed with the user):

- `--color-bg: #090812` — base app background
- `--color-surface: #131320` / `--color-surface-hover: #1c1c2e` — card/panel background and its hover state
- `--color-border: #23233a` — subtle borders on cards/inputs
- `--color-text-primary: #f5f5f7` / `--color-text-secondary: #9999ad` — high-contrast heading text vs. muted label/caption text
- `--color-accent-from: #6366f1` / `--color-accent-via: #8b5cf6` / `--color-accent-to: #d946ef` — the gradient used for progress rings, primary buttons, active nav state, and glow effects
- `--color-success: #22c55e` — completed/checked state
- `--color-streak: #f97316` — flame/streak accent
- `--color-locked: #52525b` — locked/inactive state
- `--color-danger: #ef4444` — destructive actions only (e.g. delete-habit confirm). Reserved/status color, not part of the swappable brand accent trio — don't reuse it for anything else, same principle as `--color-success`/`--color-streak`.

`--color-bg` must stay in sync with the `themeColor` in `app/layout.tsx`'s `viewport` export — they're two separate places expressing the same value, not derived from each other. Update both together when the palette changes.

**Tailwind 4 notes learned while wiring this up:**
- Every `--color-*` token in `@theme` automatically gets `bg-`, `text-`, `border-`, `shadow-`, and gradient `from-`/`via-`/`to-` utilities for free — e.g. `shadow-accent-via/50` gives a glow effect directly, no need for arbitrary `theme()` CSS tricks.
- `bg-gradient-to-r`/`via-*`/`to-*` still work in this project's installed Tailwind (4.3.3) even though v4 introduced `bg-linear-*` naming — no need to switch.
- Avoid naming a token something that collides with a built-in Tailwind scale name (e.g. don't use `--color-base` — it would collide with the `text-base` font-size utility). This is why the background token is `bg`, not `base`.

## Typography

Font is **Space Grotesk** (`next/font/google`, wired up in `app/layout.tsx` as the `--font-space-grotesk` variable, mapped to `--font-sans` in `app/globals.css`, applied on `body`). Bold, high-contrast headers for stat numbers (percentages, streak counts); smaller muted labels/captions beneath them.

## Shared utilities

- `lib/cn.ts` exports a `cn()` helper (clsx + tailwind-merge) for conditional/merged classNames — reuse it rather than writing a new one per component.

## Component patterns

Standardize on these recurring patterns instead of inventing new ones per screen:

- **Progress ring/gauge** — circular or semi-circular, gradient stroke using the accent tokens, soft glow.
- **Icon badges** — rounded-square, solid-tint fill per category (e.g. `bg-accent-from/15 text-accent-from`), not the hexagonal-outline treatment an earlier reference set suggested — confirmed by the actual Home dashboard references, which consistently show solid rounded-square badges. As with the nav, write each item's badge class as a full static string (e.g. a `badgeClass` field per item) — dynamic interpolation won't be picked up by Tailwind. See the habit list in `app/(app)/home/page.tsx` for the reference implementation.
- **History calendar** — dot-grid, one dot per day, with a completed/partial/missed/today legend.
- **Progress chart** — gradient-filled line/area chart.
- **Segmented tabs** — for controls like Create/Edit or Daily/Weekdays/Weekends/Custom.
- **Bottom tab bar** — fixed, 5 items. Each item has its own active color rather than one shared accent, reusing the 5 existing hues (no new tokens): Home → `accent-via`, History → `accent-from`, Streaks → `streak` (matches the flame color used for streaks everywhere else), Stats → `success`, Profile → `accent-to`. Active state = two-stop gradient pill tint (`from-{color}/25 to-{color}/10`) + ambient glow (`shadow-lg shadow-{color}/50`) + a tight icon-level neon glow via `drop-shadow-[0_0_6px_var(--color-{name})]` (follows the icon's silhouette, unlike a box-shadow). Inactive items stay `text-text-secondary`, no glow. Since each item's classes vary by color, write them as full static Tailwind strings per item (e.g. in a `navItems` array) — dynamic string interpolation like `` `text-${color}` `` won't be picked up by Tailwind's compiler. See `components/bottom-nav.tsx` for the reference implementation.
- **Floating action button** — circular, gradient fill, for primary "add" actions.
- **Primary CTA button** — full-width, gradient fill.
- **Form inputs** — dark, rounded, subtle border.
- **Milestone/checklist rows** — trailing check icon (achieved) or lock icon (not yet reached).
- **Habit data + Create/Edit form** — `lib/habits-context.tsx` (`HabitsProvider`, provided at the root layout) is the single in-memory source of truth for the habit list — `useHabits()` gives `habits` plus `toggleHabit`/`addHabit`/`updateHabit`/`deleteHabit`. `components/habit-form.tsx` is the one shared form (title/note/icon/color/days) used by both `/create-habit` and `/edit-habit/[id]` — don't rebuild the form per screen, extend this component instead. `HabitRow`'s `href` prop links a row to its edit screen; omit it for read-only contexts (like History). This context is explicitly temporary scaffolding for the pre-Supabase phase — expect it to be replaced, not extended indefinitely, once real integration starts.
- **Destructive actions** — a two-tap confirm (button label changes, e.g. "Delete Habit" → "Tap again to confirm delete", plus a Cancel escape) rather than a browser `confirm()` dialog, which would break the in-theme dark UI. See the delete flow in `app/edit-habit/[id]/page.tsx`.
- **Hero background image** (auth-adjacent screens, e.g. Sign In) — statically `import` the asset directly (works from anywhere in the source tree, e.g. `@/assets/images/...` — it does not need to live in `public/`; verified against this Next.js build's own docs, and it still gets full `next/image` optimization: responsive `srcSet`, modern formats, no layout shift). Render at natural aspect ratio (no `fill`/`object-cover` cropping), anchored to the top of the screen. It's fine to scale it up uniformly (e.g. `w-[150%] max-w-none` with `relative left-1/2 -translate-x-1/2` to re-center it) and let the excess get cropped left/right — the page's outer `overflow-hidden` handles that, so it never causes real page overflow. Add a short `bg-gradient-to-t from-bg to-transparent` at the image's bottom edge so it fades into the solid `--color-bg` rather than cutting off sharply.

## Mobile app-shell rules

This is a Next.js app, but it must feel like a native mobile app, not a responsive website:

- Lock the layout to mobile width. Do not add desktop responsive breakpoints.
- `viewport-fit=cover` in the viewport meta, with safe-area padding via `env(safe-area-inset-*)` on any edge-anchored chrome (header, bottom nav). Already wired up as the `viewport` export in `app/layout.tsx` (`viewportFit: "cover"`, `maximumScale: 1`, `userScalable: false`, `colorScheme: "dark"`) — extend that export rather than adding a separate one.
- App-shell layout: optional fixed header + scrollable content region + fixed bottom tab bar. The content region scrolls; the shell chrome doesn't.
- Disable overscroll bounce and text-selection/tap-highlight on interactive chrome elements.
- Minimum 44px touch targets.
- No interaction that depends on `:hover` — every affordance must work on tap alone.

## PWA installability

Implemented — the app installs to a phone home screen and launches without browser chrome:

- `app/manifest.ts` (Next.js's built-in convention) — `name`/`short_name` "Habitus", `background_color`/`theme_color` both `#090812` (must stay in sync with `--color-bg`, same as the `viewport` export's `themeColor`), `display: "standalone"`, `start_url: "/"`, one 512×512 icon.
- `app/icon.tsx` / `app/apple-icon.tsx` — the app icon is **code-generated**, not an external image asset: `next/og`'s `ImageResponse` renders the dumbbell mark (via the shared `lib/app-icon.tsx` component, parameterized by size) on the `accent-from → accent-via → accent-to` gradient. Next.js auto-serves these at stable `/icon` and `/apple-icon` paths and auto-injects the `<link>` tags — no need to reference a hashed/generated URL manually (confirmed the base path works unqueried). Reuse this pattern (a shared sizeable mark component + thin per-size wrapper files) for any future icon needs rather than sourcing external image assets.
- `appleWebApp` in `app/layout.tsx`'s `metadata` export (`capable: true`, `title: "Habitus"`, `statusBarStyle: "black-translucent"`) — generates the `mobile-web-app-capable` and `apple-mobile-web-app-title`/`-status-bar-style` meta tags. Don't hand-write these tags separately; extend this field instead.
