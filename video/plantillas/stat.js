/* stat · tarjetas con cifra grande que cuenta de 0 a n; una por paso.
   Datos: kicker, title, items[] = { pre?, n, suf?, sufSmall? (sufijo pequeño, p. ej. %), label, lit?, cy? (cifra cian) }. 1–4 tarjetas (con 4 la cifra baja a 130px). */
TPL.stat = {
  def: {
    kicker: 'Evidencia', title: 'Mismo modelo. Mismo benchmark. [[Otro resultado.]]',
    items: [
      { n: 6, suf: '×', label: 'de diferencia en rendimiento', cy: true },
      { pre: '−', n: 40, suf: '%', sufSmall: true, label: 'de tokens por tarea', lit: true },
      { n: 12, label: 'skills probadas' },
    ],
  },
  html(d, H) {
    const N = d.items.length, w = Math.min(520, (1680 - 60 * (N - 1)) / N), x0 = (1920 - (N * w + 60 * (N - 1))) / 2, fs = N > 3 ? 130 : 190;
    return H.HEAD(d) + d.items.map((it, i) => `<div class="g${it.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${Math.round(x0 + i * (w + 60))}px;top:440px;width:${w}px;height:440px;text-align:center"><div class="t${it.cy ? ' cy' : ''}" style="font-size:${fs}px;font-weight:900">${it.pre ? H.esc(it.pre) : ''}<span data-c="${+it.n}">0</span>${it.suf ? (it.sufSmall ? `<span style="font-size:${Math.round(fs * .53)}px">${H.esc(it.suf)}</span>` : H.esc(it.suf)) : ''}</div><div class="s" style="margin-top:16px">${H.A(it.label)}</div></div>`).join('');
  },
};
