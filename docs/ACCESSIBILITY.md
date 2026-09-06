# Accessibility

Target: WCAG 2.2 AA.

## Color and color-blindness

The site commits to a single dark theme (see
`client/src/styles/tokens.css`) chosen for contrast, not decoration:

- Body text (`#F5F7FA` / `#B8C1CC`) on the background (`#0B0F14`) and
  surfaces (`#151B23`, `#202833`) exceeds WCAG AA contrast ratios
  (4.5:1 for normal text, 3:1 for large text) at every combination used.
- **No information is ever communicated by color alone.** The `Badge`
  component (`client/src/components/ui/Badge.tsx`) pairs every semantic
  tone with a distinct **border style** (solid/dashed/double) in
  addition to color, plus a text label — so success/warning/error
  remain distinguishable under deuteranopia, protanopia, and
  tritanopia, and even in grayscale printing.
- Interactive states (hover, focus, active) change more than hue:
  focus uses a 3px outline (see below), hover changes both color and
  background/elevation.
- The current position badge on the Experience page reads "● Current
  position" — a filled circle glyph plus text, not color alone.

## Focus management

- `:focus-visible` is styled globally with a 3px solid outline in the
  primary accent color plus 2px offset (`client/src/styles/global.css`)
  and is never suppressed anywhere in the codebase.
- A skip-to-content link (`.skip-link`) is the first focusable element
  on every page, jumping to `#main-content`.
- The mobile navigation panel traps focus visually within a full-screen
  overlay and closes on route change; the menu button exposes
  `aria-expanded` and `aria-controls`.

## Semantic HTML and ARIA

- One `<h1>` per page, logical `<h2>`/`<h3>` nesting via the shared
  `Section` component — never skipped levels.
- Landmarks: `<header>`, `<nav aria-label="Primary">`, `<main
  id="main-content">`, `<footer>`.
- Timelines (Education, Experience, Presentations, Achievements) use
  `<ol>` — order is semantically meaningful (chronological).
- Loading states use `role="status"` + `aria-live="polite"` with a
  visually-hidden text label (`LoadingState.tsx`); error states use
  `role="alert"` (`ErrorState.tsx`).
- The contact form's honeypot field is hidden via CSS clipping (not
  `display:none`, which some assistive tech and bots both skip
  inconsistently) plus `tabIndex={-1}` and `aria-hidden="true"`, so it
  never reaches keyboard or screen-reader users.
- Every form field has a associated `<label>`, `aria-invalid` when in
  error, and `aria-describedby` pointing at its error message.

## Images and alt text

- The profile photograph (once supplied) renders with descriptive alt
  text (`Portrait of Dr. Ashok Malhi`); until then, the placeholder
  state uses `role="img"` with an equivalent `aria-label` rather than a
  bare decorative icon (`ProfileImage.tsx`).
- Decorative icons (chevrons, the empty-state icon, badge icons) use
  `aria-hidden="true"` so they don't clutter screen-reader output.

## Keyboard and touch targets

- All interactive elements (nav links, buttons, form fields, the
  mobile menu button) have a minimum 44×44px hit area, meeting WCAG
  2.2's target-size guidance and standard mobile touch-target
  recommendations.
- Every interactive element is reachable and operable via keyboard
  alone; no functionality depends on hover or drag.

## Motion

- `prefers-reduced-motion: reduce` is respected globally: the loading
  spinner stops animating (falls back to a static ring), card
  hover-lift and smooth scrolling are disabled, and all transition
  durations collapse to near-zero (`tokens.css`, `global.css`).

## Forms

- Client-side validation messages are specific ("Please enter a valid
  email address," not just "invalid") and programmatically associated
  with their field.
- Server-side validation (Zod) is the source of truth; client-side
  validation is a UX convenience, never the only check.

## Testing performed

- Manual keyboard-only navigation walkthrough of every route.
- Automated color-contrast verification of the token palette against
  WCAG AA thresholds for the documented text/background pairs.
- Reduced-motion media query verified in code (see `global.css`).

## Known follow-ups

- A full automated axe-core / Lighthouse accessibility audit against a
  running instance (with a live database) is recommended before
  production launch — see docs/DEPLOYMENT.md's testing checklist. This
  sandboxed build environment could not reach a live database to run
  that full end-to-end audit (see docs/DEPLOYMENT.md, "Environment
  limitations").
