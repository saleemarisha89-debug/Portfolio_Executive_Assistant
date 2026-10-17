# Avenza Business Growth — Website

The website for **Avenza Business Growth**: *Structure. Strategy. Sustainable Growth.*

It's a static site with no build step: plain HTML, CSS and JavaScript, using Google Fonts (Poppins and DM Sans). Scroll animation uses GSAP 3.13 with ScrollTrigger, which is included in `assets/vendor/gsap/`, so there is nothing to install.

## Run locally

```bash
npx http-server -p 8080 .     # or: python3 -m http.server 8080
```

Then open <http://localhost:8080/>. Opening `index.html` straight from disk also works.

## Structure

| Path | Purpose |
|---|---|
| `index.html` | The page itself, with every section and its semantic markup |
| `assets/css/avenza.css` | All styles. Brand colours are CSS variables at the top. |
| `assets/js/content.js` | **Editable content**: links, pricing, team, testimonials and the form endpoint |
| `assets/js/main.js` | Navigation, rendering, tabs, form logic, and the simpler animations used when scroll scenes are off |
| `assets/js/scenes.js` | Scroll-driven scenes: the pinned hero and process scenes, scroll-linked workflow mockups, parallax and section colour transitions |
| `assets/vendor/gsap/` | GSAP and ScrollTrigger 3.13.0, under GreenSock's standard no-charge licence |
| `assets/brand/` | SVG logos: primary (ivory), inverted (plum), horizontal, emblem, ABG monogram, favicon |
| `favicon.svg` | Site favicon (a copy of `assets/brand/favicon.svg`) |
| `public/images/arisha-portrait.jpeg` | Founder portrait |
| `docs/brand-reference/` | The approved brand moodboard, kept for reference only (it is not used as the logo) |
| `arisha_saleem_portfolio (1).html` | Arisha's earlier standalone portfolio page, left unchanged |

## Common edits

- **Prices:** edit `pricing` in `assets/js/content.js`.
- **Team photos:** portraits live in `public/images/team/`, and each member's `image` path is set in `content.js`. If `image` is `null`, or the file fails to load, an initials placeholder is shown. Portraits are cropped to 4:5.
- **Links** (booking, LinkedIn, email): edit `links` and `brand.email` in `content.js`. Every button on the page updates. LinkedIn shows as "coming soon" while its URL is empty, and becomes a real link once you add one.
- **Reviews:** edit `testimonials` in `content.js`. Each review has `for` (the team member), `name` (the reviewer's username, or empty if unknown), `rating` (out of 5, or `null` if unknown) and the verbatim `quote`.

## Business Growth Review form — needs setup before launch

No form service is connected yet. Until one is, the form still validates every field. On submit it does **not** pretend to send anything. Instead it tells the visitor that online submission isn't connected, and offers:

- a one-click email draft with their answers filled in, and
- the booking link.

To connect a service, set `reviewForm.endpoint` in `content.js` to a URL that accepts a JSON `POST` and returns a 2xx status on success. A Formspree form URL, `https://formspree.io/f/xxxxxxx`, is one example. The confirmation screen appears only after the endpoint returns a success response.

## Brand

| Colour | HEX |
|---|---|
| Primary Plum | `#49304A` |
| Dark Text | `#0D080D` |
| Dusty Pink | `#D9A7B8` |
| Warm Ivory | `#F4EFE9` |

Headings use Poppins Black and body text uses DM Sans Medium. The site is dark-first: dark and plum sections, ivory for interface mockups, cards and the form, and dusty pink for highlights. Dusty pink is only used for text on plum or dark backgrounds, where the contrast is at least 5.6:1.

## Scroll experience

- **Hero (desktop):** the hero pins briefly while scattered tasks fly into the workspace, the window straightens and the side panels dock.
- **"Work has a shape":** the task board organizes itself as you scroll.
- **Workflows:** four chapters (pipeline, CRM, project board, roadmap) animate with scroll, beside a sticky index.
- **How Avenza works (desktop):** this section pins while the four steps play through. On mobile the steps highlight one by one, without pinning.
- **Section colours:** the background cross-fades between dark, deep plum and plum.

Nothing hijacks scrolling. Pins use native scroll and release on their own. Visitors who ask their device for reduced motion get a static page with no pins and all content visible. If GSAP fails to load, the page falls back to simple fade-ins.
