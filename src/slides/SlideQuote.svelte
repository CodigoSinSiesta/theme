<!--
  @codigosinsiesta/theme/slides/SlideQuote.svelte
  V4 design — slide cierre/aforismo: 💬 + eyebrow + cita gigante en comillas +
  atribución entre dos rules cortos.
  Portado de QuoteSlide en codigo-sin-siesta/project/src/css-slides.jsx.

  Props:
    icon:        string  — emoji/glyph al inicio (default '💬'; '' lo oculta)
    eyebrow:     string  — kicker (default 'para llevarse a casa')
    quote:       string  — la cita; se envuelve en comillas tipográficas
    attribution: string  — fuente / autor (mostrado entre dos rules de 40×2px)
-->

<script lang="ts">
  import SlideShell from './SlideShell.svelte';
  import Eyebrow from '../components/Eyebrow.svelte';

  let {
    icon = '💬',
    eyebrow = 'para llevarse a casa',
    quote = '',
    attribution = ''
  } = $props<{
    icon?: string;
    eyebrow?: string;
    quote?: string;
    attribution?: string;
  }>();
</script>

<SlideShell bgPreset="cierre">
  <div class="quote-wrap">
    {#if icon}<div class="quote-icon" aria-hidden="true">{icon}</div>{/if}
    {#if eyebrow}<Eyebrow>{eyebrow}</Eyebrow>{/if}
    <blockquote>&ldquo;{quote}&rdquo;</blockquote>
    {#if attribution}
      <div class="attrib">
        <span class="rule" aria-hidden="true"></span>
        <span class="text">{attribution}</span>
        <span class="rule" aria-hidden="true"></span>
      </div>
    {/if}
  </div>
</SlideShell>

<style>
  .quote-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 65vh;
    max-width: 1000px;
    margin: 0 auto;
    gap: var(--spacing-md);
  }

  .quote-icon {
    font-size: clamp(2.5rem, 5vw, 4rem);
    opacity: 0.6;
    line-height: 1;
  }

  blockquote {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(1.8rem, 4.5vw, 3.5rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--color-tinta);
  }

  .attrib {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: var(--spacing-md);
  }
  .rule {
    width: 40px;
    height: 2px;
    background: var(--color-electrico);
    flex-shrink: 0;
  }
  .text {
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--color-tinta2);
  }
</style>
