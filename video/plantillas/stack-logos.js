/* stack-logos · pila vertical de capas con flechas ↓ entre ellas. Datos: kicker, title,
   layers[] = { name, note, glyph | logo, lit? } (2–4 capas; glyph: user model file sub tool vps director). */
TPL['stack-logos'] = {
  def: {
    kicker: 'Entorno', title: 'De tu portátil [[al modelo]]',
    layers: [
      { glyph: 'desktop', name: 'Tu máquina', note: 'SSH · navegador' },
      { glyph: 'vps', name: 'VPS', note: 'siempre encendido' },
      { logo: 'hermes', name: 'Hermes', note: 'bucle · memoria · skills', lit: true },
      { glyph: 'model', name: 'Modelo', note: 'API del proveedor' },
    ],
  },
  html(d, H) {
    let out = '';
    d.layers.forEach((l, k) => {
      const top = 320 + k * 180, i = k + 1;
      if (k) out += `<div class="abs mono cy r" data-i="${i}" style="left:940px;top:${top - 38}px;font-size:32px">↓</div>`;
      out += `<div class="g${l.lit ? ' lit' : ''} node r" data-i="${i}" style="left:360px;top:${top}px;width:1200px;height:140px;gap:30px;padding:0 44px">${l.logo ? H.ICO(l.logo, 70) : H.GLYPH(l.glyph, 70)}<span class="t${l.lit ? ' cy' : ''}">${H.esc(l.name)}</span><span class="s" style="margin-left:auto">${H.esc(l.note)}</span></div>`;
    });
    return `${H.HEAD(d)}\n${out}`;
  },
};
