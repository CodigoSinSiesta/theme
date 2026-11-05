/* orchestra · un director delega en subagentes mediante trazos que se dibujan.
   Datos: kicker, title, director = { name, glyph }, subs[] = { name, note, glyph, lit? } (2–4 subagentes). */
TPL.orchestra = {
  def: {
    kicker: 'Orquestación', title: 'Un director, [[tres subagentes]]',
    director: { name: 'Director', glyph: 'director' },
    subs: [{ name: 'Investiga', note: 'contexto propio', glyph: 'sub' }, { name: 'Escribe', note: 'contexto propio', glyph: 'sub' }, { name: 'Revisa', note: 'contexto propio', glyph: 'sub' }],
  },
  html(d, H) {
    const n = d.subs.length, sp = n > 1 ? Math.min(540, 1380 / (n - 1)) : 0, cx = i => Math.round(960 + (i - (n - 1) / 2) * sp);
    const paths = d.subs.map((s, i) => `<path class="draw" data-i="${i + 2}" d="M960 520 C960 620 ${cx(i)} 620 ${cx(i)} 720"/>`).join('');
    const subs = d.subs.map((s, i) => `<div class="g${s.lit ? ' lit' : ''} r" data-i="${i + 2}" style="left:${cx(i) - 180}px;top:720px;width:360px;height:200px;text-align:center">${H.GLYPH(s.glyph, 52)}<div class="t" style="font-size:32px">${H.esc(s.name)}</div><div class="k" style="font-size:22px">${H.esc(s.note)}</div></div>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${paths}</svg>
<div class="g lit r" data-i="1" style="left:760px;top:330px;width:400px;height:190px;text-align:center">${H.GLYPH(d.director.glyph, 56)}<div class="t" style="font-size:36px">${H.esc(d.director.name)}</div></div>
${subs}`;
  },
};
