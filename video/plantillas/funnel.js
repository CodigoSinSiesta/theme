/* funnel · etapas que se estrechan, cada una con su cifra; una por paso.
   Datos: kicker, title, items[] = { t, v, lit? (etapa resaltada, cifra sin cian) }. 2–5 etapas (con 5 bajan a menos alto). */
TPL.funnel = {
  def: {
    kicker: 'Filtro', title: 'De mil ficheros a [[lo que cabe]]',
    items: [{ t: 'Repositorio', v: '1.240' }, { t: 'Búsqueda', v: '86' }, { t: 'Relevantes', v: '12' }, { t: 'En contexto', v: '3', lit: true }],
  },
  html(d, H) {
    const N = d.items.length, pitch = N > 1 ? Math.min(160, Math.floor(480 / (N - 1))) : 160, h = Math.min(140, pitch - 20);
    return H.HEAD(d) + d.items.map((it, i) => {
      const u = N > 1 ? i * 3 / (N - 1) : 0, w = Math.round(1320 - 160 * u - 10 * u * (u - 1)), ins = +(4 + u).toFixed(2);
      const pad = Math.round(u <= 1 ? 120 : 120 - 10 * (u - 1));
      return `<div class="fun r" data-i="${i + 1}" style="left:${Math.round((1920 - w) / 2)}px;top:${340 + i * pitch}px;width:${w}px;height:${h}px;clip-path:polygon(0 0,100% 0,${100 - ins}% 100%,${ins}% 100%);padding:0 ${pad}px${it.lit ? ';background:rgba(30,58,138,.5);border-color:var(--cyan)' : ''}"><span class="t">${H.A(it.t)}</span><span class="t${it.lit ? '' : ' cy'} mono">${H.esc(it.v)}</span></div>`;
    }).join('');
  },
};
