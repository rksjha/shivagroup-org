# shivagroup.org.in — Handover Note (plain language)

**WHAT IT IS** — The new Shiva Consultancy Group website: a fast, modern, navy-and-gold
6-page site (Home, About, Services, Our Team, Insights, Contact). No WordPress, no database,
nothing that can be hacked — just simple web files.

**HOW TO OPEN IT**
- On your computer: double-click `index.html` in the `shivagroup-redesign` folder.
- Live (after go-live): **https://shivagroup.org.in**
- Source/backup: **https://github.com/rksjha/shivagroup-org**

**HOW TO USE / EDIT IT**
- Phone, email, address, menu, social links → edit the `SCG = { ... }` block at the top of
  `assets/scg.js` (one place changes the whole site).
- Page words → edit that page's file (e.g. `about.html`).
- Colours / fonts → `assets/scg.css`.
- Pictures → drop new images into `assets/img/` and keep the same file names.
- After any edit, the SCG CTO desk re-publishes it (one push) and it's live in ~1 minute.

**WHERE YOUR DATA LIVES** — There is no database. The Contact form simply opens WhatsApp or
email already filled in, so enquiries arrive on your phone/inbox. (If you later want enquiries
saved in a dashboard, we can switch on the Supabase lead-capture — about a half-day of work.)

**PUBLISHING BLOG POSTS** — The Insights page is a *live* blog. To publish:
1. Write your post on **rsjha.wordpress.com** (your WordPress.com blog — the familiar editor).
2. Hit Publish. That's it — it appears on `shivagroup.org.in/insights.html` automatically
   within a minute (the page pulls your latest posts from WordPress.com).
- The page de-duplicates near-identical titles and always shows a tidy "Read the blog" card
  even when there are no posts, so it never looks broken.
- Tidy-up tip: in WordPress.com → **Posts**, trash the old auto-generated "7 … Entrepreneurship
  Strategies" duplicates so only your real articles show.
- The 10 original posts from the old WordPress were **not** migrated (they were left behind in
  the retired site); the blog is forward-only from here.

**WHAT'S LEFT TO GO LIVE** — One DNS change in Cloudflare to point `shivagroup.org.in` at the
new site. Your Microsoft 365 **email is not affected** — we only change the website records.
See "Go-Live cutover" below.

---

## Go-Live cutover (Cloudflare) — exact, safe steps

In Cloudflare → `shivagroup.org.in` → **DNS → Records**:

**CHANGE these (website only):**
| Record | Name | Old value | New value | Proxy |
|--------|------|-----------|-----------|-------|
| A | `shivagroup.org.in` (root/@) | 104.21.20.40 / 172.67.191.81 | **185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153** (four A records) | **DNS only (grey cloud)** |
| AAAA | `shivagroup.org.in` (root/@) | the two existing IPv6 | **delete them** (or set GitHub's: 2606:50c0:8000::153 … 8003::153) | DNS only |
| CNAME | `www` | (proxied to root) | **rksjha.github.io** | **DNS only (grey cloud)** |

**DO NOT TOUCH (email + verification — leave exactly as-is):**
- `MX` → shivagroup-org-in.mail.protection.outlook.com
- `TXT` SPF → `v=spf1 include:spf.protection.outlook.com -all`
- `TXT` → `openai-domain-verification=...`
- `_dmarc` TXT → `v=DMARC1; p=reject; ...`
- `autodiscover`, `enterpriseregistration`, `enterpriseenrollment`, `lyncdiscover`/`sip`, and any `_sip`/`_sipfederationtls` SRV.

**Then, in GitHub** (repo `shivagroup-org` → Settings → Pages): the custom domain is already set
to `shivagroup.org.in` (via the CNAME file). Once DNS propagates (minutes), GitHub shows
"DNS check successful" and issues a free HTTPS certificate; tick **Enforce HTTPS**.

**After go-live:** the old WordPress on the VPS (`/opt/shivagroup-wp`) is no longer used and can
be stopped/decommissioned at leisure — keep it for a few days as a safety net first.

> Already verified: GitHub Pages is correctly serving this site for `shivagroup.org.in`
> (tested by Host header against the Pages servers — HTTP 200, correct homepage). The flip is safe.
