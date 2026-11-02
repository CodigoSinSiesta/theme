/* soft-fence · vídeo 17 · añadir una raíz no la aísla: el agente edita en las dos carpetas y el «Solo lectura» del
   AGENTS.md es una valla discontinua que el trazo atraviesa. Datos: kicker, title, agent, edit, main = { path, tag, files[] },
   extra = { path, tag, files[], agents, quote }, ask, wall, real. Pasos: 1 carpetas, 2 edita en la principal, 3 edita en la
   añadida, 4 la frase de solo lectura, 5 petición, no barrera, 6 permisos de verdad. */
TPL['soft-fence'] = {
  def: {
    kicker: 'Aviso', title: 'Añadir una carpeta [[no es aislarla]]',
    agent: 'oh my pi', edit: 'edit',
    main: { path: '~/csn/tienda', tag: 'working directory', files: ['src/envio.js', 'src/carrito.js', 'AGENTS.md'] },
    extra: { path: '~/csn/datos', tag: '/add-dir', files: ['tarifas-envio.pdf', 'pedidos.db'], agents: 'AGENTS.md', quote: '«Solo lectura.»' },
    ask: 'petición', wall: 'barrera', real: 'Permisos de verdad: vídeo 19',
  },
  html(d, H) {
    const chips = fs => fs.map(f => `<span class="chip" style="margin:0 12px 0 0">${H.esc(f)}</span>`).join('');
    const headRow = (p, tag) => `<div class="flex" style="gap:16px">${H.GLYPH('folder', 40)}<span class="mono" style="font-size:32px;color:var(--ink)">${H.esc(p)}</span><span class="pill" style="font-size:22px;padding:6px 18px">${H.esc(tag)}</span></div>`;
    const editTag = (x, y, i, tone) => `<div class="abs r" data-i="${i}" style="left:${x}px;top:${y}px"><span class="chip" style="color:var(--${tone});border-color:var(--${tone});background:rgba(15,23,42,.95)">✓ ${H.esc(d.edit)}</span></div>`;
    return `${H.HEAD(d)}
<div class="g r flex" data-i="1" style="left:120px;top:500px;width:380px;height:200px;flex-direction:column;justify-content:center;gap:18px">${H.ICO('omp', 88)}<span class="mono" style="font-size:28px">${H.esc(d.agent)}</span></div>
<div class="g r" data-i="1" style="left:820px;top:320px;width:980px;height:210px">${headRow(d.main.path, d.main.tag)}<div style="margin-top:34px">${chips(d.main.files)}</div></div>
<div class="g r" data-i="1" style="left:820px;top:630px;width:980px;height:306px">${headRow(d.extra.path, d.extra.tag)}<div style="margin-top:28px">${chips(d.extra.files)}</div>
<div class="flex" style="margin-top:24px;gap:16px;height:72px;padding:0 24px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line)">${H.GLYPH('document-text', 32)}<span class="mono" style="font-size:26px">${H.esc(d.extra.agents)}</span><span class="r s am" data-i="4" style="font-size:28px">${H.esc(d.extra.quote)}</span></div></div>
<div class="abs r" data-i="4" style="left:766px;top:604px;width:1054px;height:358px;border-radius:30px;border:3px dashed var(--amber)"></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M500 560 C640 560 660 426 806 426"/><path class="draw" data-i="2" d="M792 414 L808 426 L792 438"/>
<path class="draw" data-i="3" d="M500 640 C640 640 660 780 806 780"/><path class="draw" data-i="3" d="M792 768 L808 780 L792 792"/></svg>
${editTag(566, 436, 2, 'ok')}${editTag(570, 640, 3, 'ok')}
<div class="abs r flex" data-i="5" style="left:1300px;top:579px;gap:14px"><span class="pill" style="color:var(--amber);border-color:var(--amber);background:rgba(15,23,42,.95)">${H.esc(d.ask)}</span><span class="pill" style="color:var(--pale3);background:rgba(15,23,42,.95);text-decoration:line-through;text-decoration-color:var(--red)">${H.esc(d.wall)}</span></div>
<div class="g r flex" data-i="6" style="left:120px;top:836px;width:600px;height:120px;gap:20px;border-color:var(--red)">${H.GLYPH('lock-closed', 44, 'bad')}<span class="s" style="font-size:28px;color:var(--ink)">${H.A(d.real)}</span></div>`;
  },
};
