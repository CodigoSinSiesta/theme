/* layers · pila de capas que se abre de abajo arriba (la última de la lista entra primero).
   Datos: kicker, title, items[] = { t, s, lit? } de arriba abajo. 2–5 capas; cada una es 80px más ancha que la de encima. */
TPL.layers = {
  def: {
    kicker: 'Arquitectura', title: 'Cuatro capas, [[una encima de otra]]',
    items: [
      { t: 'Tú', s: 'Pides, revisas, decides' }, { t: 'Skills', s: 'Saber hacer reutilizable' },
      { t: 'Harness', s: 'Bucle, herramientas, permisos', lit: true }, { t: 'Modelo', s: 'Predice el siguiente token' },
    ],
  },
  html(d, H) {
    const N = d.items.length, pitch = N > 1 ? Math.min(160, Math.floor(480 / (N - 1))) : 160, h = Math.min(130, pitch - 30);
    return H.HEAD(d) + d.items.map((it, i) => `<div class="g${it.lit ? ' lit' : ''} r" data-i="${N - i}" style="left:${360 - 40 * i}px;top:${330 + i * pitch}px;width:${1200 + 80 * i}px;height:${h}px;padding:0 40px;display:flex;align-items:center;justify-content:space-between"><span class="t${it.lit ? ' cy' : ''}">${H.A(it.t)}</span><span class="s">${H.A(it.s)}</span></div>`).join('');
  },
};
