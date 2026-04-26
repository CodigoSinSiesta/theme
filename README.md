# @codigosinsiesta/theme

Sistema de diseño **V4 "dark blueprint"** compartido por las presentaciones de [Código Sin Siesta](https://codigosinsiesta.github.io). Tokens CSS + chrome global de presentación + Tailwind preset, en un solo paquete.

> Origen: handoff de [Claude Design](https://claude.ai/design) — `Codigo sin siesta.zip`, sección "Dirección · Zine". Portado de `codigo-sin-siesta/project/src/css-system-v4.jsx`.

## Lo que aporta

- **Tokens CSS** completos: paleta azul cobalto sobre slate-900 (12 colores), neutros slate (8 variantes), semánticos `ok` / `warn` / `err` con `*-bg` y `*-bd` predefinidos, tipografías (`Space Grotesk` / `Inter` / `JetBrains Mono`), spacing/radii/transitions.
- **Chrome global de slide** listo para drop-in: top accent-bar 3px (gradiente cobalto→eléctrico→cielo), breadcrumb mono `código sin siesta / <deck> · NN/NN` con pulse-dot, footer `Hecho con ♥ · ←/→ · Esc`, padding global `.swiper-slide`.
- **Eyebrow V4** — barra horizontal 24×2px antes de cada `<span class="label">` de los slides, con variantes semánticas vía `data-accent="ok|warn|err"`.
- **5 componentes Svelte 5** importables (v0.2.0+): `Eyebrow`, `Callout`, `ToolCard`, `TerminalLine`, `QRCode`. Cubren los slide-types canónicos del kit V4.
- **Tailwind preset** con todos los tokens mapeados a `theme.extend.colors.csi.*`, fonts `font-csi*`, gradientes `bg-csi-accent-bar` y `bg-csi-highlight-text`.
- **`tokens` JS** para consumidores que necesitan los valores en runtime.

## Instalación

Mientras el paquete no está publicado en npm, los repos lo consumen vía git URL:

```bash
pnpm add github:CodigoSinSiesta/theme
# o npm/yarn equivalente
```

> Cuando se publique en npm, será `pnpm add @codigosinsiesta/theme`.

## Uso

### Astro / Vite / SvelteKit (CSS importado en global)

En `src/styles/global.css`:

```css
@import '@codigosinsiesta/theme/all.css';
/* ó: tokens y chrome por separado */
@import '@codigosinsiesta/theme/tokens.css';
@import '@codigosinsiesta/theme/chrome.css';
```

En el layout principal (`PresentationLayout.astro` o equivalente), añade el chrome HTML una sola vez:

```html
<body>
  <div class="slide-accent-bar" aria-hidden="true"></div>
  <div class="slide-breadcrumb" aria-hidden="true">
    <div class="crumbs">
      <span class="pulse-dot"></span>
      <span class="org">código sin siesta</span>
      <span class="sep">/</span>
      <span class="deck">tu-deck</span>
    </div>
    <div class="counter" id="slide-counter">01 / NN</div>
  </div>
  <div class="slide-footer" aria-hidden="true">
    <span>Hecho con <span class="heart">♥</span> por Código Sin Siesta · 2026</span>
    <span>← / → · Esc</span>
  </div>
  <slot />
</body>
```

Para que el counter se actualice dinámicamente con la slide activa, copia el `MutationObserver` del `taller-graphify-presentation` (mira `src/layouts/PresentationLayout.astro` ahí — observa `.swiper-slide-active` y actualiza `#slide-counter`).

### Tailwind CSS

En `tailwind.config.mjs`:

```js
import csiPreset from '@codigosinsiesta/theme/tailwind.preset.js';

export default {
  presets: [csiPreset],
  content: ['./src/**/*.{astro,svelte,vue,jsx,tsx,html,md,mdx}'],
};
```

Después en componentes:

```html
<div class="bg-csi-fondoElev border border-csi-borde text-csi-tinta font-csiDisplay">
  <h1 class="bg-csi-highlight-text bg-clip-text text-transparent">Hola</h1>
</div>
```

### Componentes Svelte 5 (v0.2.0+)

Requiere Svelte ≥ 5 en el proyecto consumidor (peerDep). Importa por barrel:

```svelte
<script>
  import { Eyebrow, Callout, ToolCard, TerminalLine, QRCode }
    from '@codigosinsiesta/theme/components';
</script>
```

O por path explícito (si tu bundler no resuelve subpath imports):

```svelte
<script>
  import Eyebrow from '@codigosinsiesta/theme/components/Eyebrow.svelte';
</script>
```

#### `<Eyebrow accent? color?>{children}</Eyebrow>`

Barra horizontal 24×2px + texto mono uppercase. Acompaña el header de cada slide.

```svelte
<Eyebrow>El problema</Eyebrow>
<Eyebrow accent="ok">Hands-on 1 · 25-30 min ⭐</Eyebrow>
<Eyebrow accent="warn" color="var(--color-warn)">Cuidado con esto</Eyebrow>
```

#### `<Callout kind? title? icon?>{children}</Callout>`

Aside box con kind semántico (`info` | `ok` | `warn` | `err`). Border-left coloreado + icono + título + body.

```svelte
<Callout kind="info" title="Pro tip">
  El paso 4 es <strong>no-negociable</strong>. Si saltas a ejecutar, pierdes el músculo.
</Callout>
```

#### `<ToolCard icon title subtitle? tag? accent? body? meta?>`

Card de herramienta con accent bar superior + icon box + título + tag pill + body + meta strip opcional.

```svelte
<ToolCard
  icon="🤖"
  title="Claude Code"
  subtitle="CLI agéntico"
  tag="CLI"
  accent="#2563eb"
  body="Terminal-first. Lee y edita el repo entero con criterio. Skills + subagentes nativos."
  meta={['Anthropic', 'CLI']}
/>
```

#### `<TerminalLine type? text>`

Una línea individual de terminal con tipos `cmd` | `out` | `ok` | `err` | `comment`. Compón varias dentro de tu propia caja negra:

```svelte
<div class="my-terminal">
  <TerminalLine type="comment" text="instala graphify" />
  <TerminalLine type="cmd"     text="uv tool install graphifyy" />
  <TerminalLine type="ok"      text="✓ installed graphifyy 0.8.2" />
  <TerminalLine type="cmd"     text="/graphify ." />
  <TerminalLine type="out"     text="detect: 24 files · 6,840 words" />
</div>
```

#### `<QRCode size? bgColor? fgColor? title? url?>`

QR placeholder 21×21 determinístico (NO escaneable; pensado como decoración para slides finales). Caption opcional.

```svelte
<QRCode
  size={220}
  title="Escanea para todo"
  url="codigosinsiesta.github.io/taller-graphify"
/>
```

> Para un QR escaneable real, genera un SVG con la lib `qrcode` y mételo dentro de la misma caja blanca. El componente sigue valiendo como contenedor estilizado.

### JS runtime

```js
import { tokens } from '@codigosinsiesta/theme';

console.log(tokens.electrico); // '#3b82f6'
```

## Estructura del repo

```
src/
├── tokens.css                 · variables CSS + reset mínimo + body + .card-glass
├── chrome.css                 · accent-bar + breadcrumb + footer + padding + eyebrow bar
├── all.css                    · tokens + chrome juntos
├── tailwind.preset.js         · preset Tailwind con namespace csi-*
├── index.js                   · export `tokens` para uso JS runtime
└── components/                · componentes Svelte 5 (v0.2.0+)
    ├── index.js               · barrel re-export
    ├── Eyebrow.svelte         · barra horizontal + texto mono uppercase
    ├── Callout.svelte         · aside box semántico (info/ok/warn/err)
    ├── ToolCard.svelte        · card con accent bar + icon box + tag pill
    ├── TerminalLine.svelte    · línea individual de terminal (cmd/out/ok/err/comment)
    └── QRCode.svelte          · placeholder 21×21 con caption
package.json
README.md
LICENSE
```

## Decks que lo consumen

- ⭐ [`taller-graphify-presentation`](https://github.com/CodigoSinSiesta/taller-graphify-presentation) — pilot del V4 (este es el repo que estrena el sistema).
- Pendiente migrar: `ai-presentation`, `coding-agents-presentation`, `subagents-skills-presentation`, `mcp-servers-presentation`, `spec-driven-development-presentation`, `skills-vs-subagents-presentation`, `taller-llm-wiki-presentation`.

## Convenciones

- **Nombres de tokens en español** (cobalto, electrico, cielo, fondo, tinta…) por coherencia con el handoff original del design y el lenguaje editorial de Código Sin Siesta.
- **Aliases legacy** mantenidos en `tokens.css` (`--color-base-dark`, `--color-accent-bright`, `--color-electric`, `--color-neutral-light`) para que los decks pre-V4 sigan funcionando durante la migración.
- **Versionado semver**: cualquier cambio que requiera ajustes en los decks consumidores → bump de minor o major.

## Roadmap

- [x] **v0.1.0** — primer release con tokens + chrome + Tailwind preset, consumido por `taller-graphify-presentation`.
- [x] **v0.2.0** — 5 componentes Svelte 5 (`Eyebrow`, `Callout`, `ToolCard`, `TerminalLine`, `QRCode`) cubriendo los slide-types canónicos del kit V4.
- [ ] **v0.3.0** — Storybook publicado en GitHub Pages (`codigosinsiesta.github.io/theme/`) para que los decks vean los componentes en vivo antes de adoptarlos.
- [ ] **v0.4.0** — slide-shells completos (`SlideHero`, `SlideTOC`, `SlideTerminal`, `SlideResources`...) que componen los componentes-átomo en layouts canónicos.
- [ ] **v1.0.0** — los 7 decks de la organización migrados, paridad visual completa, npm publish bajo `@codigosinsiesta/theme`.

## Licencia

MIT — incluida en `LICENSE`.
