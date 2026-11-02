/* load-gates · vídeo 05 · ficheros de una carpeta que pasan por dos barreras de carga camino del modelo; cada uno se para en la suya.
   Datos: kicker, title, source = { label, icon }, target = { label, icon }, gates[2] = { label, sub }, items[] = { t, stop: 0|1 } (2–4, primero los de la
   barrera 0), tag, empty. Pasos: 1 carpeta y barrera 1, 2 lo que pasa llega, 3 etiqueta, 4 barrera 2, 5 lo que para la barrera 2. */
TPL['load-gates'] = {
  def: {
    kicker: 'Primera lección', title: 'La confianza [[no filtra]] lo que lee',
    source: { label: 'la carpeta del proyecto', icon: 'folder' }, target: { label: 'contexto del modelo', icon: 'cpu-chip' },
    gates: [{ label: 'sin confianza', sub: '-na' }, { label: '--no-context-files', sub: '-nc' }],
    items: [{ t: '.pi/extensions/', stop: 0 }, { t: '.pi/settings.json', stop: 0 }, { t: 'AGENTS.md', stop: 1 }, { t: 'CLAUDE.md', stop: 1 }],
    tag: 'no fiable', empty: 'Ningún fichero de contexto',
  },
  html(d, H) {
    const n = d.items.length, y = k => 420 + k * 100, yc = k => y(k) + 38, gx = [840, 1160], bot = y(n) + 10;
    const row = (x, w, k, inner, extra = '') => `<div class="abs flex" style="left:${x}px;top:${y(k)}px;width:${w}px;height:76px;padding:0 24px;justify-content:space-between;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);${extra}">${inner}</div>`;
    const src = d.items.map((it, k) => row(150, 500, k, `<span class="mono" style="font-size:26px">${H.esc(it.t)}</span>`)).join('');
    const block = (k, g, i) => `<path class="draw" data-i="${i}" d="M650 ${yc(k)} H${gx[g]}" stroke="#f87171"/>`;
    const lines1 = d.items.map((it, k) => it.stop === 0 ? block(k, 0, 1) : '').join(''), lines5 = d.items.map((it, k) => it.stop === 1 ? block(k, 1, 5) : '').join('');
    const pass = d.items.map((it, k) => it.stop === 1 ? `<path class="draw" d="M650 ${yc(k)} H1390"/>` : '').join('');
    const xs = (g, i) => d.items.map((it, k) => it.stop === g ? `<div class="abs t bad r" data-i="${i}" style="left:${gx[g] - 22}px;top:${yc(k) - 28}px;width:44px;text-align:center;font-size:44px;line-height:56px">✕</div>` : '').join('');
    const tgt = d.items.map((it, k) => it.stop === 1 ? `<div class="r" data-i="2" data-off="5">${row(1390, 380, k, `<span class="mono" style="font-size:26px">${H.esc(it.t)}</span><span class="chip r" data-i="3" style="font-size:22px;padding:6px 14px;border-color:var(--amber);color:var(--amber)">${H.A(d.tag)}</span>`, 'border-color:var(--cyan)')}</div>` : '').join('');
    const gate = (g, i) => `<div class="abs r" data-i="${i}" style="left:${gx[g] - 2}px;top:400px;width:4px;height:${bot - 400}px;background:repeating-linear-gradient(var(--pale3) 0 14px, transparent 14px 26px)"></div>
<div class="abs r" data-i="${i}" style="left:${gx[g] - 170}px;top:326px;width:340px;text-align:center"><span class="pill" style="display:inline-block">${H.esc(d.gates[g].label)}</span></div>
<div class="abs mono cy r" data-i="${i}" style="left:${gx[g] - 60}px;top:${bot + 8}px;width:120px;text-align:center;font-size:26px">${H.esc(d.gates[g].sub)}</div>`;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:330px;width:560px;height:${bot - 330}px"><div class="flex" style="gap:14px">${H.GLYPH(d.source.icon, 34)}<span class="k">${H.A(d.source.label)}</span></div></div>
<div class="g lit r" data-i="1" style="left:1360px;top:330px;width:440px;height:${bot - 330}px"><div class="flex" style="gap:14px">${H.GLYPH(d.target.icon, 34)}<span class="k">${H.A(d.target.label)}</span></div></div>
<div class="r" data-i="1">${src}</div>
${gate(0, 1)}${gate(1, 4)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${lines1}${lines5}</svg>
<svg class="abs r" data-i="2" data-off="5" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${pass}</svg>
${xs(0, 1)}${xs(1, 5)}${tgt}
<div class="abs s r" data-i="5" style="left:1400px;top:${(y(0) + bot) / 2 - 40}px;width:360px;text-align:center;font-size:28px">${H.A(d.empty)}</div>`;
  },
};
