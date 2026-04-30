<!--
  @codigosinsiesta/theme/slides/SlideCodeCompare.svelte
  V4 design — dos paneles de código lado-a-lado (good vs bad típico) con un
  badge flotante absoluto en el centro (ej. "6× menos código").
  Highlight ligero por regex: keywords, strings, números, comentarios, fn calls.
  Portado de "Code side-by-side" en codigo-sin-siesta-design-system/project/kits/slide-deck/deck.css
  + Slide deck UI kit · Patterns.html.

  Props:
    eyebrow:        string                                    — kicker
    title:          string                                    — título
    titleHighlight: string                                    — palabra del título a destacar
    left:           Pane                                      — panel izquierdo
    right:          Pane                                      — panel derecho
    badge:          string                                    — texto del badge flotante (opcional)
    leftKind:       'bad' | 'good' | 'neutral'                — accent panel izquierdo (default 'bad')
    rightKind:      'bad' | 'good' | 'neutral'                — accent panel derecho (default 'good')

  Pane = {
    title: string;        // header del panel (mono)
    tag?: string;         // pill arriba-derecha (ej. 'antes', 'después')
    code: string;         // bloque entero, con \n; lang inferido por el highlighter
    lang?: 'ts' | 'js' | 'py' | 'shell' | 'css' | 'json' | 'plain';
  }
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  type Lang = 'ts' | 'js' | 'py' | 'shell' | 'css' | 'json' | 'plain';
  type Pane = { title: string; tag?: string; code: string; lang?: Lang };
  type Kind = 'bad' | 'good' | 'neutral';

  let {
    eyebrow = '',
    title = '',
    titleHighlight = '',
    left = { title: '', code: '', lang: 'plain' as Lang } as Pane,
    right = { title: '', code: '', lang: 'plain' as Lang } as Pane,
    badge = '',
    leftKind = 'bad' as Kind,
    rightKind = 'good' as Kind
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    left?: Pane;
    right?: Pane;
    badge?: string;
    leftKind?: Kind;
    rightKind?: Kind;
  }>();

  const titleParts = $derived.by(() => {
    if (!titleHighlight || !title.includes(titleHighlight)) return null;
    const idx = title.indexOf(titleHighlight);
    return {
      before: title.slice(0, idx),
      highlight: titleHighlight,
      after: title.slice(idx + titleHighlight.length)
    };
  });

  const KEYWORDS: Record<string, string[]> = {
    ts: ['const', 'let', 'var', 'function', 'class', 'if', 'else', 'return', 'await', 'async', 'import', 'from', 'export', 'default', 'new', 'this', 'extends', 'implements', 'interface', 'type', 'as', 'try', 'catch', 'throw', 'for', 'while', 'do', 'in', 'of', 'true', 'false', 'null', 'undefined'],
    js: ['const', 'let', 'var', 'function', 'class', 'if', 'else', 'return', 'await', 'async', 'import', 'from', 'export', 'default', 'new', 'this', 'try', 'catch', 'throw', 'for', 'while', 'do', 'in', 'of', 'true', 'false', 'null', 'undefined'],
    py: ['def', 'class', 'if', 'elif', 'else', 'return', 'await', 'async', 'import', 'from', 'as', 'try', 'except', 'raise', 'for', 'while', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'pass', 'with', 'lambda', 'self'],
    shell: [],
    css: [],
    json: ['true', 'false', 'null'],
    plain: []
  };

  function escapeHtml(s: string): string {
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  // Highlighter ligero por regex. Aplica a una línea ya escapada.
  function highlightLine(line: string, lang: Lang): string {
    const escaped = escapeHtml(line);
    if (lang === 'shell') {
      // shell: $ prompt, # comment, ✓/✗ ok/warn lines
      if (/^\s*#/.test(line)) return `<span class="com">${escaped}</span>`;
      if (/^\s*✓/.test(line)) return `<span class="str">${escaped}</span>`;
      if (/^\s*[✗!⚠]/.test(line)) return `<span class="num">${escaped}</span>`;
      return escaped.replace(/^\$/, '<span class="fn">$</span>');
    }
    let out = escaped;
    // strings (single, double, backtick) — first to avoid eating code inside strings later
    out = out.replace(/(&#39;|&quot;|&grave;|`)([^&`\n]*?)(&#39;|&quot;|&grave;|`)/g, '<span class="str">$1$2$3</span>');
    out = out.replace(/(&quot;)([^&\n]*?)(&quot;)/g, '<span class="str">$1$2$3</span>');
    out = out.replace(/(&#39;)([^&\n]*?)(&#39;)/g, '<span class="str">$1$2$3</span>');
    // line comments: // for ts/js/css, # for py
    if (lang === 'ts' || lang === 'js' || lang === 'css') {
      out = out.replace(/(\/\/[^\n]*)/g, '<span class="com">$1</span>');
    } else if (lang === 'py') {
      out = out.replace(/(#[^\n]*)/g, '<span class="com">$1</span>');
    }
    // numbers
    out = out.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="num">$1</span>');
    // function calls — name followed by (
    out = out.replace(/\b([a-zA-Z_$][\w$]*)\s*\(/g, '<span class="fn">$1</span>(');
    // keywords
    const kws = KEYWORDS[lang] ?? [];
    if (kws.length) {
      const re = new RegExp(`\\b(${kws.join('|')})\\b`, 'g');
      out = out.replace(re, '<span class="kw">$1</span>');
    }
    return out;
  }

  function renderCode(code: string, lang: Lang | undefined): string {
    return code
      .split('\n')
      .map((line) => highlightLine(line, lang || 'plain'))
      .join('\n');
  }
</script>

<SlideShell bgPreset="azul">
  <div class="header">
    {#if eyebrow}<Eyebrow>{eyebrow}</Eyebrow>{/if}
    <h2>
      {#if titleParts}
        {titleParts.before}<span class="highlight">{titleParts.highlight}</span>{titleParts.after}
      {:else}
        {title}
      {/if}
    </h2>
  </div>

  <div class="code-row">
    <div class="pane kind-{leftKind}">
      <div class="pane-header">
        <span class="pane-title">{left.title}</span>
        {#if left.tag}<span class="pane-tag">{left.tag}</span>{/if}
      </div>
      <pre class="code"><code>{@html renderCode(left.code, left.lang)}</code></pre>
    </div>

    {#if badge}
      <div class="floating-badge" aria-hidden="true">{badge}</div>
    {/if}

    <div class="pane kind-{rightKind}">
      <div class="pane-header">
        <span class="pane-title">{right.title}</span>
        {#if right.tag}<span class="pane-tag">{right.tag}</span>{/if}
      </div>
      <pre class="code"><code>{@html renderCode(right.code, right.lang)}</code></pre>
    </div>
  </div>
</SlideShell>

<style>
  .header { display: flex; flex-direction: column; gap: var(--spacing-md); }
  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4.5vw, 3rem);
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: var(--color-tinta);
  }
  .highlight {
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cielo));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .code-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    position: relative;
  }

  .pane {
    background: #0B1020;
    border: 1px solid rgba(96, 165, 250, 0.25);
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.40);
  }
  .pane.kind-bad { border-color: rgba(248, 113, 113, 0.35); }
  .pane.kind-good {
    border-color: rgba(52, 211, 153, 0.35);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.40), 0 0 24px rgba(40, 200, 64, 0.15);
  }

  .pane-header {
    padding: 12px 18px;
    background: rgba(30, 58, 138, 0.40);
    border-bottom: 1px solid rgba(96, 165, 250, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .pane.kind-bad  .pane-header { border-bottom-color: rgba(248, 113, 113, 0.35); }
  .pane.kind-good .pane-header { border-bottom-color: rgba(52, 211, 153, 0.35); }

  .pane-title {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-tinta2);
  }
  .pane-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 999px;
    background: rgba(96, 165, 250, 0.15);
    color: var(--color-cielo);
  }
  .pane.kind-bad  .pane-tag { background: var(--color-err-bg); color: var(--color-err); }
  .pane.kind-good .pane-tag { background: var(--color-ok-bg);  color: var(--color-ok);  }

  pre.code {
    margin: 0;
    padding: 18px 20px;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--color-tinta);
    overflow-x: auto;
    white-space: pre;
  }
  pre.code :global(.kw)  { color: #a78bfa; }
  pre.code :global(.str) { color: var(--color-ok); }
  pre.code :global(.num) { color: var(--color-warn); }
  pre.code :global(.com) { color: var(--color-tinta3); font-style: italic; }
  pre.code :global(.fn)  { color: var(--color-cielo); }

  .floating-badge {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 88px;
    height: 88px;
    padding: 0 18px;
    border-radius: 999px;
    background: var(--color-fondo);
    border: 2px solid rgba(96, 165, 250, 0.60);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-weight: 800;
    font-size: 0.9rem;
    color: var(--color-cielo);
    letter-spacing: 0.05em;
    box-shadow: 0 0 32px rgba(59, 130, 246, 0.40);
    z-index: 2;
    text-align: center;
  }

  @media (max-width: 1024px) {
    .code-row { grid-template-columns: 1fr; }
    .floating-badge { position: relative; top: auto; left: auto; transform: none; margin: 0 auto; }
  }
</style>
