/* retry-backoff · vídeo 12 · los reintentos automáticos que van antes de /retry: un turno falla por un error pasajero,
   oh my pi reintenta solo hasta `tries` veces con esperas que empiezan en la primera y se duplican hasta un tope, y cuando se
   agotan entras tú con /retry. Datos: kicker, title, turn, kErrors, errors[] (1–3), tries (6–10), waits[] (una por intento; si
   faltan, se repite la última), kTries, cap, cmd = { keys[] (1–2), note }, spent. Pasos: 1 turno fallido, 2 errores pasajeros,
   3 intentos, 4 primera espera, 5 el resto de esperas y el tope, 6 /retry, 7 se agotan. */
TPL['retry-backoff'] = {
  def: {
    kicker: '/retry · reintentar', title: 'Primero reintenta solo, [[luego tú]]',
    turn: 'El último turno falló',
    kErrors: 'errores pasajeros', errors: ['límites de peticiones', 'servidores saturados', 'cortes de red'],
    tries: 10, waits: ['0,5 s', '1 s', '2 s', '4 s', '8 s'], kTries: 'reintentos automáticos', cap: 'tope de 8 s',
    cmd: { keys: ['/retry', 'F5'], note: 'cuando se agotan esos intentos' }, spent: 'intentos agotados',
  },
  html(d, H) {
    const n = Math.max(6, Math.min(10, d.tries)), S = 84, gap = 72, step = S + gap;
    const x0 = 120 + Math.round((1680 - ((n + 1) * S + n * gap)) / 2), top = 600;
    const X = i => x0 + i * step, C = i => X(i) + S / 2;
    const wait = i => d.waits[Math.min(i, d.waits.length - 1)];
    const arcs = Array.from({ length: n }, (_, i) => `<path class="draw" data-i="${i ? 5 : 4}" d="M${C(i)} ${top - 4} C${C(i)} ${top - 50} ${C(i + 1)} ${top - 50} ${C(i + 1)} ${top - 10}"/><path class="draw" data-i="${i ? 5 : 4}" d="M${C(i + 1) - 9} ${top - 22} L${C(i + 1)} ${top - 8} L${C(i + 1) + 9} ${top - 22}"/>`).join('');
    const labels = Array.from({ length: n }, (_, i) => `<div class="abs mono r" data-i="${i ? 5 : 4}" style="left:${(C(i) + C(i + 1)) / 2 - 60}px;top:${top - 92}px;width:120px;text-align:center;font-size:24px;color:${i ? 'var(--sky)' : 'var(--cyan)'}">${H.esc(wait(i))}</div>`).join('');
    const squares = Array.from({ length: n }, (_, i) => `<div class="sq abs" style="left:${X(i + 1)}px;top:${top}px;margin:0">${i + 1}</div>`).join('');
    const spent = Array.from({ length: n }, (_, i) => `<div class="abs" style="left:${X(i + 1)}px;top:${top}px;width:${S}px;height:${S}px;border-radius:14px;border:3px solid var(--red);background:rgba(248,113,113,.18)"></div>`).join('');
    const last = C(n);
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:1680px;height:150px;padding:0 34px">
  <div class="abs flex" style="left:34px;top:0;height:150px;gap:18px">${H.GLYPH('x-circle', 48, 'bad')}<span class="s" style="font-size:32px;color:var(--ink)">${H.A(d.turn)}</span></div>
  <div class="abs r" data-i="2" style="left:600px;top:26px;width:1040px"><div class="k am">${H.A(d.kErrors)}</div>
    <div class="flex" style="gap:14px;margin-top:14px">${d.errors.map(e => `<span class="chip" style="font-size:24px">${H.esc(e)}</span>`).join('')}</div></div>
</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${arcs}
  <path class="draw" data-i="7" stroke="#f87171" d="M${last} ${top + S + 8} V${top + S + 92}"/><path class="draw" data-i="7" stroke="#f87171" d="M${last - 10} ${top + S + 78} L${last} ${top + S + 94} L${last + 10} ${top + S + 78}"/></svg>
<div class="r" data-i="1"><div class="abs" style="left:${X(0)}px;top:${top}px;width:${S}px;height:${S}px;border-radius:14px;border:3px solid var(--red);background:rgba(248,113,113,.18);display:grid;place-items:center">${H.GLYPH('x-circle', 44, 'bad')}</div></div>
<div class="r" data-i="3">${squares}
  <div class="abs k" style="left:${X(1)}px;top:${top + S + 22}px">${H.A(d.kTries)} · ${n}</div></div>
${labels}
<div class="abs k am r" data-i="5" style="left:${X(1)}px;top:${top + S + 62}px">${H.A(d.cap)}</div>
<div class="r" data-i="7">${spent}</div>
<div class="g lit r" data-i="6" style="left:${Math.min(1800 - 760, last - 560)}px;top:790px;width:760px;height:200px;padding:28px 34px">
  <div class="flex" style="gap:22px">${d.cmd.keys.map(k => `<span class="kc">${H.esc(k)}</span>`).join('')}</div>
  <div class="s" style="font-size:28px;margin-top:14px">${H.A(d.cmd.note)}</div></div>
<div class="abs r" data-i="7" style="left:${X(1)}px;top:880px"><span class="pill" style="color:var(--red);border-color:var(--red)">✕ ${H.A(d.spent)}</span></div>`;
  },
};
