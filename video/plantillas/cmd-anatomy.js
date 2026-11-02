/* cmd-anatomy · comando mono 44px (26,4 px/carácter) con subrayado y tarjeta por trozo. Datos: kicker, title, left, lit, parts[] = { text, color (css), title?, note? }.
   Un trozo sin `note` es solo texto (sin subrayado ni tarjeta). Una tarjeta por trozo con nota, 1–5; el comando debe caber en ~58 caracteres. `lit`: índice (en parts) de la tarjeta iluminada. */
TPL['cmd-anatomy'] = {
  def: {
    kicker: 'Anatomía', title: 'Un comando, [[pieza a pieza]]', left: 260, lit: 4,
    parts: [
      { text: 'pi' },
      { text: '-p', color: 'var(--cyan)', title: '-p', note: 'Modo no interactivo: una tarea y sale' },
      { text: '"resume el repo"', color: 'var(--sky)', title: '"…"', note: 'La tarea que recibe el agente' },
      { text: '--mode json', color: 'var(--ok)', title: '--mode json', note: 'Un evento JSON por línea, no texto' },
      { text: '--tools read,bash', color: 'var(--amber)', title: '--tools', note: 'Solo estas herramientas, menos prefijo' },
    ],
  },
  html(d, H) {
    const CW = 26.4, P = d.parts;
    const total = P.reduce((s, p) => s + p.text.length, 0) + P.length - 1;
    const left = Math.max(60, Math.min(d.left, 1860 - total * CW));
    let pos = 0, step = 0, line = '', bars = '';
    const noted = P.map((p, i) => ({ p, i })).filter(o => o.p.note), nc = noted.length, w = Math.floor((1680 - 40 * (nc - 1)) / nc);
    P.forEach((p, i) => {
      const st = p.note ? ++step : 0;
      line += (i ? ' ' : '') + `<span${st ? ` class="r" data-i="${st}"` : ''}${p.color ? ` style="color:${p.color}"` : ''}>${H.esc(p.text)}</span>`;
      if (st) bars += `<i class="bx" data-i="${st}" style="position:absolute;left:${Math.round(left + pos * CW)}px;top:490px;width:${Math.round(p.text.length * CW)}px;height:5px;background:${p.color || 'var(--cyan)'}"></i>`;
      pos += p.text.length + 1;
    });
    const cards = noted.map((o, k) => `<div class="g${o.i === d.lit ? ' lit' : ''} r" data-i="${k + 1}" style="left:${120 + k * (w + 40)}px;top:600px;width:${w}px;height:250px"><div class="mono" style="font-size:34px;font-weight:700;${o.p.color ? `color:${o.p.color}` : ''}">${H.esc(o.p.title || o.p.text)}</div><div class="s" style="font-size:26px;margin-top:10px">${H.esc(o.p.note)}</div></div>`).join('');
    return `${H.HEAD(d)}
<div class="abs mono" style="left:${left}px;top:420px;font-size:44px;white-space:pre;letter-spacing:0">${line}</div>${bars}${cards}`;
  },
};
