/* base-judges · vídeo 26 · lo que juzga viene de la rama base: la petición solo trae el trabajo del agente y lo que
   lo verifica se commiteó antes en la base. Datos: kicker, title, req = { k, cmd, files[] (3–4), stat, missingK, commit },
   base = { k, ref, note, files[] (2–3), graph = { base, work } }, arrow, rule = { k, t }. Pasos: 1 la petición y lo que no
   aparece, 2 la rama base (antes), 3 la petición solo contiene el commit del agente, 4 lo que lo verifica viene de la base,
   5 la regla del workflow. */
TPL['base-judges'] = {
  def: {
    kicker: 'Lo que no aparece en la lista de ficheros', title: 'Lo que verifica [[viene de la base]]',
    req: { k: 'la petición', cmd: 'git request-pull final revision ticket-005',
      files: ['funcionalidades.json', 'progreso.md', 'src/carrito.js', 'test/carrito.test.js'], stat: '4 ficheros · +74 −5',
      missingK: 'no aparecen', commit: 'afc315d · el commit del agente' },
    base: { k: 'rama base · final', ref: '6ff1952 · rubrica-ticket-005', note: 'Commiteado antes de que empezara ningún agente.',
      files: ['rubricas/ticket-005.md', 'aceptacion/ticket-005.mjs', 'verificar.sh'],
      graph: { base: '6ff1952 · final', work: 'afc315d · ticket-005' } },
    arrow: 'verifica',
    rule: { k: 'revision-pi.yml · la misma regla', t: 'Lo que juzga no puede venir [[de lo que se juzga]].' },
  },
  html(d, H) {
    const R = d.req, B = d.base, G = B.graph || {}, TOP = 320, HT = 580;
    const row = (t, extra = '') => `<div class="mono" style="font-size:26px;line-height:42px;${extra}">${H.esc(t)}</div>`;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:${TOP}px;width:780px;height:${HT}px"><div class="flex" style="justify-content:space-between;height:50px"><span class="k">${H.esc(R.k)}</span><span class="chip r" data-i="3" style="font-size:22px;border-color:var(--cyan);color:var(--cyan)">${H.esc(R.commit)}</span></div>
<div class="mono" style="font-size:22px;margin-top:8px;color:var(--pale3)">${H.esc(R.cmd)}</div>
<div style="margin-top:12px">${R.files.slice(0, 4).map(f => row(f)).join('')}</div><div class="mono cy" style="font-size:24px;margin-top:4px">${H.esc(R.stat)}</div>
<div style="margin-top:14px;border:2px dashed rgba(248,113,113,.6);border-radius:14px;padding:18px 24px 12px"><div class="k bad">${H.esc(R.missingK)}</div>${B.files.slice(0, 3).map(f => row(f, 'color:var(--pale3);text-decoration:line-through;text-decoration-color:var(--red)')).join('')}</div></div>
<div class="abs r" data-i="3" style="left:120px;top:${TOP}px;width:780px;height:${HT}px;border-radius:22px;border:3px solid var(--cyan);box-shadow:0 0 40px rgba(96,165,250,.45)"></div>
<div class="g lit r" data-i="2" style="left:1060px;top:${TOP}px;width:740px;height:${HT}px"><div class="k cy">${H.esc(B.k)}</div><div class="mono" style="font-size:26px;margin-top:12px">${H.esc(B.ref)}</div><div class="s" style="font-size:24px;margin-top:6px">${H.A(B.note)}</div>
<div style="margin-top:20px">${B.files.slice(0, 3).map(f => `<div class="flex" style="gap:14px;line-height:50px">${H.GLYPH('check-circle', 28, 'ok')}<span class="mono" style="font-size:26px">${H.esc(f)}</span></div>`).join('')}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4">
<line class="draw" data-i="2" x1="1100" y1="760" x2="1760" y2="760"/>
<path class="draw" data-i="3" d="M1170 760 C1250 760 1290 830 1370 830 H1420"/>
<line class="draw" data-i="4" x1="1054" y1="640" x2="910" y2="640"/><path class="draw" data-i="4" d="M926 626 L908 640 L926 654"/></svg>
<div class="abs r" data-i="2" style="left:1156px;top:746px;width:28px;height:28px;border-radius:50%;background:var(--cyan);box-shadow:0 0 18px var(--cyan)"></div>
<div class="abs mono r" data-i="2" style="left:1100px;top:700px;font-size:24px;color:var(--pale)">${H.esc(G.base || '')}</div>
<div class="abs r" data-i="3" style="left:1416px;top:816px;width:28px;height:28px;border-radius:50%;border:4px solid var(--cyan);background:#16264a"></div>
<div class="abs mono cy r" data-i="3" style="left:1458px;top:812px;font-size:24px">${H.esc(G.work || '')}</div>
<div class="abs k cy r" data-i="4" style="left:900px;top:586px;width:160px;text-align:center">${H.esc(d.arrow)}</div>
<div class="g r flex" data-i="5" style="left:120px;top:916px;width:1680px;height:80px;padding:0 34px;gap:22px">${H.GLYPH('scale', 40)}<span class="k">${H.esc(d.rule.k)}</span><span class="s" style="color:var(--ink)">${H.A(d.rule.t)}</span></div>`;
  },
};
