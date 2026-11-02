/* peer-copy · vídeo 09 · dependencias de Pi en peerDependencies (tu paquete usa la copia de Pi) frente a dependencies (tu paquete
   lleva su propia copia y quedan duplicadas). Datos: kicker, title, host, pkg, libs[] (1–3), left / right = { k, note }, dup, warn.
   Pasos: 1 izquierda, 2 derecha, 3 duplicado, 4 aviso de Pi. */
TPL['peer-copy'] = {
  def: {
    kicker: 'peerDependencies', title: 'Una sola copia, [[la de Pi]]',
    host: 'Pi', pkg: 'csn-extensiones',
    libs: ['pi-coding-agent', 'typebox'],
    left: { k: 'peerDependencies · "*"', note: 'Tu paquete usa la copia que pone Pi' },
    right: { k: 'dependencies', note: 'Tu paquete lleva su propia copia' },
    dup: 'clases y registros duplicados', warn: 'Pi te avisa si lo detecta',
  },
  html(d, H) {
    const lib = (t, cls = '', extra = '') => `<span class="chip ${cls}" style="font-size:24px;${extra}">${H.esc(t)}</span>`;
    const libs = (extra) => `<div class="flex" style="gap:12px;flex-wrap:wrap;margin-top:16px">${d.libs.map(t => lib(t, '', extra)).join('')}</div>`;
    const panel = (x, side, i, tone) => `<div class="g r" data-i="${i}" style="left:${x}px;top:320px;width:800px;height:620px;border-top:6px solid var(--${tone})"><div class="k ${tone === 'ok' ? 'ok' : 'bad'}">${H.A(side.k)}</div><div class="s" style="font-size:26px;margin-top:12px">${H.A(side.note)}</div></div>`;
    const host = (x, i) => `<div class="abs r" data-i="${i}" style="left:${x}px;top:470px;width:720px;height:170px;border-radius:16px;border:1.5px solid var(--cyan);background:rgba(30,58,138,.38);padding:22px 28px"><div class="flex" style="gap:14px">${H.ICO('pi', 36)}<span class="k cy">${H.esc(d.host)}</span></div>${libs('')}</div>`;
    return `${H.HEAD(d)}
${panel(120, d.left, 1, 'ok')}${panel(1000, d.right, 2, 'red')}
${host(160, 1)}${host(1040, 2)}
<div class="abs r" data-i="1" style="left:160px;top:730px;width:720px;height:110px;border-radius:16px;border:1.5px solid var(--line);background:rgba(15,23,42,.6);padding:0 28px;display:flex;align-items:center;gap:14px">${H.GLYPH('cube', 36)}<span class="mono" style="font-size:26px">${H.esc(d.pkg)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#34d399" stroke-width="3"><path class="draw" data-i="1" d="M520 730 V650"/><path d="M510 662 L520 648 L530 662" class="draw" data-i="1"/></svg>
<div class="abs r" data-i="1" style="left:540px;top:670px"><span class="mono ok" style="font-size:22px">usa la de Pi</span></div>
<div class="abs r" data-i="2" style="left:1040px;top:670px;width:720px;height:200px;border-radius:16px;border:1.5px solid var(--line);background:rgba(15,23,42,.6);padding:22px 28px"><div class="flex" style="gap:14px">${H.GLYPH('cube', 36)}<span class="mono" style="font-size:26px">${H.esc(d.pkg)}</span></div>
<div class="flex" style="gap:12px;flex-wrap:wrap;margin-top:16px">${d.libs.map(t => lib(t)).join('')}</div></div>
<div class="abs r" data-i="3" style="left:1040px;top:470px;width:720px;height:170px;border-radius:16px;border:3px solid var(--red)"></div>
<div class="abs r" data-i="3" style="left:1040px;top:670px;width:720px;height:200px;border-radius:16px;border:3px solid var(--red)"></div>
<div class="abs r" data-i="3" style="left:1040px;top:880px;width:720px;text-align:center"><span class="mono bad" style="font-size:24px">✕ ${H.A(d.dup)}</span></div>
<div class="abs r" data-i="4" style="left:1300px;top:336px;width:470px;text-align:right"><span class="pill" style="font-size:22px;color:var(--amber);border-color:var(--amber)">${H.A(d.warn)}</span></div>`;
  },
};
