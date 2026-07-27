# AB Fitness — abfitness.ae rebuild

SvelteKit 5 + Tailwind CSS 4 rebuild of the AB Fitness marketing site (Dubai, UAE). High-contrast boutique-gym layout system referencing rippedphl.com's structure — full-bleed sections, oversized display type, a full-screen overlay nav — built entirely on AB Fitness's own logo palette.

## Setup

```bash
npm install
cp .env.example .env   # optional — see "Lead capture endpoints" below
npm run dev
```

- `npm run dev` — dev server
- `npm run build` / `npm run preview` — production build + preview
- `npm run check` — svelte-check (TypeScript + Svelte diagnostics)

## What's real vs. placeholder

Most content in this rebuild is **real**, pulled directly from the live abfitness.ae (crawled across all its pages, not just the homepage) rather than invented. `static/media/gym/` holds every asset that site actually uses — trainer photos, class photos, facility icons, the hero video — fetched once so the new site doesn't depend on the old one staying online.

**Real, sourced from the live site — do not fabricate over these:**
- `src/lib/data/business.ts` — address, phone, mobile, WhatsApp number, email, geo coordinates, Maps/Waze links, socials, 24/7 hours
- `src/lib/data/trainers.ts` — all 12 coaches: real names, roles, experience, qualifications, specialties, and photos (`static/media/gym/*.png`). Trainer cards clip these to a parallelogram (matching the button shape); 7 of the 12 source photos were already circular cutouts on transparent PNG, the other 5 arrived as opaque-corner JPEGs — those were re-exported to transparent PNG via a geometric circle mask (same crop, alpha added) so the parallelogram clip doesn't reveal a white background behind the circle. Originals are untouched; martin/gopa/ramandeep/oscar/jaswinder's `.jpg` files are still in `static/media/gym/` alongside the derived `.png`.
- `src/lib/data/membership.ts` — real gym membership pricing (3/6/12-month terms) and personal-training package pricing, in AED
- `src/lib/data/locations.ts` — real facility list and amenity icons (`highlights`, `amenities`)
- `src/lib/data/classes.ts` — real AB Fitness photos for MMA, Strength, Cycle, and Kids formats
- Hero video/poster (`HomeHero.svelte`)

**Licensed stock, not AB Fitness's own photography — fine to ship, swap if real photos become available:**
- `src/lib/data/classes.ts` — Swim Fitness and Recovery & Physio use licensed Unsplash photos (`static/media/stock/`, `isStockImage: true`); the source site only has small facility icons for these formats, not full photos

**Still placeholder, swap before launch:**
- `src/lib/data/testimonials.ts` — Lorem Ipsum quotes, generic "AB Fitness Member" attribution. The source site's testimonials are screenshot images (`testi1–5.jpg`), not extractable text, and republishing user reviews as literal text without consent isn't something to do sight-unseen — write real testimonials once you have consented quotes, or embed the actual review screenshots/widgets
- `src/lib/data/timetable.ts` — sample weekly class grid; wire to the real booking system's feed
- `/privacy-policy` (`src/lib/i18n/locales/en.ts`, `privacyPolicy` key) — generic boilerplate structure/language, not legal advice; have UAE counsel review before launch (data-protection specifics, retention periods, and the effective date all need real sign-off)

Search the codebase for `isPlaceholderContent` / `isStockImage` to find every flagged record programmatically.

`static/media/gym/` mirrors the entire live `abfitness.ae/assets/` folder (~90 files — trainer photos, class/facility photos, event photos, partner logos, testimonial screenshots), not just the subset currently wired into a page. That's deliberate: it's the full raw material for building out remaining pages (events, partners, additional gallery content) without re-crawling the old site. Anything not referenced from `src/` today is unused but available — prune what you don't end up needing before deploying, since everything under `static/` ships as-is.

**Known issue:** the hero video is ~56MB, heavy for a hero asset — re-encode at a lower bitrate (H.264) and/or add a WebM/AV1 source before launch to protect the Lighthouse performance target.

## Ramadan / prayer-time-aware copy

`src/lib/utils/schedule.ts` gates a Ramadan notice (shown on `/schedule` and `/locations`) using **estimated** Gregorian date ranges for the next two Ramadans. These are public estimates, not moon-sighting-confirmed dates — re-confirm each year against the UAE General Authority of Islamic Affairs announcement and update `ESTIMATED_RAMADAN_PERIODS`. The notice copy itself is deliberately generic ("hours are adjusted, confirmed closer to the date") rather than fabricating specific times.

## Lead capture endpoints

Forms (pre-footer CTA, contact page, footer/home newsletter) post to `PUBLIC_LEAD_FORM_ENDPOINT` / `PUBLIC_NEWSLETTER_ENDPOINT` via `src/lib/utils/submitForm.ts`. With no endpoint configured (the default), a submission logs its payload to the console and resolves as successful — this lets the full UI/UX be built and tested before a real CRM/marketing endpoint exists. Set both in `.env` to wire up a real backend.

## i18n

English ships today. All UI copy lives in `src/lib/i18n/locales/en.ts` — no strings are hardcoded in components — specifically so a second locale is additive:

1. Add `src/lib/i18n/locales/ar.ts` matching the `Dictionary` type, with `meta.dir: 'rtl'`.
2. Register it in `src/lib/i18n/index.ts`'s `locales` map.
3. Resolve the real locale in `src/hooks.server.ts` (currently hardcoded to `defaultLocale`) — e.g. from a route param or cookie.

Layout uses logical CSS properties (`margin-inline`, `inset-inline`, Tailwind's `start-*`/`end-*`) throughout, so RTL flips automatically once `dir` changes — no layout rework needed. Do not machine-translate; the Arabic locale should be written by a native speaker.

## Shape system (parallelogram)

Every button, card, input, and photo frame in the app shares one 10deg lean — the "boutique gym" parallelogram look, angle-matched everywhere on purpose (a mismatch between e.g. buttons and cards was a real bug caught and fixed during development). Two techniques, picked per element based on one constraint: **can this element's content be wrapped in a counter-skew span?**

- **Text/UI chrome** (buttons, cards, nav tiles) — `.shape-lean` (`transform: skewX(-10deg)`) on the shape, `.shape-unlean` (`skewX(10deg)`) on an inner content wrapper to cancel it back upright. A transform holds an exact angle regardless of the element's height, unlike a fixed-pixel clip-path offset (see below). Both classes live in `src/app.css`.
- **Native form controls** (`input`/`textarea`/`select`) — can't use the skew pair: skewing the element would slant the browser's own rendering of the typed value, and there's no way to wrap just that text in a counter-skew span. These use the `parallelogram` utility class instead (clip-path, tuned to the field's actual measured height so it still lands on 10deg: `48px * tan(10deg) ≈ 8.5px`).
- **Photos** (trainer portraits, class photos) — same constraint as inputs (skewing would visually warp the image), so also clip-path. Aspect-ratio-locked, so a **percentage** offset stays exactly 10deg at any rendered size (`pct = aspect-ratio-height-factor * tan(10deg)`; e.g. 22% for the 4:5 trainer photos).

Where a clip-path shape has no fill of its own, a bare cut just trims content with nothing to make the edge look intentional. Those use a two-layer frame trick — an outer color layer clipped to the shape, inset a few px to reveal itself as a border around an inner, identically-clipped content layer (see `TrainerCard.svelte` for the pattern).

**The two Google Maps embeds are the one deliberate exception — plain rectangles, not parallelograms** (`LocationCard.svelte`, `contact/+page.svelte`). This was tried both ways: the map was originally clip-path'd like the photos above, tuned through several rounds of offset math to hit the same 10deg angle. It still had to be reverted, because the failure mode isn't about getting the offset right — Google's embed places its own UI (the business info popup, the "open in Maps" link, the attribution bar) wherever the map happens to be panned or zoomed to, with zero awareness of a custom clip-path. A cut sized correctly for the map tiles sliced straight through the popup's business name and address on a live screenshot. Any offset is one embed-layout shift away from cutting through content again, so it isn't a tunable value, it's an unsafe technique for this specific element.

**If you add a new shaped element**, work out which category it falls into (skewable content vs. native-rendered text vs. image vs. — like the map — third-party content you don't control the internal layout of) before copying a clip-path number from a sibling. A wrong height assumption is how the buttons/cards mismatch happened; assuming all clippable content is safe to clip is how the map bug happened.

## Typography

Two font families, split by role — body copy uses **Roboto** (`--font-sans`), display headlines use **Anton** (`--font-display`, applied via the `font-display` utility). Both are self-hosted (`src/lib/fonts/`, latin subset only, matching English-only content) rather than pulled from Google Fonts' CDN, for the same reason the rest of the site avoids third-party runtime dependencies — no external request, no FOUC risk from a slow third-party host. They live under `src/` (not `static/`) and are referenced from `app.css` by a relative `url()` on purpose, so Vite's asset pipeline fingerprints them and prefixes the deploy's base path automatically — see "Deployment" below.

Roboto is self-hosted as its actual **variable font** file (`roboto-latin-variable.woff2`, one file spanning the whole `wght` 100–900 axis), declared in `app.css` with a `font-weight: 100 900` range rather than one `@font-face` per static weight. Every weight utility in use (`font-medium`, `font-semibold`, `font-bold`, etc.) resolves to its real instance on that axis instead of the browser approximating or synthesizing a weight that isn't in the file.

Anton ships as a single weight (400) that's already at its maximum visual boldness by design. Every `font-display` call site pairs it with `font-normal`, not `font-black` — stacking Tailwind's 900 weight on top would ask the browser to synthesize a heavier weight that doesn't exist in the font file, which renders as smeared/fake-bold. If you add a new headline, copy that pairing (`font-display font-normal`), not `font-black` alone.

## Brand tokens

`src/lib/styles/tokens.css` is the only file allowed to contain a hex value. Every color elsewhere is a Tailwind utility resolving back to a token (mapped in `src/app.css`'s `@theme` block). WCAG 2.1 AA contrast pairs are documented as comments in `tokens.css` — read them before introducing a new color combination, especially before pairing `--brand-primary` or `--brand-secondary` directly against `--paper` (both fail contrast; they're designed to sit on `--ink` only).

## Accessibility notes

- Full-screen nav overlay and newsletter modal both trap focus and close on `Escape` (`src/lib/actions/focusTrap.ts`).
- FAQ accordion uses native `<details>/<summary>` for built-in keyboard support.
- All forms have associated `<label>`s, `aria-invalid`/`aria-describedby` wiring, and `role="alert"` error text.
- A skip-to-content link is the first focusable element on every page.
- Motion (scroll reveals, nav stagger) respects `prefers-reduced-motion`.

## Deployment

Deployed to **GitHub Pages** (`.github/workflows/deploy.yml`, builds and publishes on every push to `main`) via `@sveltejs/adapter-static` — the whole site is prerendered at build time (`src/routes/+layout.ts`), since Pages has no server runtime.

GitHub Pages serves a project repo like this one at `https://<user>.github.io/<repo>/` — a subpath, not the domain root — so every internal link, image, and font reference in the app is base-path-aware rather than hardcoded to `/`:

- Internal `<a href>`s go through `Button.svelte` (which prefixes any `href` starting with `/`) or import `base` from `$app/paths` directly.
- `static/`-served images (trainer photos, class photos, icons, the hero video) are prefixed with `base` at the point they're referenced in `src/lib/data/*.ts` and a couple of components (`HomeHero.svelte`, `Footer.svelte`).
- Self-hosted fonts live under `src/lib/fonts/` (not `static/fonts/`) specifically so `app.css`'s `url()` references can be relative — Vite treats a relative CSS `url()` as a build asset and fingerprints/base-prefixes it automatically, which does **not** happen for an absolute `/fonts/...` reference to a `static/` file.
- `static/.nojekyll` is required — without it, GitHub Pages runs the output through Jekyll, which ignores any folder starting with `_` and would 404 SvelteKit's own `_app/` asset directory.

The `BASE_PATH` env var (read in `vite.config.ts`) is what drives all of this — the deploy workflow sets it to `/abf` for the build; local dev/build leaves it unset and defaults to the root, which is why nothing about local development changed.

If you ever point a custom domain at this deployment instead (serving from the domain root), the base path can go back to `''` and none of the above breaks — it just becomes a no-op prefix.
