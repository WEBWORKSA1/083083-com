# 083083.com — Phase-wise Build Prompts

Each phase is a self-contained prompt you can paste into Claude (or any coding agent). Phases 1–7 produce what is in this repo; phases 8–10 are the expansion path.

Global rules for every phase (paste once at the top of a session):
> Static site only (HTML/CSS/vanilla JS), hostable on GitHub Pages free plan. Domain 083083.com. AdSense client `ca-pub-6620975821265271`. Every page shows a top banner: "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership" linking to https://web.works/contact. All forms deliver to the owner's inbox through FormSubmit AJAX; the address must never appear in visible text, `mailto:` links or HTML attributes — store it encoded in `assets/js/config.js` and assemble it only at submit time. Never publish who owns a phone number. Include a trademark/copyright disclosure in every footer.

---

## Phase 1 — Foundation & design system
> Create the repo skeleton: `src/` page fragments, `build.py` that wraps each fragment in a shared head (SEO meta, OG/Twitter, canonical, JSON-LD, AdSense Auto Ads script, `google-adsense-account` meta, Google Fonts Space Grotesk + JetBrains Mono), interest banner, sticky header with 10-item nav + theme toggle + "Get free quotes" CTA + mobile burger, and a footer with four columns and the trademark disclosure. Write `assets/css/style.css` as a "switchboard" design system: dark ink background, amber + mint accents, monospace digits, light theme via `[data-theme=light]`, cards, grids, tables, forms, wizard, tiers, video, ad-slot, FAQ, sticky mobile CTA, reveal-on-scroll, reduced-motion support. Add `.nojekyll`, `robots.txt`, `ads.txt`, `manifest.webmanifest`, SVG favicon, 1200×630 OG image, and sitemap generation in build.py.

## Phase 2 — Number data & decoder engine
> Write `assets/js/data.js` with 44 countries (name, ISO, country code, exit code, trunk prefix, time zone), the known 083 usages (Ireland/Three, South Africa/MTN, India STD 083x), Chinese homophone readings for 0–9 and numerology meanings incl. master numbers 11/22/33. In `main.js` build `analyseNumber()`: detect +/00 international format and longest-matching country code, match 083 prefixes, compute distinct digits, longest repeat run, mirrored halves, palindrome, ascending steps, lucky-digit balance, a 1–100 memorability score, numerology root, and a pattern list. Render results as cards with a conic score ring and colour-coded digit tiles. Support `?n=` deep links and "try" chips.

## Phase 3 — Content pages (SEO)
> Build: Home (hero decoder, 083-in-3-countries cards, tools grid, business CTA + vanity-number form, "why 083083 is memorable", videos, contest + support teasers, FAQ, newsletter); 083 Prefix guide (TOC, quick-answer table, country sections, how-to-dial, safety, FAQ + FAQPage schema, sticky sidebar decoder); Number Decoder; Dialing Codes (calculator + sortable/filterable table + three rules); Number Meanings (digit grid, 083083 explainer, famous combinations table, economics, life-path calculator, email capture); Scam Safety (6 scam types, what-to-do, per-country official reporting table, report form). Use bylines, updated dates, breadcrumbs, and labelled ad slots after the intro and in sidebars.

## Phase 4 — Lead generation (primary revenue)
> Build `get-quotes.html`: a 6-step one-question-per-screen wizard (current system → users → features multi-select → timeline → country/postcode → contact with consent checkbox), progress bar, back link, trust line, "Almost finished!" copy. On submit, POST all answers as one JSON payload with a hot-lead subject, then show a success step with partner cards from `SITE_CONFIG.partners` (sponsored links when URLs are set). Build `business-phone.html` buyer's guide (system-type table, features, cost drivers, weighted scoring method, vanity numbers, checklist, advertiser disclosure) funnelling to the wizard. Add vanity-number request forms on Home.

## Phase 5 — Community, donations, contests, hiring, partnerships
> `support.html`: four brand-themed tiers ($8.30, $30.83, $83, $830.83), payment buttons driven by `SITE_CONFIG.payments` (Stripe, PayPal, Buy Me a Coffee, Ko-fi, UPI) that fall back to a pledge form, allocation bar (operations, promotion & marketing, hiring, contests & prizes, reserve). `contests.html`: three tracks, prizes, official rules, entry form. `careers.html`: roles + application form. `advertise.html`: sponsorship/advertising/partnership/domain acquisition + inquiry form. `contact.html`.

## Phase 6 — Monetisation wiring
> AdSense Auto Ads in every `<head>`; manual units injected only when slot IDs exist in `SITE_CONFIG.adSlots`; `ads.txt` with the publisher ID. YouTube: lite embeds (thumbnail → `youtube-nocookie` iframe on click) driven by `SITE_CONFIG.youtube.videos`, with a channel CTA fallback. GA4 `generate_lead` events fire if `gtag` exists.

## Phase 7 — Legal, QA, deploy
> Privacy (forms, AdSense cookies + opt-out links, YouTube, rights), Terms with full trademark & copyright disclosure, Disclaimer/advertiser disclosure, 404. QA: headless-browser screenshots desktop + mobile, run decoder and full wizard with the form endpoint mocked, grep the whole repo to prove the inbox address never appears in plain text. Push to `webworksa1/083083-com` on `main` and publish with GitHub Pages (branch `main`, root).

## Phase 8 — Programmatic SEO (scale)
> Extend build.py to generate `/number-meaning/{n}.html` for 0–9999 with a fixed template (meaning, Chinese reading, numerology, pattern, FAQ, prev/next), `/call/{from}-to-{to}.html` for every country pair, and `/prefix/{country}-{prefix}.html`. Add hub pages and include all in the sitemap (split into sitemap index files of ≤50k URLs).

## Phase 9 — Data depth & trust
> Expand to all ITU country codes with source citations and per-row "last verified" dates; add a public corrections log; add author/reviewer bios and an editorial-standards page.

## Phase 10 — Growth loops
> Monthly Scam-Call Alert built from aggregated reports; YouTube Shorts per guide embedded back into pages; shareable result cards (canvas → PNG) for decoded numbers; PWA offline cache for the tools; sponsor slot on the decoder.
