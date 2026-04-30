# Brand standard — `@codigosinsiesta/theme`

> Reglas de marca y validación heredadas del handoff `codigo-sin-siesta-design-system/reference/brand-standard.md` ([Claude Design](https://claude.ai/design)) y de `reference/DESIGN.md` (10 secciones del sistema V4 + audit). Toda presentación de Código Sin Siesta debería cumplirlas antes de publicar.

## Voz

- **Bilingüe, español-leading**. Spanish para narrativa; English solo para términos técnicos (`harness`, `skill`, `subagent`, `prompt`, `context`) y nombres de producto.
- **Directa, didáctica, peer-to-peer**. *tú*, nunca *usted*. *Nosotros* en framing inclusivo. *Yo* solo en el cierre.
- **Frases cortas. Slides densas. Negative space**. Una idea verificable por slide. Filler fuera.
- **Claims fuertes con evidencia al lado**. *"Mismo modelo. Mismo benchmark. **6× de diferencia en rendimiento**."*
- Em-dashes (`—`) liberales. Middle-dot (`·`) como separador. Real `×` y `−`, no `x`/`-`.

## Casing

- **Sentence case** para body y la mayoría de headings.
- **UPPERCASE + letter-spacing** SOLO para eyebrow labels, en JetBrains Mono con `letter-spacing: 0.12em–0.20em`.
- **Title case** para English proper nouns (`Claude Code`, `Spec-Driven Development`).
- **lowercase** para badges all-mono que nombran ficheros (`CLAUDE.md`, `AGENTS.md`).

## Visual fundamentals

- **Dark-first siempre**. `#0A1628` (deep navy) o `#0f172a` (slate-900 V4). Nunca blanco, nunca gris, nunca negro puro.
- **Glassmorphism para superficies**: `rgba(30, 58, 138, 0.15–0.40)` + `1px solid rgba(96, 165, 250, 0.20)` + `backdrop-filter: blur(10px)`. Nunca paneles opacos.
- **Acento + gradiente** azul cobalto → eléctrico → cielo (V4) o azul → eléctrico → violeta (sistema V5). Una frase highlight por headline. Violet jamás como fill.
- **Foreground**: `#FAF9F6` bone (V5) o `#f1f5f9` slate-100 (V4). `#FFFFFF` puro está prohibido.
- **Eyebrows**: barra 24×2px + texto mono uppercase, casi siempre con dot luminoso.
- **Brand mark**: `assets/logo-owl-bone.svg` arriba-izq o en el footer de cada slide. No omitir.

## Tipografía (4 familias, roles estrictos)

- `Space Grotesk` 800–900 — display, hero, h1, big numbers
- `Bricolage Grotesque` 700–800 — h2/h3 alt subheaders (V5)
- `Inter` o `IBM Plex Sans` 400–600 — body, párrafos, listas
- `JetBrains Mono` 500–700 — eyebrows, badges, code, counters

No mezclar roles. Body no baja de **24px** a slide-scale (1920×1080) o **16px** en preview.

## Animación

Funcional, nunca decorativa-por-decoración.

- `fadeUp`: `opacity 0→1`, `translateY(28–60px) → 0`, 600–800ms, `cubic-bezier(0.34, 1.56, 0.64, 1)`. Stagger 0.1s.
- `floatOrb`: `translateY(0 ↔ -25..-30px)`, 9–15s, ease-in-out infinite alternate.
- `moveGrid`: `background-position 0 → 60px 60px`, 25–30s linear infinite.
- Counter GSAP count-up 1.6s ease-out para reveals tipo `6×`.
- `pulse-dot`: opacity 1↔0.6 + scale 1↔0.85, 2s ease-in-out infinite.

## Iconografía

1. **Brand mark** = búho (`assets/logo-owl-{bone,electric,dark,head}.svg`). Nunca restilizar.
2. **UI/nav** = Heroicons v2 outline, stroke 1.5, 24×24, `currentColor`. Subset local en `src/icons/`.
3. **Contenido semántico** = emoji (legacy V4 quick-win) o Heroicons (preferido en producción).
4. Unicode chars como glifos: `×`, `−`, `▼`, `↓`, `↑`, `·`, `→`. Reales, no typeados.

## Forbidden

- Photography, raster imagery, hand-drawn illustrations, textures, grain.
- Backgrounds blancos (`#FFFFFF`) — `#FAF9F6` bone es lo más claro.
- Solid black `box-shadow` — siempre tintado (deep-navy alpha o blue alpha).
- Gradient overuse — solo en CTAs y `.hl` / highlight text span.
- Emoji decorativo (sin peso semántico) en producción.
- Corporate hedging, *usted*, marketing fluff, filler stats.

## Gate CMO + QA — bloqueantes (rechazo inmediato)

**Narrativa:**
- Tesis ambigua o contradictoria entre slides.
- Saltos lógicos sin transición comprensible.
- Cierre sin recomendación práctica.

**Visual:**
- Mezcla de paletas o estilos fuera del sistema visual definido.
- Problemas de legibilidad que afecten mensajes principales.
- Errores de layout en breakpoints críticos (mobile y desktop).
- Animaciones que rompen el ritmo de lectura.

**Técnico:**
- `pnpm build` y `pnpm test` deben pasar antes de publicar.
- README + guías reflejan el estado final publicado.

## Principio rector

> Claridad pedagógica y consistencia de marca por encima de velocidad de entrega.
> Si hay conflicto entre estética y comprensión, prevalece comprensión.
