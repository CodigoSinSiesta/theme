/* history-snapshot · vídeo 13 · snapcompact: la historia antigua se imprime en imágenes con una fuente de píxeles y el modelo
   las lee de vuelta. Datos: kicker, title, history = { label, bars[] (anchos %, 4–9), not }, print, images = { label, n (2–3) },
   model = { glyph, label }, without[] (2–4), needs, fits = { logo, label }. Pasos: 1 historia, 2 imágenes, 3 modelo, 4 «sin…»,
   5 requisito, 6 modelo que lo cumple. */
TPL['history-snapshot'] = {
  def: {
    kicker: 'snapcompact', title: 'La historia, [[en imágenes]]',
    history: { label: 'historia antigua', bars: [92, 70, 84, 60, 88, 74, 66], not: 'no resume' },
    print: 'imprime', images: { label: 'fuente de píxeles', n: 3 },
    model: { glyph: 'cpu-chip', label: 'las lee de vuelta' },
    without: ['sin modelo', 'sin clave', 'sin red'],
    needs: 'Solo con modelos que [[aceptan imágenes]]', fits: { logo: 'deepseek', label: 'DeepSeek Flash las acepta' },
  },
  html(d, H) {
    const bar = w => `<i style="display:block;height:24px;border-radius:7px;background:rgba(96,165,250,.38);margin-top:14px;width:${+w}%"></i>`;
    // una línea de «texto en píxeles»: bloques de 6 px con huecos irregulares
    const px = (w, k) => `<i style="display:block;height:7px;margin-top:${k % 3 ? 5 : 11}px;width:${w}%;background:repeating-linear-gradient(90deg,rgba(191,219,254,.9) 0 6px,transparent 6px 8px,rgba(191,219,254,.9) 8px 12px,transparent 12px 16px,rgba(191,219,254,.9) 16px 26px,transparent 26px 32px)"></i>`;
    const page = j => `<div class="abs" style="left:${760 + j * 34}px;top:${396 + j * 34}px;width:330px;height:300px;border-radius:14px;background:#0b1430;border:2px solid ${j === d.images.n - 1 ? 'var(--cyan)' : 'var(--line)'};padding:22px 24px;box-shadow:0 12px 30px rgba(2,6,23,.6)">
${[96, 82, 90, 70, 94, 78, 86, 64, 92, 74, 88, 58, 80, 90, 68].map(px).join('')}</div>`;
    const n = d.images.n, bot = 396 + (n - 1) * 34 + 300;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:340px;width:520px;height:${bot - 340}px"><div class="k">${H.A(d.history.label)}</div>${d.history.bars.map(bar).join('')}</div>
<div class="abs r" data-i="1" style="left:155px;top:${bot - 76}px"><span class="chip" style="font-size:22px;color:var(--red);border-color:var(--red)">✕ ${H.A(d.history.not)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M640 560 H750"/><path class="draw" data-i="2" d="M736 548 L750 560 L736 572"/>
<path class="draw" data-i="3" d="M${760 + (n - 1) * 34 + 330} 560 H1390"/><path class="draw" data-i="3" d="M1376 548 L1390 560 L1376 572"/></svg>
<div class="abs mono cy r" data-i="2" style="left:640px;top:500px;width:110px;text-align:center;font-size:24px">${H.A(d.print)}</div>
<div class="r" data-i="2">${Array.from({ length: n }, (_, j) => page(j)).join('')}</div>
<div class="abs k r" data-i="2" style="left:760px;top:${bot + 14}px;width:${330 + (n - 1) * 34}px;text-align:center">${H.A(d.images.label)}</div>
<div class="g lit r" data-i="3" style="left:1400px;top:440px;width:400px;height:240px;text-align:center;padding-top:40px">${H.GLYPH(d.model.glyph, 84)}<div class="s" style="font-size:28px;margin-top:20px;color:var(--ink)">${H.A(d.model.label)}</div></div>
<div class="abs flex r" data-i="4" style="left:1200px;top:712px;width:600px;gap:12px;justify-content:flex-end">${d.without.map(t => `<span class="chip" style="font-size:24px;border-color:var(--ok);color:var(--ok)">${H.A(t)}</span>`).join('')}</div>
<div class="g r flex" data-i="5" style="left:120px;top:870px;width:1680px;height:100px;padding:0 34px;justify-content:space-between"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.needs)}</span>
<span class="flex r" data-i="6" style="gap:18px">${H.ICO(d.fits.logo, 56)}<span class="s ok" style="font-size:30px">✓ ${H.A(d.fits.label)}</span></span></div>`;
  },
};
