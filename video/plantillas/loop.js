/* loop · bucle del agente: fichas en círculo con un testigo que gira (data-orbit) y una ficha lateral opcional.
   Datos: kicker, title, steps[] = { name, lit? } (3–6; con 4 es la disposición original), orbitSecs, side = { glyph, text } (o null). */
TPL.loop = {
  def: {
    kicker: 'El bucle', title: 'Observar, pensar, [[actuar]], repetir', orbitSecs: 6,
    steps: [{ name: 'Observar' }, { name: 'Pensar' }, { name: 'Actuar', lit: true }, { name: 'Resultado' }],
    side: { glyph: 'tool', text: 'bash · editar · buscar' },
  },
  html(d, H) {
    const n = d.steps.length;
    const four = [[810, 300], [1090, 560], [810, 810], [530, 560]];
    const w = n === 4 ? 300 : 240;
    const pos = i => n === 4 ? four[i] : [Math.round(960 + 260 * Math.sin(2 * Math.PI * i / n) - w / 2), Math.round(650 - 260 * Math.cos(2 * Math.PI * i / n) - 40)];
    const cards = d.steps.map((s, i) => { const [x, y] = pos(i); return `<div class="g${s.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${x}px;top:${y}px;width:${w}px;padding:16px;text-align:center${s.lit ? '' : ';background:#16264a'}"><div class="t" style="font-size:34px">${H.esc(s.name)}</div></div>`; }).join('');
    const side = d.side ? `<div class="g r" data-i="${n + 1}" style="left:1450px;top:800px;width:350px;padding:20px 26px">${H.GLYPH(d.side.glyph, 44)}<div class="mono" style="font-size:24px;margin-top:6px">${H.esc(d.side.text)}</div></div>` : '';
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none">
<circle cx="960" cy="650" r="260" stroke="#60a5fa" stroke-opacity=".35" stroke-width="3" stroke-dasharray="10 12"/>
<circle data-orbit="960,650,260,${+d.orbitSecs || 6}" r="14" fill="#93c5fd" style="filter:drop-shadow(0 0 12px #60a5fa)"/></svg>
${cards}${side}`;
  },
};
