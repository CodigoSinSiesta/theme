/* upstream-sync · vídeo 11 · dos ramas en paralelo: el original y su fork, con una sincronización completa y
   piezas sueltas que siguen cruzando. Datos: kicker, title, up/down = { logo, name }, fork, forkWhen, sync = { k, hash, when },
   picks (2–3, posiciones de las piezas sueltas), pick (nota de la pieza que se nombra), credits[] = { t, d } (2).
   Pasos: 1 ramas y fork, 2 sincronización, 3 piezas sueltas, 4 la pieza nombrada, 5 y 6 créditos. */
TPL['upstream-sync'] = {
  def: {
    kicker: 'Un fork sin ruptura', title: 'Sigue trayendo [[cambios de Pi]]',
    up: { logo: 'pi', name: 'Pi' }, down: { logo: 'omp', name: 'oh my pi' },
    fork: 'fork', forkWhen: '2 de enero de 2026',
    sync: { k: 'sincronización completa', hash: 'b21b42d', when: 'marzo' },
    picks: 2, pick: 'calentamiento de la caché · vídeo 04',
    credits: [{ t: 'Stencil Labs', d: 'lo publica, con licencia MIT' }, { t: 'Mario Zechner', d: 'el autor de Pi, entre sus colaboradores' }],
  },
  html(d, H) {
    const YU = 400, YD = 650, n = Math.max(1, Math.min(3, d.picks)), px = k => 1320 + k * (n > 2 ? 140 : 200);
    const dots = (y, from) => [0, 1, 2, 3, 4, 5, 6, 7].map(k => from + k * 170).filter(x => x < 1760).map(x => `<circle cx="${x}" cy="${y}" r="9" fill="#16264a" stroke="#60a5fa" stroke-width="3"/>`).join('');
    const picks = Array.from({ length: n }, (_, k) => `<path class="draw" data-i="3" d="M${px(k)} ${YU + 12} C${px(k)} ${YU + 130} ${px(k) + 60} ${YD - 130} ${px(k) + 60} ${YD - 14}" marker-end="url(#us-a)"/>`).join('');
    const lab = (o, y) => `<div class="abs flex r" data-i="1" style="left:120px;top:${y - 40}px;width:300px;gap:18px">${H.ICO(o.logo, 72)}<span class="t" style="font-size:34px">${H.A(o.name)}</span></div>`;
    const cred = d.credits.slice(0, 2).map((c, k) => `<div class="g r" data-i="${5 + k}" style="left:${120 + k * 860}px;top:800px;width:820px;height:130px;padding:24px 34px"><div class="t" style="font-size:36px">${H.A(c.t)}</div><div class="s" style="font-size:26px;margin-top:6px">${H.A(c.d)}</div></div>`).join('');
    const lp = px(n - 1) + 60;
    return `${H.HEAD(d)}
${lab(d.up, YU)}${lab(d.down, YD)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4">
<defs><marker id="us-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#60a5fa"/></marker></defs>
<line class="draw" data-i="1" x1="440" y1="${YU}" x2="1800" y2="${YU}"/>
<path class="draw" data-i="1" d="M470 ${YU} C470 ${YU + 140} 560 ${YD} 650 ${YD} H1800"/>
<g class="r" data-i="1">${dots(YU, 470)}${dots(YD, 810)}</g>
${picks}</svg>
<div class="abs r" data-i="1" style="left:540px;top:${(YU + YD) / 2 - 30}px;width:320px"><div class="k cy">${H.A(d.fork)}</div><div class="k" style="margin-top:8px">${H.A(d.forkWhen)}</div></div>
<div class="g lit r" data-i="2" style="left:880px;top:${YU + 20}px;width:380px;height:${YD - YU - 40}px;padding:24px 26px;text-align:center"><div class="k" style="font-size:22px">${H.A(d.sync.k)}</div><div class="mono cy" style="font-size:32px;font-weight:700;margin-top:22px">${H.esc(d.sync.hash)}</div><div class="s" style="font-size:26px;margin-top:8px">${H.A(d.sync.when)}</div></div>
<div class="abs r" data-i="4" style="left:1100px;top:${YD + 30}px;width:700px;text-align:right"><span class="chip" style="font-size:22px">${H.A(d.pick)}</span></div>
${cred}`;
  },
};
