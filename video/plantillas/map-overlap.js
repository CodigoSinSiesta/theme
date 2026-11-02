/* map-overlap · vídeo 22 · dos listas de cinco frente a frente: lo que comparten se une, lo que falta en la segunda se
   marca, y cada pieza de la segunda recibe su fichero o costumbre. Datos: kicker, title, a = { k, items[5] }, b = { k, items[5] =
   { t, file } }, missing (texto de la marca), missingIdx[] (items de a que faltan), links[] = [i de a, i de b]. Pasos:
   1 la segunda lista, 2 lo compartido y lo que falta, 3 la segunda es del repositorio, 4… un paso por fichero o costumbre. */
TPL['map-overlap'] = {
  def: {
    kicker: 'Mapa 2 · el repositorio', title: 'Otra lista de cinco, [[otro mapa]]',
    a: { k: 'mapa 1 · el agente', items: ['instrucciones', 'herramientas', 'entorno', 'estado', 'feedback'] },
    b: { k: 'mapa 2 · el repositorio', items: [
      { t: 'instrucciones', file: 'AGENTS.md' }, { t: 'estado', file: 'progreso' }, { t: 'verificación', file: 'pruebas' },
      { t: 'alcance', file: 'una funcionalidad cada vez' }, { t: 'ciclo de vida', file: 'arranque y traspaso' }] },
    missing: 'falta', missingIdx: [1, 2],
    links: [[0, 0], [3, 1]],
  },
  html(d, H) {
    const y = i => 400 + i * 104, RH = 80;
    const rowA = (t, i) => `<div class="abs flex" style="left:150px;top:${y(i)}px;width:460px;height:${RH}px;border-radius:14px;border:1.5px solid var(--line);background:rgba(15,23,42,.5);padding:0 26px"><span class="s" style="color:var(--pale)">${H.esc(t)}</span></div>`;
    const miss = i => `<div class="abs r flex" data-i="2" style="left:150px;top:${y(i)}px;width:460px;height:${RH}px;border-radius:14px;border:2.5px solid var(--red);background:rgba(248,113,113,.10);padding:0 26px;justify-content:flex-end;gap:10px">${H.GLYPH('x-circle', 30, 'bad')}<span class="k bad">${H.esc(d.missing)}</span></div>`;
    const rowB = (it, i) => `<div class="abs flex r" data-i="1" style="left:800px;top:${y(i)}px;width:960px;height:${RH}px;border-radius:14px;border:1.5px solid var(--line);background:rgba(15,23,42,.5);padding:0 26px"><span class="s" style="color:var(--ink)">${H.esc(it.t)}</span></div>
<div class="abs r" data-i="${4 + i}" style="left:1180px;top:${y(i) + 13}px;width:560px;text-align:right"><span class="chip" style="font-size:25px">${H.esc(it.file)}</span></div>`;
    const links = d.links.map(([a, b]) => `<path class="draw" data-i="2" d="M612 ${y(a) + RH / 2} C700 ${y(a) + RH / 2} 710 ${y(b) + RH / 2} 798 ${y(b) + RH / 2}"/>`).join('');
    return `${H.HEAD(d)}
<div class="g" style="left:120px;top:320px;width:520px;height:630px"><div class="k">${H.esc(d.a.k)}</div></div>
${d.a.items.map(rowA).join('')}${(d.missingIdx || []).map(miss).join('')}
<div class="g r" data-i="1" style="left:770px;top:320px;width:1030px;height:630px"></div>
<div class="g lit r" data-i="3" style="left:770px;top:320px;width:1030px;height:630px"></div>
<div class="abs flex r" data-i="1" style="left:804px;top:347px;gap:14px">${H.GLYPH('folder', 30)}<span class="k cy">${H.esc(d.b.k)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${links}</svg>
${d.b.items.map(rowB).join('')}`;
  },
};
