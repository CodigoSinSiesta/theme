/* late-budget · vídeo 15 · línea de tiempo de un objetivo creado sin presupuesto: trabaja desde el primer momento y el
   límite llega tarde; debajo, el camino que lo pone desde el principio. Datos: kicker, title, start = { cmd, note }, work, at (0,3–0,8:
   dónde llega el presupuesto), budget = { cmd, label }, gap, esc = { key, note, pause }, alt = { cmd, note }.
   Pasos: 1 objetivo sin presupuesto, 2 trabaja, 3 presupuesto tardío, 4 tramo sin límite, 5 Esc, 6 pausa, 7 el otro camino. */
TPL['late-budget'] = {
  def: {
    kicker: 'Lo delicado', title: 'El presupuesto [[llega tarde]]',
    start: { cmd: '/goal «objetivo»', note: 'no budget' }, work: 'empieza a trabajar en el acto', at: 0.67,
    budget: { cmd: '/goal budget', label: 'con límite' }, gap: 'sin límite',
    esc: { key: 'Esc', note: 'no sirve para ganar tiempo', pause: 'interrumpir pausa el objetivo' },
    alt: { cmd: '/guided-goal', note: 'presupuesto desde el principio' },
  },
  html(d, H) {
    const x0 = 200, x1 = 1760, xb = Math.round(x0 + (x1 - x0) * Math.min(0.8, Math.max(0.3, d.at)));
    const dot = (x, y, i, c) => `<div class="abs r" data-i="${i}" style="left:${x - 14}px;top:${y - 14}px;width:28px;height:28px;border-radius:50%;background:#16264a;border:4px solid ${c}"></div>`;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:300px;width:1680px;height:404px;padding:0"></div>
<div class="abs r" data-i="4" style="left:${x0}px;top:404px;width:${xb - x0}px;height:190px;border-radius:14px;background:rgba(248,113,113,.10);border:2px dashed var(--red);padding:20px 28px"><div class="flex" style="gap:12px">${H.GLYPH('exclamation-triangle', 34, 'bad')}<span class="k bad">${H.esc(d.gap)}</span></div></div>
<div class="abs r" data-i="3" style="left:${xb}px;top:404px;width:${x1 - xb}px;height:190px;border-radius:14px;background:rgba(52,211,153,.08);border:2px solid var(--ok);padding:20px 28px;text-align:right"><span class="k ok">${H.esc(d.budget.label)}</span></div>
<i class="bx" data-i="2" style="position:absolute;left:${x0}px;top:548px;width:${x1 - x0}px;height:24px;border-radius:12px;background:linear-gradient(90deg,rgba(96,165,250,.85),rgba(96,165,250,.45))"></i>
<div class="abs s r" data-i="2" style="left:${x0 + 40}px;top:486px;font-size:26px">${H.esc(d.work)}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<line class="draw" data-i="1" x1="${x0}" y1="386" x2="${x0}" y2="546"/>
<line class="draw" data-i="3" x1="${xb}" y1="386" x2="${xb}" y2="600" stroke="#34d399" stroke-width="4"/></svg>
${dot(x0, 560, 1, 'var(--red)')}
<div class="abs r flex" data-i="1" style="left:160px;top:324px;gap:24px"><span class="chip">${H.esc(d.start.cmd)}</span><span class="mono bad" style="font-size:26px">${H.esc(d.start.note)}</span></div>
<div class="abs r" data-i="3" style="left:${xb - 200}px;top:324px;width:400px;text-align:center"><span class="chip">${H.esc(d.budget.cmd)}</span></div>
<div class="abs r flex" data-i="5" style="left:${x0 + 120}px;top:612px;gap:22px"><span class="kc" style="font-size:28px;padding:16px 26px;border-bottom-width:6px">${H.esc(d.esc.key)}</span><span class="s" style="font-size:26px">${H.esc(d.esc.note)}</span></div>
<div class="abs r flex" data-i="6" style="left:${x0 + 640}px;top:628px;gap:14px">${H.GLYPH('pause-circle', 38, 'am')}<span class="s am" style="font-size:26px">${H.esc(d.esc.pause)}</span></div>
<div class="g r" data-i="7" style="left:120px;top:730px;width:1680px;height:204px;padding:0"></div>
<div class="abs r flex" data-i="7" style="left:160px;top:756px;gap:24px"><span class="chip">${H.esc(d.alt.cmd)}</span><span class="s" style="font-size:26px">${H.esc(d.alt.note)}</span></div>
<div class="abs r" data-i="7" style="left:${x0}px;top:832px;width:${x1 - x0}px;height:68px;border-radius:14px;border:2px solid var(--ok);background:rgba(52,211,153,.08)"></div>
<i class="bx" data-i="7" style="position:absolute;left:${x0 + 14}px;top:854px;width:${x1 - x0 - 28}px;height:24px;border-radius:12px;background:linear-gradient(90deg,rgba(96,165,250,.85),rgba(96,165,250,.45))"></i>`;
  },
};
