# UI kit demo — Código Sin Siesta theme

> Vanilla-HTML reference deck showing the V4 design system in action — no Svelte, no build step. Open `index.html` directly in a browser or via a static server.

This example demonstrates the **classic V4 wireframe chrome** variant: owl mark + "CÓDIGO SIN SIESTA" wordmark top-left, deck pill top-right, lowercase domain bottom-left, slide counter bottom-right. It deliberately overrides the canonical `chrome.css` (which provides the 3px gradient top bar + breadcrumb) so you can compare both chrome patterns side-by-side and choose the one that fits your deck.

## What it shows

8 canonical V4 slide types in one deck:

| # | Slide type | What it demonstrates |
|---|---|---|
| 01 | **Hero / Cover** | Owl + wordmark chrome, glow-dot eyebrow, hero title with `.highlight` gradient on last word, tool pills, glass author card |
| 02 | **TOC** | Chapter cards grid with `is-current` and `is-past` states |
| 03 | **Statement** | Big tesis with one `.highlight` word + source rule |
| 04 | **Stats** | 4 stat cards with semantic top-borders (`ok`/`warn`/`err`/`electrico`) + auto-coloured trends + warn callout |
| 05 | **Section divider** | Giant gradient numeral + kicker + h1 with highlight |
| 06 | **Terminal hands-on** | Mac-window terminal with `cmd`/`out`/`ok`/`comment` line types + narration column + info callout |
| 07 | **Callouts gallery** | All 4 callout kinds (`info`, `ok`, `warn`, `err`) in one view |
| 08 | **Resources / QR** | Link rows + QR placeholder + closing CTA |

## How to use

```bash
# from theme repo root:
cd examples/ui-kit-deck
python3 -m http.server 8080
# open http://localhost:8080
```

Or just `open index.html` (some browsers block local SVG imports — use the server if so).

Keyboard:
- `←` / `→` — prev / next slide
- `Esc` — return to first slide
- `R` — reset
- `P` — print as PDF (each slide = one page)

## Adapting to your own deck

1. **Start from `index.html`** — copy and rename. Each `<section class="swiper-slide">` is one slide; replace the bodies with your content.
2. **Keep the chrome divs** at the top of every slide (`.deck-mark`, `.deck-pill`, `.deck-domain`, `.deck-counter`) — they position absolutely inside each slide so you can also vary the deck name per-section.
3. **Use the `.eyebrow > .glow-dot + text` pattern** for every slide opener. The glow-dot pulses (2s ease-in-out).
4. **Wrap one accent word per heading in `<span class="highlight">…</span>`** for the blue→sky→violet gradient. Never use violet as a solid fill — only inside the gradient.

## Canonical alternative

If you'd rather use the **production chrome** (`src/chrome.css` — 3px top accent bar + breadcrumb + footer), see the [taller-graphify-presentation](https://github.com/CodigoSinSiesta/taller-graphify-presentation) pilot deck or any of the canonical `SlideHero`/`SlideTOC`/etc Svelte shells. This example is intended as a **vanilla-HTML** option and as a **wireframe-faithful** reproduction of the V4 designs shipped in the Claude Design handoff.

## Files

- `index.html` — the deck markup (no JS dependencies beyond `deck-stage.js`)
- `deck.css` — extends `src/tokens.css`; defines local chrome + per-slide-type layouts
- `deck-stage.js` — vanilla web component handling scaling, keyboard nav, print-to-PDF (vendored copy; the canonical version lives upstream)
