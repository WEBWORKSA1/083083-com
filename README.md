# 083083.com — Number Intelligence Hub

Free tools that decode numbers — the 083 prefix (Ireland, South Africa, India), international dialing, cultural number meanings and scam-call safety — monetised with Google AdSense, YouTube, a business-phone lead-generation funnel, sponsorships and donations.

Pure static HTML/CSS/JS. Hosts free on GitHub Pages.

## Structure
```
*.html            the pages (edit content between <main> and </main>)
build.py          refreshes the shared banner/header/footer on every page + sitemap.xml
assets/css/       design system
assets/js/config.js   ← ONE file to configure ads, payments, videos, partners
assets/js/data.js     country codes, 083 prefixes, digit lore
assets/js/main.js     decoder, dialing calculator, quote wizard, forms, donations, videos
docs/RESEARCH.md      research findings + business case
docs/BUILD-PROMPTS.md phase-wise build prompts
```
Edit a page's `<main>` content directly. To change the banner/nav/footer site-wide, edit `HEAD`/`FOOT` in `build.py` and run `python3 build.py`.

## Go-live checklist
1. **GitHub Pages:** Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
2. **Custom domain:** add `083083.com` in Settings → Pages → Custom domain (this creates a `CNAME` file). At your registrar: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` CNAME → `webworksa1.github.io`. Tick *Enforce HTTPS*.
3. **Forms:** submit any form once on the live site; FormSubmit sends a one-time activation email to the inbox. Click it. Then paste the random alias FormSubmit gives you into `formAlias` in `config.js` so the address is no longer even encoded in the source.
4. **AdSense:** add the site in AdSense (`ads.txt` is already at the root — it only counts on the custom domain). Turn on Auto Ads. Enable the Google-certified consent message (Privacy & messaging) for EEA/UK.
5. **Payments:** paste Stripe / PayPal / Buy Me a Coffee / Ko-fi / UPI links into `config.js` → `payments`.
6. **YouTube:** add your channel URL and video IDs in `config.js` → `youtube`.
7. **Lead partners:** add referral URLs in `config.js` → `partners`.

## Trademark & copyright
"083083" is used as a domain name and descriptive numeric identifier only. No affiliation with any operator, regulator or brand named on the site. Third-party names are used nominatively. Original content © 083083.com.
