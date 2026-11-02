/* frozen-diff · vídeo 18 · /review congela el diff en el mensaje; el árbol cambia y la revisión no; lo que no aporta queda fuera.
   Datos: kicker, title, tree, msg, files[] (3–5), changed (índice), skip[] (1–2), table, diff, stay, out.
   Pasos: 1 árbol, 2 mensaje congelado, 3 tabla, 4 diff, 5 el árbol cambia, 6 fuera. */
TPL['frozen-diff'] = {
  def: {
    kicker: 'El diff congelado', title: 'Se revisa [[lo que había al pedirlo]]',
    tree: 'árbol de trabajo', msg: 'mensaje de /review',
    files: ['README.md', 'src/carrito.js', 'src/envio.js', 'test/carrito.test.js', 'test/envio.test.js'], changed: 1,
    skip: ['bloqueo de dependencias', 'código generado'],
    table: 'fichero · añadidas · quitadas', diff: 'diff completo', stay: 'sigue igual', out: 'fuera',
  },
  html(d, H) {
    const n = d.files.length, m = d.skip.length, pitch = 78, y = k => 410 + k * pitch, ty = k => 470 + k * 52;
    const row = (k, t, extra = '', cls = 'mono', fs = 24) => `<div class="abs" style="left:150px;top:${y(k)}px;width:560px;height:70px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);display:flex;align-items:center;padding:0 24px;${extra}"><span class="${cls}" style="font-size:${fs}px">${H.esc(t)}</span></div>`;
    const files = d.files.map((f, k) => row(k, f)).join('');
    const skips = d.skip.map((s, j) => row(n + j, s, 'border-style:dashed', 's', 24)).join('');
    const strike = d.skip.map((s, j) => `<div class="abs bx" data-i="6" style="left:170px;top:${y(n + j) + 34}px;width:360px;height:3px;background:var(--red);border-radius:2px"></div>`).join('');
    const ch = `<div class="abs r" data-i="5" style="left:150px;top:${y(d.changed)}px;width:560px;height:70px;border-radius:12px;border:3px solid var(--amber);box-shadow:0 0 26px rgba(251,191,36,.35)"></div>`;
    const bottom = y(n + m) + 30, rh = bottom - 330;
    const trow = d.files.map((f, k) => `<div class="abs flex" style="left:1040px;top:${ty(k)}px;width:720px;justify-content:space-between"><span class="mono" style="font-size:24px">${H.esc(f)}</span><span class="mono" style="font-size:24px"><span class="ok">+</span> <span class="bad">−</span></span></div>`).join('');
    const dl = [['+', 88], ['−', 64], ['+', 76], ['', 52]];
    const diffTop = ty(n) + 30;
    const diff = dl.map(([s, w], k) => `<div class="abs flex" style="left:1040px;top:${diffTop + 50 + k * 34}px;gap:14px"><span class="mono ${s === '+' ? 'ok' : s ? 'bad' : ''}" style="font-size:22px;width:16px">${s}</span><i style="display:block;height:16px;width:${w * 6}px;border-radius:6px;background:${s === '+' ? 'rgba(52,211,153,.4)' : s ? 'rgba(248,113,113,.45)' : 'rgba(96,165,250,.3)'}"></i></div>`).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:330px;width:620px;height:${rh}px"><div class="k">${H.esc(d.tree)}</div></div>
<div class="r" data-i="1">${files}${skips}</div>${ch}${strike}
<div class="abs flex r" data-i="5" style="left:550px;top:${y(d.changed) + 12}px"><span class="pill" style="color:var(--amber);border-color:var(--amber);padding:8px 16px;font-size:22px;background:rgba(15,23,42,.9)">cambia</span></div>
${d.skip.map((s, j) => `<div class="abs flex r" data-i="6" style="left:556px;top:${y(n + j) + 12}px"><span class="pill" style="color:var(--red);border-color:var(--red);padding:8px 16px;font-size:22px;background:rgba(15,23,42,.9)">✕ ${H.esc(d.out)}</span></div>`).join('')}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3"><path class="draw" data-i="2" d="M740 500 C820 500 920 420 1000 420"/></svg>
<div class="abs k r" data-i="2" style="left:770px;top:520px;width:200px;text-align:center">una vez</div>
<div class="g lit r" data-i="2" style="left:1000px;top:330px;width:800px;height:${rh}px"><div class="flex" style="gap:14px">${H.GLYPH('lock-closed', 34)}<span class="k">${H.esc(d.msg)}</span></div></div>
<div class="r" data-i="3"><div class="abs k" style="left:1040px;top:420px;font-size:20px">${H.esc(d.table)}</div>${trow}</div>
<div class="r" data-i="4"><div class="abs k" style="left:1040px;top:${diffTop}px;font-size:20px">${H.esc(d.diff)}</div>${diff}</div>
<div class="abs flex r" data-i="5" style="left:1530px;top:352px"><span class="pill" style="color:var(--ok);border-color:var(--ok);background:rgba(15,23,42,.6)">${H.esc(d.stay)}</span></div>`;
  },
};
