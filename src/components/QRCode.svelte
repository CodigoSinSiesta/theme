<!--
  @codigosinsiesta/theme/components/QRCode.svelte
  V4 design — placeholder de QR (21×21 grid determinístico, NO escaneable).
  Replica el algoritmo de codigo-sin-siesta/project/src/css-slides-extra.jsx.

  Para un QR escaneable real, generar un SVG con `qrcode` lib y meterlo dentro
  de la misma caja blanca (props bgColor/fgColor inalterables).

  Props:
    size:    number  — lado del cuadrado en px (default: 220)
    bgColor: string  — color de fondo de la tarjeta blanca (default: '#fff')
    fgColor: string  — color de las celdas activas (default: var(--color-fondo))
    title:   string  — caption display superior (opcional)
    url:     string  — caption mono inferior (opcional)
-->

<script lang="ts">
  let {
    size = 220,
    bgColor = '#fff',
    fgColor = 'var(--color-fondo)',
    title = '',
    url = ''
  } = $props<{ size?: number; bgColor?: string; fgColor?: string; title?: string; url?: string }>();

  // Patrón determinístico estilo QR (finder corners + pseudo-random interior)
  const cells: boolean[] = Array.from({ length: 441 }).map((_, i) => {
    const r = Math.floor(i / 21);
    const c = i % 21;
    const finder  = (r === 0 || r === 6 || c === 0 || c === 6)   && (r < 7 && c < 7);
    const finderR = (r === 0 || r === 6 || c === 14 || c === 20) && (r < 7 && c >= 14);
    const finderB = (r === 14 || r === 20 || c === 0 || c === 6) && (r >= 14 && c < 7);
    const inner =
      (r >= 2 && r <= 4 && c >= 2  && c <= 4 ) ||
      (r >= 2 && r <= 4 && c >= 16 && c <= 18) ||
      (r >= 16 && r <= 18 && c >= 2 && c <= 4);
    return inner || finder || finderR || finderB || ((r * 7 + c * 13) % 5 < 2);
  });
</script>

<div class="csi-qr">
  <div class="card" style:width={`${size}px`} style:height={`${size}px`} style:background={bgColor}>
    <div class="grid">
      {#each cells as on}
        <div class="cell" class:on style:background={on ? fgColor : 'transparent'}></div>
      {/each}
    </div>
  </div>
  {#if title || url}
    <div class="caption">
      {#if title}<div class="title">{title}</div>{/if}
      {#if url}<div class="url">{url}</div>{/if}
    </div>
  {/if}
</div>

<style>
  .csi-qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
  }
  .card {
    border-radius: 14px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.25);
  }
  .grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(21, 1fr);
    grid-template-rows: repeat(21, 1fr);
    gap: 1px;
  }
  .cell { /* color set inline */ }
  .caption { text-align: center; }
  .title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 16px;
    color: var(--color-tinta);
  }
  .url {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--color-cielo);
    margin-top: 4px;
  }
</style>
