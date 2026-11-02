/* key-proxy · vídeo 05 · Docker Sandboxes: el sandbox lleva un valor de relleno y el proxy pone la clave real solo en las
   peticiones al proveedor. Datos: kicker, title, host, sandbox = { label, logo, agent, env, envNote }, proxy, key, provider, other,
   real, fake, cmd = { label, t }. Pasos: 1 Pi en el sandbox, 2 proxy, 3 clave en el host, 4 relleno, 5 al proveedor con la clave real,
   6 otro destino con el relleno, 7 comando. Iconos: computer-desktop (host), key (clave), cpu-chip (proveedor), globe-alt (exterior). */
TPL['key-proxy'] = {
  def: {
    kicker: 'Docker Sandboxes · sbx', title: 'La clave real [[se queda fuera]]',
    host: 'tu máquina · host',
    sandbox: { label: 'sandbox', logo: 'docker', agent: 'Pi entero', env: 'valor de relleno', envNote: 'con la forma de una clave' },
    proxy: 'proxy', key: 'clave real', provider: 'proveedor', other: 'otro destino',
    real: 'clave real', fake: 'relleno',
    cmd: { label: 'se arranca con', t: 'sbx run --kit "docker.io/sbx/pi-kit:latest" pi' },
  },
  html(d, H) {
    const S = d.sandbox, tag = (x, y, i, t, c) => `<div class="abs r" data-i="${i}" style="left:${x}px;top:${y}px;width:270px;text-align:center"><span class="chip" style="font-size:22px;padding:6px 14px;color:${c};border-color:${c}">${H.A(t)}</span></div>`;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:1160px;height:560px"><div class="flex" style="gap:14px">${H.GLYPH('computer-desktop', 34)}<span class="k">${H.A(d.host)}</span></div></div>
<div class="r" data-i="1" style="position:absolute;left:150px;top:390px;width:520px;height:460px;border:3px dashed var(--cyan);border-radius:22px;background:rgba(96,165,250,.06)"></div>
<div class="abs flex r" data-i="1" style="left:180px;top:414px;gap:14px">${H.ICO(S.logo, 40)}<span class="k">${H.A(S.label)}</span></div>
<div class="abs flex r" data-i="1" style="left:180px;top:490px;width:460px;height:110px;padding:0 26px;gap:20px;border-radius:14px;background:rgba(15,23,42,.6);border:1.5px solid var(--line)">${H.ICO('pi', 56)}<span style="font:700 34px var(--disp)">${H.A(S.agent)}</span></div>
<div class="abs r" data-i="4" style="left:180px;top:630px;width:460px;height:190px;padding:24px 26px;border-radius:14px;background:rgba(251,191,36,.08);border:2px solid var(--amber)">
<div class="k am">entorno</div><div class="mono am" style="font-size:32px;font-weight:700;margin-top:12px">${H.A(S.env)}</div><div class="s" style="font-size:24px;margin-top:8px">${H.A(S.envNote)}</div></div>
<div class="g lit r" data-i="2" style="left:830px;top:480px;width:330px;height:130px;display:grid;place-items:center"><span class="t" style="font-size:40px">${H.A(d.proxy)}</span></div>
<div class="abs flex r" data-i="3" style="left:830px;top:690px;width:330px;height:110px;padding:0 26px;gap:16px;border-radius:14px;background:rgba(52,211,153,.10);border:2px solid var(--ok)">${H.GLYPH('key', 38, 'ok')}<span class="mono ok" style="font-size:28px;font-weight:700">${H.A(d.key)}</span></div>
<div class="g r" data-i="5" style="left:1440px;top:480px;width:360px;height:130px;padding:0 30px;display:flex;align-items:center;gap:18px">${H.GLYPH('cpu-chip', 44)}<span style="font:700 32px var(--disp)">${H.A(d.provider)}</span></div>
<div class="g r" data-i="6" style="left:1440px;top:690px;width:360px;height:130px;padding:0 30px;display:flex;align-items:center;gap:18px">${H.GLYPH('globe-alt', 44)}<span style="font:700 32px var(--disp)">${H.A(d.other)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M670 545 H828"/><path class="draw" data-i="2" d="M814 533 L828 545 L814 557"/>
<path class="draw" data-i="3" d="M995 612 V688" stroke="#34d399" stroke-dasharray="8 8"/>
<path class="draw" data-i="5" d="M1162 545 H1438"/><path class="draw" data-i="5" d="M1424 533 L1438 545 L1424 557"/>
<path class="draw" data-i="6" d="M1162 580 C1260 580 1300 755 1438 755"/><path class="draw" data-i="6" d="M1424 743 L1438 755 L1424 767"/></svg>
${tag(1166, 488, 5, d.real, 'var(--ok)')}${tag(1235, 612, 6, d.fake, 'var(--amber)')}${tag(615, 488, 4, d.fake, 'var(--amber)')}
<div class="abs flex r" data-i="7" style="left:120px;top:920px;width:1680px;justify-content:center;gap:22px"><span class="k">${H.A(d.cmd.label)}</span><span class="chip" style="color:var(--ink)">${H.esc(d.cmd.t)}</span></div>`;
  },
};
