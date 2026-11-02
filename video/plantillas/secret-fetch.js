/* secret-fetch · vídeo 04 · las tres formas de dar la clave en models.json y cuándo se ejecuta el comando: en auth.json una
   vez y el resultado queda en memoria; en models.json en cada petición. Datos: kicker, title, forms[3] = { v, t }, reqs (3–5),
   reqLabel, run, auth = { file, note, mem }, models = { file, note }, fast. Pasos: 1–3 una forma cada uno, 4 carril de auth.json,
   5 carril de models.json, 6 «que sea rápido». */
TPL['secret-fetch'] = {
  def: {
    kicker: 'apiKey en models.json', title: 'El comando corre [[en cada petición]]',
    forms: [{ v: '"ollama"', t: 'el texto tal cual' }, { v: '$VARIABLE', t: 'una variable de entorno' }, { v: '!comando', t: 'un comando' }],
    reqs: 4, reqLabel: 'petición', run: '▶ !comando',
    auth: { file: 'auth.json', note: 'una vez', mem: 'en memoria mientras dura el proceso' },
    models: { file: 'models.json', note: 'en cada petición' },
    fast: 'Por eso conviene que [[sea rápido]].',
  },
  html(d, H) {
    const n = Math.max(3, Math.min(5, d.reqs)), CX = 560, CW = Math.floor((1770 - CX) / n);
    const col = j => CX + j * CW;
    const cards = d.forms.map((f, i) => `<div class="g${i === 2 ? ' lit' : ''} r" data-i="${i + 1}" style="left:${120 + i * 580}px;top:320px;width:520px;height:130px;padding:0 34px;display:flex;flex-direction:column;justify-content:center;gap:6px">
  <span class="mono${i === 2 ? ' cy' : ''}" style="font-size:30px">${H.esc(f.v)}</span><span class="s" style="font-size:26px">${H.A(f.t)}</span></div>`).join('');
    const run = (x, y) => `<div class="abs" style="left:${x}px;top:${y}px"><span class="chip flex" style="display:inline-flex;gap:10px;font-size:24px;color:var(--amber);border-color:var(--amber)">${H.GLYPH('command-line', 26, 'am')}${H.esc(d.run.replace(/^▶ /, ''))}</span></div>`;
    const lane = (y, L, st, every) => `<div class="g r" data-i="${st}" style="left:120px;top:${y}px;width:1680px;height:180px">
  <div class="mono cy" style="font-size:30px">${H.esc(L.file)}</div><div class="s" style="font-size:26px;margin-top:8px">${H.A(L.note)}</div></div>
<div class="r" data-i="${st}">${Array.from({ length: n }, (_, j) => `<div class="abs k" style="left:${col(j)}px;top:${y + 28}px">${H.esc(d.reqLabel)} ${j + 1}</div>`).join('')}
${Array.from({ length: n }, (_, j) => every || !j ? run(col(j), y + 86) : '').join('')}</div>`;
    const memX = col(1), memW = 1770 - memX;
    return `${H.HEAD(d)}
${cards}
${lane(500, d.auth, 4, false)}
<div class="abs bx" data-i="4" style="left:${memX}px;top:586px;width:${memW}px;height:56px;border-radius:10px;background:rgba(96,165,250,.28)"></div>
<div class="abs r" data-i="4" style="left:${memX + 24}px;top:586px;height:56px;display:flex;align-items:center"><span class="mono" style="font-size:24px;color:var(--ink)">${H.A(d.auth.mem)}</span></div>
${lane(710, d.models, 5, true)}
<div class="abs flex r" data-i="6" style="left:120px;top:918px;gap:18px">${H.GLYPH('clock', 44)}<span class="s" style="color:var(--ink)">${H.A(d.fast)}</span></div>`;
  },
};
