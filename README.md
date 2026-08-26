# Acurat Website

Marketing site for Acurat — agentic AI for tax return review.
React 19 + Vite 7 + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle → dist/
npm run preview  # serve the built bundle
```

## Structure

```
src/
├─ main.jsx                  React entry
├─ App.jsx                   Page composition + modal provider
├─ index.css                 Tailwind import, design tokens (@theme), keyframes
├─ data/site.js              All page copy — content lives here, not in JSX
├─ context/
│  └─ DemoModalContext.jsx   Shared open/close state for the demo modal
├─ hooks/
│  ├─ useTypewriter.js       Hero headline typing effect (respects prefers-reduced-motion)
│  ├─ useLockBodyScroll.js   Ref-counted scroll lock for overlays
│  ├─ useOnClickOutside.js   Outside-click / Escape dismissal
│  └─ useDemoChoices.js      Fetches + caches the demo form dropdown options
├─ api/
│  ├─ endpoints.js           Every API URL, and nothing else
│  ├─ demoRequests.js        Choices GET + demo-request POST, field mapping
│  └─ index.js               Barrel re-export
├─ lib/
│  └─ cn.js                  className joiner
└─ components/
   ├─ icons/                 Inline SVG line icons
   ├─ ui/                    Primitives: Container, Section, Button, Logo, IconTile,
   │                         Modal, Field, Select, PhoneField, Checkbox
   └─ sections/              One component per page section
```

## Design tokens

Every colour, font and animation from the original static page is declared once in
`src/index.css` under `@theme`, which makes them available as ordinary Tailwind
utilities — `bg-green-faint`, `text-ink-secondary`, `border-border`, `font-mono`,
and so on. Change a token there and it propagates everywhere.

| Token group | Examples |
| --- | --- |
| Brand | `green`, `green-hover`, `green-light`, `green-faint` |
| Accents | `navy`, `gold`, `purple`, `teal` (each with `-light` / `-faint`) |
| Neutrals | `dark`, `ink`, `ink-secondary`, `ink-tertiary`, `light`, `border` |
| Type | `font-sans` (Plus Jakarta Sans), `font-mono` (JetBrains Mono) |

## Request a Demo

All CTAs (nav, hero, footer band) open one modal, wired through
`DemoModalContext`. The form is a two-column qualification layout that collapses
to a single column on mobile:

- First / last name, work email, firm name
- Tax software, practice management system, annual return volume
- Phone number, built on `react-phone-number-input` / libphonenumber-js:
  searchable country picker with SVG flags, format-as-you-type, and per-country
  validation. The stored value is E.164 (`+12015550123`).
- SMS opt-in with consent copy

Only **First name** and **Work email** are required; every other field is
optional. Client-side validation runs before submit: the two required fields,
email format, and a free-mail domain check on the *work* email. An optional
field is validated only once it has a value — a phone number that is entered
must pass `isValidPhoneNumber`, which checks it against the selected country's
real numbering plan rather than counting digits.

### API calls

Two requests, both against `VITE_API_BASE_URL` (default `https://dev-core.acurat.ai`):

**1. `GET /api/contact/demo-requests/choices/`** — fires the first time the modal
opens, never on page load. Populates the three dropdowns from
`data.tax_software`, `data.practice_management_system` and
`data.annual_return_volume`. The response is cached at module level, so
reopening the modal does not refetch. While it is in flight the selects show a
spinner and submit is disabled; if it fails, an inline banner offers a retry.

The `value` slug (`"drake"`) is what gets stored and submitted; the `label`
(`"Drake"`) is only ever displayed.

**2. `POST /api/contact/demo-requests/`** — fires on submit, as
`multipart/form-data`. `Content-Type` is intentionally left unset so the browser
can add the multipart boundary.

| Form field | API field |
| --- | --- |
| firstName | `first_name` **(required)** |
| lastName | `last_name` *(omitted when empty)* |
| email | `work_email` **(required)** |
| firmName | `firm_name` *(omitted when empty)* |
| taxSoftware | `tax_software` *(omitted when empty)* |
| pms | `practice_management_system` *(omitted when empty)* |
| returnVolume | `annual_return_volume` *(omitted when empty)* |
| phone | `phone_number` *(E.164, omitted when empty)* |
| smsOptIn | `sms_opt_in` *(`"true"` / `"false"`)* |

A `4xx` with `{ error: true, message, data: { work_email: [...] } }` puts the
message in the banner and each field error on its matching input.

Override the host with an env var if needed:

```bash
# .env.local
VITE_API_BASE_URL=https://your-host
```

## Responsive breakpoints

| Range | Behaviour |
| --- | --- |
| `< 640px` | Single-column everywhere; full-screen hamburger menu; stacked hero buttons; modal scrolls from the top |
| `640–1023px` | Two-column feature / audience / impact / step grids; two-column demo form |
| `≥ 1024px` | Three-column features, four-column audiences and steps, side-by-side About |

## Notes

- The original single-file page is kept at `legacy/index.html` for reference.
- Every dropdown is a custom listbox (`ui/Select.jsx`), not a native `<select>` —
  an OS-rendered option list cannot be themed. Full keyboard support: arrows,
  Home/End, type-ahead, Enter, Escape. Panels flip upward when they would run
  off the bottom of the viewport.
- Icons are inline SVG — no icon library, no external asset requests.
- The demo modal is code-split (`DemoModalMount.jsx`). The landing page ships
  ~69 kB gzipped; the phone metadata and country flags (~109 kB gzipped) only
  download when a visitor clicks a CTA.
- The modal traps focus, restores it on close, closes on overlay click and
  Escape, and locks body scroll while open.
