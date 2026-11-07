/* profile-routing · vídeo 11 · una variable de entorno exportada: el perfil por defecto la sigue hasta otro
   directorio (y lo migraría); un perfil con nombre la ignora y usa el suyo. Datos: kicker, title, env = { k, name, value },
   dflt = { cmd, k, how, dest, path, warn[] (1–2) }, named = { cmd, k, how, dest, path, note }. Pasos: 1 variable, 2 perfil por defecto,
   3 su destino, 4 migración, 5 perfil con nombre (variable ignorada), 6 su destino. */
TPL['profile-routing'] = {
  def: {
    kicker: 'El detalle de la variable', title: 'Un perfil con nombre [[ignora la variable]]',
    env: { k: 'exportada en nuestra terminal', name: 'PI_CODING_AGENT_DIR', value: '= /tmp/csn/pi-agent' },
    dflt: { cmd: 'omp', k: 'perfil por defecto', how: 'sigue la variable', dest: 'directorio de Pi del curso', path: '/tmp/csn/pi-agent',
      warn: ['settings.json → YAML', 'y lo renombraría'] },
    named: { cmd: 'omp --profile demo', k: 'perfil con nombre', how: 'ignora la variable', dest: 'perfil demo', path: '~/.omp/profiles/demo/', note: 'sus propios ajustes y credenciales' },
  },
  html(d, H) {
    const E = d.env, A = d.dflt, B = d.named;
    const warn = A.warn.slice(0, 2).map(w => `<div class="flex" style="margin-top:12px;gap:12px">${H.GLYPH('exclamation-triangle', 30, 'am')}<span class="mono am" style="font-size:24px">${H.A(w)}</span></div>`).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:520px;width:560px;height:170px;padding:24px 30px"><div class="k" style="font-size:22px">${H.A(E.k)}</div>
<div class="mono cy" style="font-size:28px;font-weight:700;margin-top:16px">${H.esc(E.name)}</div><div class="mono" style="font-size:26px;margin-top:6px">${H.esc(E.value)}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M680 580 C730 580 700 420 750 420"/>
<path class="draw" data-i="3" d="M1170 420 H1270"/>
<path class="draw" data-i="5" d="M680 640 C720 640 700 770 730 790" stroke="#f87171"/>
<path class="draw" data-i="6" d="M1170 830 H1270"/></svg>
<div class="abs t bad r" data-i="5" style="left:724px;top:${790 - 34}px;font-size:44px;line-height:60px">✕</div>
<div class="g r" data-i="2" style="left:750px;top:330px;width:420px;height:180px;padding:24px 28px"><div class="mono" style="font-size:32px;font-weight:700">${H.esc(A.cmd)}</div><div class="k" style="font-size:22px;margin-top:16px">${H.A(A.k)}</div><div class="s" style="font-size:24px;margin-top:8px">${H.A(A.how)}</div></div>
<div class="g r" data-i="5" style="left:770px;top:740px;width:400px;height:180px;padding:24px 28px"><div class="mono" style="font-size:28px;font-weight:700;white-space:nowrap">${H.esc(B.cmd)}</div><div class="k" style="font-size:22px;margin-top:16px">${H.A(B.k)}</div><div class="s ok" style="font-size:24px;margin-top:8px">${H.A(B.how)}</div></div>
<div class="g r" data-i="3" style="left:1270px;top:320px;width:530px;height:250px;padding:24px 30px;border-top:6px solid var(--amber)"><div class="k">${H.A(A.dest)}</div><div class="mono" style="font-size:28px;margin-top:14px">${H.esc(A.path)}</div><div class="r" data-i="4" style="margin-top:12px">${warn}</div></div>
<div class="g lit r" data-i="6" style="left:1270px;top:720px;width:530px;height:220px;padding:24px 30px;border-top:6px solid var(--ok)"><div class="k">${H.A(B.dest)}</div><div class="mono ok" style="font-size:28px;margin-top:14px">${H.esc(B.path)}</div><div class="s" style="font-size:26px;margin-top:14px">${H.A(B.note)}</div></div>`;
  },
};
