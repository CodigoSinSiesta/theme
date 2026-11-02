/* keycaps · tarjetas de atajos con teclas dibujadas. Datos: kicker, title, cards[] = { keys[], title, note, lit? }. Una tarjeta por paso. 2–5 tarjetas. */
TPL.keycaps = {
  def: {
    kicker: 'Atajos', title: 'Cuatro teclas [[que usarás siempre]]',
    cards: [
      { keys: ['Enter'], title: 'Steering', note: 'Corrige al agente mientras trabaja' },
      { keys: ['Alt', 'Enter'], title: 'Follow-up', note: 'Encola la petición para cuando acabe' },
      { keys: ['Esc'], title: 'Parar', note: 'Interrumpe y devuelve el control' },
      { keys: ['Ctrl', 'P'], title: 'Cambiar modelo', note: 'Rota entre los modelos acotados', lit: true },
    ],
  },
  html(d, H) {
    const n = d.cards.length, w = Math.floor((1680 - 40 * (n - 1)) / n);
    return H.HEAD(d) + d.cards.map((c, i) => `<div class="g${c.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${120 + i * (w + 40)}px;top:340px;width:${w}px;height:560px;text-align:center">${c.keys.map(k => `<span class="kc">${H.esc(k)}</span>`).join(' ')}<div class="t" style="margin-top:44px;font-size:36px">${H.esc(c.title)}</div><div class="s" style="font-size:26px;margin-top:10px">${H.esc(c.note)}</div></div>`).join('');
  },
};
