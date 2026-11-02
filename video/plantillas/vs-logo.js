/* vs-logo · dos herramientas enfrentadas con puntos (ok/bad/am) y veredicto.
   Datos: kicker, title, left/right = { logo, name, lit?, points[] = { t, k:'ok'|'bad'|'am' } } (3–4 puntos), vs, verdict, verdictAccent. */
TPL['vs-logo'] = {
  def: {
    kicker: 'Frente a frente', title: 'Pi [[o]] Hermes', vs: 'vs',
    left: { logo: 'pi', name: 'Pi', points: [{ t: 'Mínimo y modificable', k: 'ok' }, { t: 'Local, en tu terminal', k: 'ok' }, { t: 'Sin memoria propia', k: 'bad' }] },
    right: { logo: 'hermes', name: 'Hermes', lit: true, points: [{ t: 'Memoria entre sesiones', k: 'ok' }, { t: 'Corre en un VPS', k: 'ok' }, { t: 'Más piezas que mantener', k: 'am' }] },
    verdict: 'Veredicto:', verdictAccent: 'Pi para aprender, Hermes para delegar.',
  },
  html(d, H) {
    const side = (s, i, left) => `<div class="g${s.lit ? ' lit' : ''} r" data-i="${i}" style="left:${left}px;top:330px;width:770px;height:540px"><div style="display:flex;align-items:center;gap:22px">${H.ICO(s.logo, 72)}<span class="t">${H.esc(s.name)}</span></div>
<div class="s" style="margin-top:30px;line-height:2">${s.points.map(p => `<span class="${p.k}">●</span> ${H.A(p.t)}`).join('<br>')}</div></div>`;
    return `${H.HEAD(d)}
${side(d.left, 1, 120)}
<div class="abs t cy mono r" data-i="2" style="left:915px;top:560px;font-size:44px">${H.esc(d.vs)}</div>
${side(d.right, 3, 1030)}
<div class="abs r" data-i="4" style="left:120px;top:910px;font:700 40px var(--disp)">${H.esc(d.verdict)} <span class="cy">${H.A(d.verdictAccent)}</span></div>`;
  },
};
