/* mount-map · vídeo 05 · qué ve un contenedor: la carpeta del host montada, un volumen con nombre y lo que se queda fuera.
   Datos: host = { label, icon, rows[] (2–3; la 1.ª → box.rows[0]), note }, box = { label, logo, rows[2] }, volume = { label, icon, name, chips[] (2–3), note },
   run = { label, cmd }. Pasos: 1 carpeta → /workspace, 2 lo demás no entra, 3 volumen, 4 qué guarda, 5 sobrevive, 6 imagen y modelo. */
TPL['mount-map'] = {
  def: {
    kicker: 'Los dos volúmenes', title: 'Del host, [[solo la carpeta]]',
    host: { label: 'tu máquina', icon: 'computer-desktop', rows: ['~/csn/tienda', '~/csn/fuera/secreto.txt', '~/.pi/agent'], note: 'El contenedor no ve nada más.' },
    box: { label: 'contenedor', logo: 'docker', rows: ['/workspace', '/root/.pi/agent'] },
    volume: { label: 'volumen', icon: 'circle-stack', name: 'pi-agent-home', chips: ['ajustes', 'sesiones', 'credenciales'], note: 'sobrevive entre ejecuciones' },
    run: { label: 'imagen y modelo', cmd: 'pi-sandbox --model deepseek/deepseek-flash' },
  },
  html(d, H) {
    const y = k => 410 + k * 110, row = (x, k, inner, extra = '') => `<div class="abs flex" style="left:${x}px;top:${y(k)}px;width:540px;height:76px;padding:0 24px;justify-content:space-between;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);${extra}">${inner}</div>`;
    const host = d.host.rows.map((t, k) => row(150, k, `<span class="mono" style="font-size:26px">${H.esc(t)}</span>${k ? `<span class="r" data-i="2">${H.GLYPH('x-circle', 34, 'bad')}</span>` : ''}`, k ? '' : 'border-color:var(--cyan)')).join('');
    const ny = y(d.host.rows.length) + 4, V = d.volume;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:600px;height:500px"><div class="flex" style="gap:14px">${H.GLYPH(d.host.icon, 34)}<span class="k">${H.A(d.host.label)}</span></div></div>
<div class="r" data-i="1" style="position:absolute;left:1200px;top:320px;width:600px;height:500px;border:3px dashed var(--cyan);border-radius:26px;background:rgba(96,165,250,.06)"></div>
<div class="abs flex r" data-i="1" style="left:1234px;top:346px;gap:14px">${H.ICO(d.box.logo, 40)}<span class="k">${H.A(d.box.label)}</span></div>
<div class="r" data-i="1">${host}${row(1230, 0, `<span class="mono cy" style="font-size:26px">${H.esc(d.box.rows[0])}</span>`, 'border-color:var(--cyan)')}</div>
<div class="r" data-i="3">${row(1230, 2, `<span class="mono cy" style="font-size:26px">${H.esc(d.box.rows[1])}</span>`, 'border-color:var(--cyan)')}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="1" d="M690 ${y(0) + 38} H1230"/><path class="draw" data-i="3" d="M1170 ${y(2) + 38} H1230"/></svg>
<div class="abs s r" data-i="2" style="left:150px;top:${ny}px;width:540px;font-size:26px">${H.A(d.host.note)}</div>
<div class="g r" data-i="3" style="left:780px;top:540px;width:390px;height:280px"><div class="flex" style="gap:14px">${H.GLYPH(V.icon, 34)}<span class="k">${H.A(V.label)}</span></div>
<div class="mono" style="font-size:30px;font-weight:700;margin-top:14px">${H.esc(V.name)}</div>
<div class="flex" style="flex-wrap:wrap;gap:10px;margin-top:16px">${V.chips.map(c => `<span class="chip r" data-i="4" style="font-size:22px;padding:8px 16px">${H.A(c)}</span>`).join('')}</div></div>
<div class="abs r" data-i="5" style="left:675px;top:842px;width:600px;text-align:center"><span class="pill" style="display:inline-block;color:var(--ok);border-color:var(--ok)">${H.A(V.note)}</span></div>
<div class="abs flex r" data-i="6" style="left:120px;top:924px;width:1680px;justify-content:center;gap:22px"><span class="k">${H.A(d.run.label)}</span><span class="chip" style="color:var(--ink)">${H.esc(d.run.cmd)}</span></div>`;
  },
};
