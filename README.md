# shivagroup.org.in — Shiva Consultancy Group

Premium marketing website for **Shiva Consultancy Group** — *One Door Technology & Management Consultancy*.

Redesigned from the Google Stitch **"Heritage Tech"** design (project `5728787972259054343`) and re-skinned with the firm's real content (agribusiness · finance · strategy).

## Stack
- **Static HTML + Tailwind CDN** — no build step, opens by double-click
- Self-contained: all imagery in `assets/img/`, fonts via Google Fonts
- Shared chrome (header / mobile nav / footer) injected from `assets/scg.js`
- Design system in `assets/scg.css` (navy `#001F3F` / gold `#D4AF37`, Playfair Display + Inter)
- **Host:** GitHub Pages → custom domain `shivagroup.org.in` (DNS via Cloudflare)

## Pages
`index.html` (Home) · `about.html` · `services.html` · `team.html` · `insights.html` · `contact.html`

## Edit in one place
- **Nav, phone, email, address, socials:** the `SCG` object at the top of `assets/scg.js`
- **Colours / fonts / components:** `:root` and component classes in `assets/scg.css`
- **Page content:** the relevant `*.html` file

## Contact form
The enquiry form on `contact.html` opens WhatsApp or email pre-filled — no backend required.

## Local preview
Open `index.html` in any browser, or run `python3 -m http.server` in this folder.

---
Built by the SCG CTO desk. © Shiva Consultancy Group.
