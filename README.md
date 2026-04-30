# @codigosinsiesta/theme

Sistema de diseño **V4 "dark blueprint"** compartido por las presentaciones de [Código Sin Siesta](https://codigosinsiesta.github.io). Tokens CSS + chrome global + Tailwind preset + componentes Svelte 5 + slide-shells canónicos, en un solo paquete.

📖 **Docs site (Storybook)**: [codigosinsiesta.github.io/theme](https://codigosinsiesta.github.io/theme/) — los 6 componentes-átomo + 5 slide-shells navegables con preview en vivo + tabla de props + ejemplos de código.

> Origen: handoff de [Claude Design](https://claude.ai/design) — `Codigo sin siesta.zip`, sección "Dirección · Zine". Portado de `codigo-sin-siesta/project/src/css-system-v4.jsx`.

## Lo que aporta

- **Tokens CSS** completos: paleta azul cobalto sobre slate-900 (12 colores), neutros slate (8 variantes), semánticos `ok` / `warn` / `err` con `*-bg` y `*-bd` predefinidos, tipografías (`Space Grotesk` / `Inter` / `JetBrains Mono`), spacing/radii/transitions.
- **Chrome global de slide** listo para drop-in: top accent-bar 3px (gradiente cobalto→eléctrico→cielo), breadcrumb mono `código sin siesta / <deck> · NN/NN` con pulse-dot, footer `Hecho con ♥ · ←/→ · Esc`, padding global `.swiper-slide`.
- **Eyebrow V4** — barra horizontal 24×2px antes de cada `<span class="label">` de los slides, con variantes semánticas vía `data-accent="ok|warn|err"`.
- **6 componentes Svelte 5** importables (v0.2.0+): `Eyebrow`, `Callout`, `ToolCard`, `TerminalLine`, `TerminalWindow`, `QRCode`. Cubren los átomos del kit V4.
- **26 slide-shells canónicos** importables (v0.7.0+): `SlideShell`, `SlideHero`, `SlideTOC`, `SlideTerminal`, `SlideResources`, `SlideStatement`, `SlideCompare`, `SlideStats`, `SlideDiagram`, `SlideCode`, `SlideList`, `SlidePatternGrid`, `SlideDecisionTable`, `SlidePipeline`, `SlideHandsOn`, `SlideSection`, `SlideQuote`, `SlideWhoAmI`, `SlideToolsGrid`, `SlideEquation`, `SlideLayerStack`, `SlideNestedEras`, `SlideCodeCompare`, `SlideAccentCards`, `SlideTriada`, `SlideDidactic`. Cubren el kit V4 completo + los 16 patrones del audit V5 (Tier 1/2/3) + 4 layouts editoriales residuales (Section/Quote/WhoAmI/ToolsGrid). Layouts pixel-perfect, props-driven.
- **Brand assets** importables (v0.6.0+): `assets/logo-owl-bone.svg` · `logo-owl-electric.svg` · `logo-owl-dark.svg` · `logo-owl-head.svg` · `logo-wordmark.svg` — la marca real del búho de Código Sin Siesta, en 4 variantes para fondos oscuros/claros/cobalto + lockup horizontal.
- **Iconografía Heroicons** local (v0.6.0+): subset de 13 SVG outline en `icons/` para chrome de navegación (`chevron-left/right`, `bars-3`, `x-mark`) y contenido (`cpu-chip`, `wrench-screwdriver`, `magnifying-glass`, `light-bulb`, `book-open`, `bookmark`, `check-circle`, `puzzle-piece`, `sparkles`). Stroke 1.5, `currentColor`.
- **Brand standard** (`BRAND.md`) — gate CMO+QA con reglas de voz, casing, visual fundamentals, iconografía y bloqueantes de validación. Heredado del handoff oficial de Claude Design.
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

### Slide-shells canónicos (v0.3.0+)

Para slides estandar — pásale props con el contenido y obtienes un layout
pixel-perfect del kit V4. Composición de los componentes-átomo internamente.

```svelte
<script>
  import {
    // v0.3.0 — kit base
    SlideShell, SlideHero, SlideTOC, SlideTerminal, SlideResources,
    // v0.5.0 — kit V4 completo
    SlideStatement, SlideCompare, SlideStats, SlideDiagram,
    SlideCode, SlideList,
    // v0.6.0 — Tier 1 audit V5
    SlidePatternGrid, SlideDecisionTable, SlidePipeline, SlideHandsOn,
    // v0.7.0 — V4 residuales + Tier 2 + Tier 3
    SlideSection, SlideQuote, SlideWhoAmI, SlideToolsGrid,
    SlideEquation, SlideLayerStack, SlideNestedEras, SlideCodeCompare,
    SlideAccentCards, SlideTriada, SlideDidactic
  } from '@codigosinsiesta/theme/slides';
</script>
```

#### `<SlideHero>`

```svelte
<SlideHero
  eyebrow="Taller · Código Sin Siesta · 2026"
  title="Taller Graphify"
  titleHighlight="Graphify"
  subtitle="Indexa un repo, navega el grafo, decide con criterio."
  intro="90 minutos para salir con un veredicto razonado."
  tools={[
    { label: 'Graphify' },
    { label: 'Tree-sitter' },
    { label: 'Veredicto razonado', highlight: true }
  ]}
  author={{
    name: 'Alejandro de la Fuente',
    role: 'Software Engineer · NTT Data',
    avatarUrl: 'https://...',
    links: [
      { url: 'https://...', label: '🌐' },
      { url: 'https://github.com/...', label: '🐙' }
    ]
  }}
/>
```

#### `<SlideTOC>`

```svelte
<SlideTOC
  eyebrow="Agenda"
  title="Lo que vamos a recorrer en 90 minutos"
  titleHighlight="90 minutos"
  lead="6 capítulos. La mitad del tiempo en hands-on real."
  current={null}
  chapters={[
    { title: 'El problema',  body: 'Context budget reventado.', duration: '5 min' },
    { title: 'Knowledge graph', body: 'Nodes + edges + triples.', duration: '8 min' }
    /* ... */
  ]}
/>
```

#### `<SlideTerminal>`

```svelte
<SlideTerminal
  eyebrow="Hands-on 1 · 25-30 min ⭐"
  eyebrowAccent="ok"
  title="Setup + primera ejecución"
  titleHighlight="primera ejecución"
  lead="Output: <code>graph.json</code> real, reporte leído, ojo entrenado."
  terminalTitle="~/taller-graphify-starter · zsh"
  lines={[
    { type: 'comment', text: 'instala graphify' },
    { type: 'cmd',     text: 'uv tool install graphifyy' },
    { type: 'ok',      text: '✓ installed graphifyy 0.8.2' }
  ]}
  steps={[
    'Prerequisitos: Node ≥ 20 y `uv`.',
    'Instala Graphify globalmente.',
    '**Predice antes de ejecutar** — papel y boli.'
  ]}
  tip="El paso 4 (predecir) es no-negociable."
/>
```

#### `<SlideResources>`

```svelte
<SlideResources
  eyebrow="Cierre"
  title="Cinco takeaways. Un siguiente paso esta semana."
  titleHighlight="Un siguiente paso"
  takeaways={[
    { num: 1, text: 'Graphify resuelve un problema específico.' },
    { num: 2, text: 'El cuadrante manda. Verifica las 3 alternativas.' }
    /* ... */
  ]}
  links={[
    { icon: '🐙', title: 'Repo del starter', url: 'github.com/...', tag: 'template' }
  ]}
  qr={{ title: 'Escanea para todo', url: 'codigosinsiesta.github.io/...' }}
  closing="El veredicto razonado **es el output real del taller**."
/>
```

#### `<SlideStatement>`

Una idea grande con palabra-highlight gradient + atribución. Para tesis y rotundidades.

```svelte
<SlideStatement
  eyebrow="tesis"
  statement="El agente no sustituye el criterio. Lo amplifica."
  highlight="amplifica"
  source="Manifiesto · Código Sin Siesta"
/>
```

#### `<SlideCompare>`

Cards do/don't (rojo vs verde por defecto). El `kind` de cada lado controla el accent.

```svelte
<SlideCompare
  eyebrow="framework 4r"
  title="Vibe coding vs ingeniería"
  titleHighlight="ingeniería"
  left={{
    label: 'vibe coding', icon: '🌀',
    headline: 'Pides y rezas',
    items: [
      'El agente decide la arquitectura',
      'Cero tests, cero verificación',
      'No queda rastro del por qué'
    ]
  }}
  right={{
    label: 'engineering', icon: '⚙️',
    headline: 'Pides, verificas, iteras',
    items: [
      'Tú decides la arquitectura',
      'Tests + types como contrato',
      'Decisiones documentadas'
    ]
  }}
/>
```

#### `<SlideStats>`

Big numbers en grid, con trend autocoloreado (`↑` ok, `↓` err) + callout opcional al pie.

```svelte
<SlideStats
  eyebrow="los datos"
  title="¿Realmente nos hace más rápidos?"
  titleHighlight="rápidos"
  intro="GitHub mide impacto en 2024–25. Los números cuentan parte de la historia."
  stats={[
    { value: '55%',  label: 'velocidad',  trend: '↑ tareas atómicas', color: 'ok',  note: 'Tareas con scope claro.' },
    { value: '~30%', label: 'errores',    trend: '↑ código no revisado', color: 'err', note: 'Bugs que pasan a main sin review.' },
    { value: '2.1×', label: 'throughput', trend: '= con review estricta', color: 'electrico' },
    { value: '-12%', label: 'comprensión', trend: '↓ del propio código', color: 'warn' }
  ]}
  callout={{
    kind: 'warn',
    title: 'Cuidado con la lectura ingenua',
    body: 'Los benchmarks miden tareas pequeñas. **Mantenibilidad a 6 meses** no aparece aquí.'
  }}
/>
```

#### `<SlideDiagram>`

Cajas + flechas SVG curvadas right-edge → left-edge, leyenda al pie. Las coordenadas
viven dentro de un viewBox 1180×460 (configurable).

```svelte
<SlideDiagram
  eyebrow="arquitectura · MCP"
  title="Cómo se conecta un agente al mundo"
  titleHighlight="agente"
  nodes={[
    { id: 'agent', label: 'Agente', sub: 'claude / codex', x: 40,  y: 150, w: 200, h: 90, color: 'electrico', icon: '🤖' },
    { id: 'mcp',   label: 'MCP Server', sub: 'protocolo abierto', x: 340, y: 90,  w: 220, h: 90, color: 'cielo', icon: '🔌' },
    { id: 'fs',    label: 'Filesystem', sub: 'read / write', x: 680, y: 30,  w: 200, h: 80, color: 'ok', icon: '📁' },
    { id: 'api',   label: 'APIs externas', sub: 'rest / graphql', x: 680, y: 330, w: 200, h: 80, color: 'warn', icon: '🌐' }
  ]}
  edges={[
    { from: 'agent', to: 'mcp' },
    { from: 'mcp',   to: 'fs' },
    { from: 'mcp',   to: 'api', dashed: true, label: 'con auth' }
  ]}
  legend={[
    { color: 'electrico', label: 'runtime' },
    { color: 'cielo',     label: 'protocolo' },
    { color: 'ok',        label: 'recursos locales' },
    { color: 'warn',      label: 'externo · cuidado' }
  ]}
/>
```

#### `<SlideCode>`

Window mac-style con código + gutter de líneas + columna de notas L{n} a la derecha + callout opcional.

```svelte
<SlideCode
  eyebrow="anatomía de una skill"
  title="Skill: estructura mínima"
  titleHighlight="mínima"
  language="ts"
  code={`export const skill = {
  name: "graphify-query",
  trigger: "/q",
  description: "Pregunta al índice del repo.",
  async run({ input, ctx }) {
    const hits = await ctx.search(input);
    return ctx.format(hits);
  }
};`}
  annotations={[
    { line: 3, text: 'Trigger explícito — el agente sabe cuándo invocarte.' },
    { line: 4, text: '`description` = contrato. Concreto, sin prosa.' },
    { line: 5, text: 'Recibe `ctx`, no globals. Testeable y aislado.' }
  ]}
  callout={{ kind: 'info', title: 'Pro tip', body: 'Si la description ocupa más de 2 líneas, **divide en dos skills**.' }}
/>
```

#### `<SlideList>`

Grid 2-4 columnas de items numerados (patrón "12 reglas", checklist, anti-patterns).

```svelte
<SlideList
  eyebrow="checklist anti-alucinación"
  title="12 reglas para que el agente no se invente cosas"
  titleHighlight="12 reglas"
  columns={3}
  items={[
    { title: 'Lee el código',     body: 'Antes de pedir, abre el archivo.' },
    { title: 'Specs > prompts',   body: "Define qué cuenta como 'hecho'." },
    { title: 'Edits pequeños',    body: 'Un objetivo, un commit.' },
    { title: 'Verifica salidas',  body: 'No asumas. Mira el output.' },
    { title: 'Tests primero',     body: 'Si rompe, lo sabes ya.' },
    { title: 'Types como muro',   body: 'Compilador de tu lado.' }
    /* … */
  ]}
/>
```

#### `<SlidePatternGrid>` (v0.6.0+)

Grid de cards-pattern con mini-SVG (200×120) + título + descripción. 5 SVGs built-in
(`chain` / `fan-out` / `fan-in` / `orchestrator-workers` / `eval-loop`) + slot para SVG custom.

```svelte
<SlidePatternGrid
  eyebrow="orquestación · sesión 2"
  title="Tres formas de orquestar"
  titleHighlight="orquestar"
  patterns={[
    { type: 'chain',   title: 'Chain',  body: 'La salida de un paso es la entrada del siguiente. **Determinista**.' },
    { type: 'fan-out', title: 'Fan-out', body: 'Un agente delega en varios subagentes en paralelo.', accent: true },
    { type: 'fan-in',  title: 'Fan-in',  body: 'Resultados se sintetizan en un solo agente.' }
  ]}
/>
```

#### `<SlideDecisionTable>` (v0.6.0+)

Tabla cuadrante glass con thead mono uppercase, fila resaltada y celdas auto-coloreadas
(`✓` ok, `✕` err, `~` warn). Bloque "reglas prácticas" opcional debajo.

```svelte
<SlideDecisionTable
  eyebrow="cuándo cada cosa"
  title="Matriz de decisión"
  titleHighlight="decisión"
  columns={['Approach', 'Velocidad', 'Coste', 'Mantenible', 'Recomendación']}
  rows={[
    { cells: ['Mega-prompt', '✓', '~', '✕', 'Solo prototipos'] },
    { cells: ['Subagentes',  '✓', '✓', '✓', 'Default · producción'] },
    { cells: ['Fine-tune',   '✕', '✕', '~', 'Casos extremos'] }
  ]}
  highlightIndex={1}
  rules={[
    'Empieza por **subagentes**: 80% de los casos.',
    'Sube a fine-tune solo cuando el subagente cae por consistencia, no por velocidad.'
  ]}
/>
```

#### `<SlidePipeline>` (v0.6.0+)

Pipeline horizontal de pasos numerados separados por `→`. Cada paso lleva icon box
en gradient + label mono + h5 + body. Último paso opcionalmente `accent: 'ok'` (verde).
Soporta `iconImg` para Heroicons SVG (auto-tinted a cielo).

```svelte
<SlidePipeline
  eyebrow="flujo end-to-end"
  title="Cómo se invoca un subagente"
  titleHighlight="subagente"
  steps={[
    { label: 'INPUT',  title: 'Brief',         body: 'El padre prepara solo el contexto necesario.' },
    { label: 'RUN',    title: 'Subagente',     body: 'Ejecuta en su propia ventana de contexto.' },
    { label: 'RETURN', title: 'Resumen',       body: 'Devuelve un resultado compacto.' },
    { label: 'MERGE',  title: 'Padre integra', body: 'Continúa enriquecido, sin ruido.', accent: 'ok' }
  ]}
/>
```

#### `<SlideHandsOn>` (v0.6.0+)

Slide canónica de talleres: eyebrow píldora `⚡ N min` (warning), pasos numerados,
uno marcado como `current` (warning glow), bloque shell opcional con highlight ligero
(prompt `$`, comentarios `# …`, líneas ok `✓ …`, warn `✗ …`).

```svelte
<SlideHandsOn
  eyebrow="Hands-on · 25 min"
  title="Define tu primer subagente"
  titleHighlight="primer subagente"
  current={1}
  steps={[
    {
      title: 'Clona el repo del taller',
      body: 'Trae el scaffold con los configs ya listos.',
      code: '$ git clone github.com/css/agents-101 && cd agents-101'
    },
    {
      title: 'Crea el archivo del agente',
      body: 'Define `name`, `tools` y el prompt en `.agents/reviewer.md`.',
      code: '$ claude agent new reviewer\n✓ agente creado en .agents/reviewer.md'
    },
    { title: 'Invócalo desde el padre', body: 'Pásale solo el brief — no toda la conversación.' }
  ]}
/>
```

#### `<SlideShell>` — base genérica

Para slides custom que no encajan en un shell predefinido, usa `<SlideShell>`
como wrapper y compón a mano:

```svelte
<SlideShell bgPreset="naranja">
  <Eyebrow accent="warn">Cuándo NO usar</Eyebrow>
  <h2>...</h2>
  <!-- tu layout custom -->
</SlideShell>
```

`bgPreset` acepta: `azul` (default), `identidad`, `verde`, `cierre`, `lila`,
`naranja`, `none`.

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
├── components/                · componentes-átomo Svelte 5 (v0.2.0+)
│   ├── index.js               · barrel re-export
│   ├── Eyebrow.svelte         · barra horizontal + texto mono uppercase
│   ├── Callout.svelte         · aside box semántico (info/ok/warn/err)
│   ├── ToolCard.svelte        · card con accent bar + icon box + tag pill
│   ├── TerminalLine.svelte    · línea individual de terminal (cmd/out/ok/err/comment)
│   ├── TerminalWindow.svelte  · caja Mac-style que envuelve TerminalLine (v0.3.0+)
│   └── QRCode.svelte          · placeholder 21×21 con caption
└── slides/                    · slide-shells canónicos (v0.3.0+)
    ├── index.js               · barrel re-export
    ├── SlideShell.svelte      · wrapper base con bg presets + slot
    ├── SlideHero.svelte       · portada (eyebrow + title + tools + author + orbs)
    ├── SlideTOC.svelte        · agenda con chapter cards en grid 2-cols
    ├── SlideTerminal.svelte   · hands-on (TerminalWindow + narración paso a paso)
    ├── SlideResources.svelte  · cierre (takeaways + links + QR)
    ├── SlideStatement.svelte  · idea grande + highlight gradient + atribución (v0.5.0+)
    ├── SlideCompare.svelte    · A vs B con cards do/don't (v0.5.0+)
    ├── SlideStats.svelte      · big numbers + trends + callout (v0.5.0+)
    ├── SlideDiagram.svelte    · cajas + flechas SVG (arquitectura) (v0.5.0+)
    ├── SlideCode.svelte       · window + código + notas L{n} (v0.5.0+)
    ├── SlideList.svelte       · items numerados en grid 2-4 cols (v0.5.0+)
    ├── SlidePatternGrid.svelte    · cards con mini-SVG (chain/fan-out/fan-in…) (v0.6.0+)
    ├── SlideDecisionTable.svelte  · tabla cuadrante con highlight-row (v0.6.0+)
    ├── SlidePipeline.svelte       · pipeline horizontal de pasos con flechas (v0.6.0+)
    ├── SlideHandsOn.svelte        · workshop pill ⚡ N min + pasos + shell blocks (v0.6.0+)
    ├── SlideSection.svelte        · divisor capítulo: número gigante gradiente + h1 (v0.7.0+)
    ├── SlideQuote.svelte          · 💬 + cita gigante + atribución (v0.7.0+)
    ├── SlideWhoAmI.svelte         · avatar + bio + tags + handles + callout (v0.7.0+)
    ├── SlideToolsGrid.svelte      · header + grid 3×2 de ToolCards (v0.7.0+)
    ├── SlideEquation.svelte       · term + op + term = outcome (Agent = Model + Harness) (v0.7.0+)
    ├── SlideLayerStack.svelte     · capas horizontales kernel/runtime/app (v0.7.0+)
    ├── SlideNestedEras.svelte     · anillos concéntricos matryoshka (v0.7.0+)
    ├── SlideCodeCompare.svelte    · dos paneles código + badge flotante (v0.7.0+)
    ├── SlideAccentCards.svelte    · cards con border-top color custom (v0.7.0+)
    ├── SlideTriada.svelte         · KG card NODE/EDGE/TRIPLE + chips violeta (v0.7.0+)
    └── SlideDidactic.svelte       · Definition + Analogía + Examples 3-block (v0.7.0+)
assets/                       · brand assets oficiales (v0.6.0+)
├── logo-owl-bone.svg         · búho blanco · default sobre dark
├── logo-owl-electric.svg     · búho cielo · accent
├── logo-owl-dark.svg         · búho navy · sobre bone
├── logo-owl-head.svg         · solo cabeza · lockups pequeños
└── logo-wordmark.svg         · CÓDIGO SIN SIESTA + búho horizontal
icons/                        · Heroicons v2 outline subset (v0.6.0+)
└── 13 SVG · chevron-left/right, bars-3, x-mark, cpu-chip, wrench-screwdriver,
            magnifying-glass, light-bulb, book-open, bookmark, check-circle,
            puzzle-piece, sparkles
BRAND.md                      · gate CMO+QA · voz, casing, visual fundamentals (v0.6.0+)
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
- [x] **v0.2.0** — 5 componentes-átomo Svelte 5 (`Eyebrow`, `Callout`, `ToolCard`, `TerminalLine`, `QRCode`).
- [x] **v0.3.0** — `TerminalWindow` + 5 slide-shells canónicos (`SlideShell`, `SlideHero`, `SlideTOC`, `SlideTerminal`, `SlideResources`) que componen los átomos en layouts pixel-perfect.
- [x] **v0.4.0** — Storybook publicado en [codigosinsiesta.github.io/theme](https://codigosinsiesta.github.io/theme/) con preview en vivo + tabla de props + ejemplos de código por cada componente y shell. Mismo stack Astro+Svelte que los decks consumidores — lo que ves aquí funciona idéntico en producción.
- [x] **v0.5.0** — 6 shells nuevos cubriendo los 15 slide-types del kit V4: `SlideStatement`, `SlideCompare`, `SlideStats`, `SlideDiagram`, `SlideCode`, `SlideList`. Portados directos del handoff `codigo-sin-siesta/project/src/css-slides.jsx` + `css-slides-extra.jsx`.
- [x] **v0.6.0** — Tier 1 del component-audit V5 (`reference/component-audit.md` del handoff `codigo-sin-siesta-design-system`): `SlidePatternGrid`, `SlideDecisionTable`, `SlidePipeline`, `SlideHandsOn`. Brand assets oficiales (5 SVGs del búho + wordmark). Subset de 13 Heroicons outline. Brand standard (`BRAND.md`) con gate CMO+QA.
- [x] **v0.7.0** — Cierre del kit. **11 shells nuevos** = V4 residuales (`SlideSection`, `SlideQuote`, `SlideWhoAmI`, `SlideToolsGrid`) + Tier 2 audit V5 (`SlideEquation`, `SlideLayerStack`, `SlideNestedEras`, `SlideCodeCompare`) + Tier 3 audit V5 (`SlideAccentCards`, `SlideTriada`, `SlideDidactic`). El theme cubre ahora **26 slide-shells** — paridad completa con todos los patrones observados en las 9 presentaciones de la org.
- [ ] **v0.8.0** — entradas GSAP por slide-type (cover=fade+scale, terminal=typing, stats=count-up). Probable spin-off como package opcional (`@codigosinsiesta/theme-motion`) para no acoplar `gsap` como dep dura.
- [ ] **v1.0.0** — reconciliación de tokens con el handoff V5 (`#0A1628` deep navy, `#FAF9F6` bone, violeta `#A78BFA` como token oficial, Bricolage Grotesque como subheader), los 9 decks de la organización migrados, npm publish bajo `@codigosinsiesta/theme`.

## Licencia

MIT — incluida en `LICENSE`.
