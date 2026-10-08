#!/usr/bin/env python3
"""Static build for 083083.com — refreshes the shared chrome on every page.
The pages in the repo root ARE the source. Edit the content between
<main id="main"> and </main> (and <title>/<meta description>) directly.
To change the banner, header, nav or footer site-wide, edit HEAD/FOOT below
and run:  python3 build.py
New page: copy any page, change title/description/main content, run build.
"""
import json, pathlib, re, datetime

ROOT = pathlib.Path(__file__).parent
SITE = "https://083083.com"
PUB = "ca-pub-6620975821265271"

NAV = [("index.html","Home"),("083-prefix.html","083 Prefix"),("number-decoder.html","Decoder"),
       ("dialing-codes.html","Dialing Codes"),("number-meaning.html","Meanings"),
       ("scam-safety.html","Scam Safety"),("business-phone.html","Business Phones"),
       ("videos.html","Videos"),("contests.html","Contests"),("support.html","Support")]

HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#0b0f17">
<meta property="og:type" content="website"><meta property="og:site_name" content="083083">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}"><meta property="og:image" content="{site}/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="google-adsense-account" content="{pub}">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<script>try{{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}}catch(e){{}}</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={pub}" crossorigin="anonymous"></script>
<script type="application/ld+json">{schema}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="interest" role="note">Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership — <a href="https://web.works/contact" target="_blank" rel="noopener">contact here</a></div>
<header class="site-head">
  <div class="wrap nav">
    <a class="brand" href="index.html" aria-label="083083 home"><span class="dot"></span>083<b>083</b></a>
    <ul class="menu" id="menu">{nav}</ul>
    <div class="head-cta">
      <button class="icon-btn" data-theme-toggle aria-label="Toggle light/dark theme"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>
      <a class="btn btn-primary btn-sm" href="get-quotes.html">Get free quotes</a>
      <button class="icon-btn burger" aria-label="Menu" aria-controls="menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    </div>
  </div>
</header>
<main id="main">
"""

FOOT = """</main>
<footer class="site-foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="index.html"><span class="dot"></span>083<b>083</b></a>
        <p class="muted" style="margin-top:12px">The independent guide to the 083 prefix, dialing codes, number meanings and call safety — plus free tools and matched business-phone quotes.</p>
        <p><a class="btn btn-ghost btn-sm" href="support.html">♥ Support the project</a></p>
      </div>
      <div><h4>Tools</h4><ul>
        <li><a href="number-decoder.html">Number decoder</a></li><li><a href="dialing-codes.html">Dialing calculator</a></li>
        <li><a href="number-meaning.html">Number meanings</a></li><li><a href="083-prefix.html">083 prefix guide</a></li></ul></div>
      <div><h4>Business</h4><ul>
        <li><a href="get-quotes.html">Get phone-system quotes</a></li><li><a href="business-phone.html">Buyer’s guide</a></li>
        <li><a href="advertise.html">Advertise &amp; sponsor</a></li><li><a href="https://web.works/contact" target="_blank" rel="noopener">Buy this domain</a></li></ul></div>
      <div><h4>Community</h4><ul>
        <li><a href="scam-safety.html#report">Report a scam call</a></li><li><a href="contests.html">Contests &amp; prizes</a></li>
        <li><a href="careers.html">Join the team</a></li><li><a href="contact.html">Contact</a></li></ul></div>
    </div>
    <div class="legal-note">
      <p><strong>Trademark &amp; copyright disclosure.</strong> “083083” is used on this site as a domain name and descriptive numeric identifier only. 083083.com is an independent publication and is not affiliated with, endorsed by or sponsored by any telecom operator, regulator, government body or brand named on this site — including Three Ireland, MTN, ComReg, ICASA, TRAI or any VoIP provider. All third-party names, marks and logos belong to their respective owners and are used only for identification (nominative use). Numbering facts are drawn from public numbering plans; content is original and © <span data-year></span> 083083.com. Numerology and cultural number lore are presented for cultural and entertainment interest, not as advice.</p>
      <p><a href="privacy.html">Privacy</a> · <a href="terms.html">Terms &amp; trademark</a> · <a href="disclaimer.html">Disclaimer</a> · <a href="sitemap.xml">Sitemap</a></p>
    </div>
  </div>
</footer>
<div class="sticky-cta"><a class="btn btn-primary btn-block" href="get-quotes.html">Free phone quotes</a><a class="btn btn-ghost" href="number-decoder.html" aria-label="Decode a number">#</a></div>
<script src="assets/js/config.js"></script>
<script src="assets/js/data.js"></script>
<script src="assets/js/main.js"></script>
</body>
</html>
"""

def meta(text, key):
    m = re.search(r"<!--%s:\s*(.*?)-->" % key, text, re.S)
    return m.group(1).strip() if m else ""

def build():
    pages = []
    for f in sorted(ROOT.glob("*.html")):
        raw = f.read_text(encoding="utf-8")
        title = re.search(r"<title>(.*?)</title>", raw, re.S).group(1)
        desc = re.search(r'<meta name="description" content="(.*?)">', raw, re.S).group(1)
        body = raw.split('<main id="main">\n',1)[1].rsplit("</main>",1)[0]
        sm_ = re.search(r'<script type="application/ld\+json">(.*?)</script>', raw, re.S)
        url = f"{SITE}/" + ("" if f.name == "index.html" else f.name)
        schema = (sm_.group(1) if sm_ else "") or json.dumps({
            "@context":"https://schema.org","@type":"WebPage","name":title,"description":desc,"url":url,
            "isPartOf":{"@type":"WebSite","name":"083083","url":SITE}}, ensure_ascii=False)
        nav = "".join(f'<li><a href="{h}">{t}</a></li>' for h,t in NAV)
        html = HEAD.format(title=title, desc=desc, url=url, site=SITE, pub=PUB, schema=schema, nav=nav) + body + FOOT
        (ROOT / f.name).write_text(html, encoding="utf-8")
        pages.append(f.name)
    today = datetime.date.today().isoformat()
    sm = ['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for p in pages:
        if p == "404.html": continue
        loc = f"{SITE}/" + ("" if p == "index.html" else p)
        sm.append(f"  <url><loc>{loc}</loc><lastmod>{today}</lastmod></url>")
    sm.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(sm) + "\n", encoding="utf-8")
    print("built", len(pages), "pages")

if __name__ == "__main__":
    build()
