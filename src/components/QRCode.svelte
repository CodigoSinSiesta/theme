<!--
  @codigosinsiesta/theme/components/QRCode.svelte
  QR escaneable generado con la librería `qrcode`. Sin `url` no dibuja código: un QR que no lleva
  a ninguna parte es peor que no poner ninguno.

  Props:
    size:    number  — lado del cuadrado en px (default: 220)
    bgColor: string  — color de fondo de la tarjeta (default: '#fff')
    fgColor: string  — color de las celdas activas (default: var(--color-fondo)). Debe contrastar con bgColor.
    title:   string  — caption display superior (opcional)
    url:     string  — destino del QR y caption mono inferior. Sin esquema, se abre con https://
-->

<script lang="ts">
  import QR from 'qrcode';

  // Zona de silencio que exige el estándar para que los lectores encuentren el código.
  const MARGEN = 4;

  let {
    size = 220,
    bgColor = '#fff',
    fgColor = 'var(--color-fondo)',
    title = '',
    url = ''
  } = $props<{ size?: number; bgColor?: string; fgColor?: string; title?: string; url?: string }>();

  const destino = $derived(!url || /^[a-z][a-z0-9+.-]*:/i.test(url) ? url : `https://${url}`);
  const modulos = $derived(destino ? QR.create(destino, { errorCorrectionLevel: 'M' }).modules : null);
  const lado = $derived(modulos ? modulos.size + MARGEN * 2 : 0);
  const trazado = $derived.by(() => {
    if (!modulos) return '';
    let d = '';
    for (let y = 0; y < modulos.size; y++) {
      for (let x = 0; x < modulos.size; x++) {
        if (modulos.get(y, x)) d += `M${x + MARGEN} ${y + MARGEN}h1v1h-1z`;
      }
    }
    return d;
  });
</script>

<div class="csi-qr">
  {#if modulos}
    <div class="card" style:width={`${size}px`} style:height={`${size}px`} style:background={bgColor}>
      <svg
        viewBox={`0 0 ${lado} ${lado}`}
        role="img"
        aria-label={`Código QR: ${title || destino}`}
        shape-rendering="crispEdges"
      >
        <path d={trazado} style:fill={fgColor} />
      </svg>
    </div>
  {/if}
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
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.25);
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
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
