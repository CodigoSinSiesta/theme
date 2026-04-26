<!--
  @codigosinsiesta/theme/slides/SlideResources.svelte
  V4 design — slide de cierre con takeaways arriba + links + QR abajo.

  Props:
    eyebrow:    string                                              — default 'Cierre'
    title:      string                                              — título del slide
    titleHighlight: string                                          — palabra del título a destacar
    takeaways:  { num?: number; text: string }[]                    — bloques numerados arriba (opcional)
    links:      { icon?; title; url; tag? }[]                       — link cards
    qr:         { title?; url?; size?; bgColor?; fgColor? }         — QR de la columna derecha
    closing:    string                                              — texto de cierre al pie (opcional)
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';
  import QRCode from '../components/QRCode.svelte';

  type Takeaway = { num?: number; text: string };
  type Link = { icon?: string; title: string; url: string; tag?: string };
  type QR = { title?: string; url?: string; size?: number; bgColor?: string; fgColor?: string };

  let {
    eyebrow = 'Cierre',
    title = '',
    titleHighlight = '',
    takeaways = [] as Takeaway[],
    links = [] as Link[],
    qr = {} as QR,
    closing = ''
  } = $props<{
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    takeaways?: Takeaway[];
    links?: Link[];
    qr?: QR;
    closing?: string;
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

  function renderInline(s: string): string {
    return s.replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }
</script>

<SlideShell bgPreset="cierre">
  <div class="header">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2>
      {#if titleParts}
        {titleParts.before}<span class="highlight">{titleParts.highlight}</span>{titleParts.after}
      {:else}
        {title}
      {/if}
    </h2>
  </div>

  {#if takeaways.length > 0}
    <div class="takeaways">
      {#each takeaways as t, i}
        <div class="takeaway">
          <span class="num">{t.num ?? i + 1}</span>
          <p>{t.text}</p>
        </div>
      {/each}
    </div>
  {/if}

  <div class="resources-grid">
    <div class="links-col">
      {#each links as l}
        <div class="link-card">
          {#if l.icon}<div class="link-icon">{l.icon}</div>{/if}
          <div class="link-body">
            <div class="link-title">{l.title}</div>
            <div class="link-url">{l.url}</div>
          </div>
          {#if l.tag}<div class="link-tag">{l.tag}</div>{/if}
        </div>
      {/each}
    </div>

    <div class="qr-col">
      <QRCode
        size={qr.size ?? 220}
        bgColor={qr.bgColor ?? '#fff'}
        fgColor={qr.fgColor ?? 'var(--color-fondo)'}
        title={qr.title ?? ''}
        url={qr.url ?? ''}
      />
    </div>
  </div>

  {#if closing}
    <p class="closing">{@html renderInline(closing)}</p>
  {/if}
</SlideShell>

<style>
  .header { display: flex; flex-direction: column; gap: var(--spacing-md); }
  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4.5vw, 3rem);
    line-height: 1.1;
    color: var(--color-tinta);
  }
  .highlight {
    background: linear-gradient(135deg, var(--color-electrico), var(--color-cielo), #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .takeaways { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
  .takeaway {
    background: var(--color-fondo-elev);
    border: 1px solid var(--color-borde);
    border-radius: var(--radius-lg);
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.3),
      0 8px 24px rgba(0, 0, 0, 0.15);
  }
  .num {
    font-family: var(--font-mono);
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--color-electrico);
    line-height: 1;
  }
  .takeaway p {
    margin: 0;
    line-height: 1.45;
    opacity: 0.9;
    font-size: 0.82rem;
    color: var(--color-tinta2);
  }

  .resources-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 32px;
    align-items: center;
  }
  .links-col { display: flex; flex-direction: column; gap: 10px; }
  .link-card {
    background: var(--color-fondo-elev);
    border: 1px solid var(--color-borde);
    border-radius: 10px;
    padding: 14px 18px;
    display: flex;
    gap: 14px;
    align-items: center;
  }
  .link-icon { font-size: 22px; flex-shrink: 0; }
  .link-body { flex: 1; min-width: 0; }
  .link-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 15px;
    color: var(--color-tinta);
    line-height: 1.2;
  }
  .link-url {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-cielo);
    margin-top: 2px;
  }
  .link-tag {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--color-tinta3);
    padding: 4px 10px;
    border-radius: 99px;
    border: 1px solid var(--color-borde);
    flex-shrink: 0;
  }
  .qr-col { display: flex; align-items: center; justify-content: center; }

  .closing {
    padding: 16px 20px;
    background: rgba(59,130,246,0.06);
    border-radius: 12px;
    text-align: center;
    line-height: 1.6;
    opacity: 0.9;
    margin: 0;
    font-size: 0.95rem;
    color: var(--color-tinta2);
  }
  .closing :global(strong) { color: var(--color-tinta); }

  @media (max-width: 1024px) {
    .resources-grid { grid-template-columns: 1fr; }
    .qr-col { order: -1; }
    .takeaways { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .takeaways { grid-template-columns: 1fr; }
    h2 { font-size: clamp(1.5rem, 6vw, 2rem); }
  }
</style>
