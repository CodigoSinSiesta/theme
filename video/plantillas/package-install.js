/* package-install · un comando instala un paquete que reparte N salidas (1–4) hacia un destino final.
   Datos: kicker, title, cmd, registry (logo), pkg, outputs[] (textos), target (logo). Pasos: 1 cmd, 2 registro, 3 paquete, 4 salidas, 5 destino. */
TPL['package-install'] = {
  def: { kicker: 'Paquetes', title: 'Instalar y [[listo]]', cmd: 'pi install @csn/paquete', registry: 'npm', pkg: 'paquete',
    outputs: ['Skills', 'Extensiones', 'Prompts'], target: 'pi' },
  html(d, H) {
    const n = d.outputs.length, pitch = n <= 3 ? 145 : 120, hh = 110, cy0 = 600;
    const cys = d.outputs.map((_, i) => cy0 + (i - (n - 1) / 2) * pitch);
    const near = y => Math.abs(y - cy0) < 1;
    const left = cys.map(cy => near(cy) ? `<path class="draw" data-i="4" d="M1180 ${cy0} L1260 ${cy0}"/>`
      : `<path class="draw" data-i="4" d="M1180 ${cy0} C1220 ${cy0} 1220 ${cy} 1260 ${cy}"/>`).join('');
    const right = cys.map(cy => near(cy) ? `<path class="draw" data-i="5" d="M1560 ${cy0} L1660 ${cy0}"/>`
      : `<path class="draw" data-i="5" d="M1560 ${cy} C1610 ${cy} 1610 ${cy0} 1660 ${cy0}"/>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<line class="draw" data-i="2" x1="640" y1="610" x2="700" y2="610"/><line class="draw" data-i="3" x1="840" y1="610" x2="900" y2="610"/>${left}${right}</svg>
<div class="g r flex" data-i="1" style="left:120px;top:560px;width:520px;height:100px;padding:0 24px"><span class="mono cy" style="font-size:26px">${H.esc(d.cmd)}</span></div>
<div class="abs r" data-i="2" style="left:700px;top:540px">${H.ICO(d.registry, 140)}</div>
<div class="g lit r" data-i="3" style="left:900px;top:480px;width:280px;height:240px;text-align:center;padding:46px 10px">${H.GLYPH('file', 56)}<div class="t" style="font-size:30px;margin-top:12px">${H.A(d.pkg)}</div></div>
${d.outputs.map((o, i) => `<div class="g r" data-i="4" style="left:1260px;top:${cys[i] - hh / 2}px;width:300px;height:${hh}px;padding:0 26px;display:flex;align-items:center"><span class="t" style="font-size:32px">${H.A(o)}</span></div>`).join('\n')}
<div class="abs r" data-i="5" style="left:1660px;top:520px">${H.ICO(d.target, 140)}</div>`;
  },
};
