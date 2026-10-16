# Avenza Business Growth — Website

The website for **Avenza Business Growth**: *Structure. Strategy. Sustainable Growth.*

It's a static site with no build step and no dependencies: plain HTML, CSS and JavaScript, using Google Fonts (Poppins and DM Sans).

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
| `assets/js/main.js` | Navigation, animations, tabs, workflow mockups, rendering and form logic |
| `assets/brand/` | SVG logos: primary (ivory), inverted (plum), horizontal, emblem, ABG monogram, favicon |
| `favicon.svg` | Site favicon (a copy of `assets/brand/favicon.svg`) |
| `public/images/arisha-portrait.jpeg` | Founder portrait |
| `docs/brand-reference/` | The approved brand moodboard, kept for reference only (it is not used as the logo) |
| `arisha_saleem_portfolio (1).html` | Arisha's earlier standalone portfolio page, left unchanged |

## Common edits

- **Prices:** edit `pricing` in `assets/js/content.js`.
- **Team photos:** put an image in `public/images/team/` and set that member's `image` path in `content.js`. While `image` is `null`, or if the file fails to load, the initials placeholder is shown. Portraits are cropped to 4:5.
- **Links** (booking, portfolio, Fiverr, LinkedIn, email): edit `links` and `brand.email` in `content.js`. Every button on the page updates.
- **Testimonials:** edit `testimonials` in `content.js`. Use only genuine reviews.

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

Headings use Poppins and body text uses DM Sans. Dusty pink is only used for text on plum or dark backgrounds, where the contrast is 5.6:1. On ivory it is decorative only, because the contrast there is too low for text.
