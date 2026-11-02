/* embed-modes · caja de origen → 2–5 «puertas» → logo de destino, unidos por curvas calculadas.
   Datos: kicker, title, source, sourceIcon (Heroicon), logo, doors[] = { name, text, lit? }. Pasos: puerta i = i, destino = nº de puertas + 1. */
TPL['embed-modes'] = {
  def: { kicker: 'Programático', title: 'Pi dentro de [[tu pipeline]]', source: 'Tu script o CI', sourceIcon: 'code-bracket', logo: 'pi',
    doors: [
      { name: 'pi -p', text: 'texto final' }, { name: '--mode json', text: 'un evento por línea' },
      { name: 'RPC', text: 'diálogo por stdin/stdout' }, { name: 'SDK', text: 'createAgentSession', lit: true },
    ] },
  html(d, H) {
    const n = d.doors.length, c = 395 + (n - 1) * 70, ly = c - 35, ry = c - 5;
    const ys = d.doors.map((_, i) => 340 + i * 140 + 55);
    const paths = ys.map((y, i) => `<path class="draw" data-i="${i + 1}" d="M500 ${ly} C600 ${ly} 600 ${y} 700 ${y}"/>`).join('')
      + ys.map(y => `<path class="draw" data-i="${n + 1}" d="M1340 ${y} C1450 ${y} 1450 ${ry} 1560 ${ry}"/>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${paths}</svg>
<div class="g r" data-i="0" style="left:120px;top:${ly - 120}px;width:380px;height:240px;text-align:center;padding:40px 10px">${H.GLYPH(d.sourceIcon || 'code-bracket', 64)}<div class="t" style="font-size:34px;margin-top:14px">${H.A(d.source)}</div></div>
${d.doors.map((o, i) => `<div class="g${o.lit ? ' lit' : ''} r flex" data-i="${i + 1}" style="left:700px;top:${340 + i * 140}px;width:640px;height:110px;padding:0 30px;justify-content:space-between"><span class="mono cy" style="font-size:30px;font-weight:700">${H.esc(o.name)}</span><span class="s" style="font-size:24px">${H.A(o.text)}</span></div>`).join('\n')}
<div class="abs r" data-i="${n + 1}" style="left:1560px;top:${ry - 100}px;text-align:center">${H.ICO(d.logo, 180)}</div>`;
  },
};
