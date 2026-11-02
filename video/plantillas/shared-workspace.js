/* shared-workspace · vídeo 16 · un árbol compartido donde los agentes se pisan frente a copias aisladas que vuelven
   como parche. Datos: kicker, title, agents[] (3), files[] (2–4), targets[] (fichero de cada agente; dos iguales = choque),
   shared = { label, note }, isolated = { label, note, flag }, clash, merge. Pasos: 1 panel compartido, 2 trazos, 3 choque,
   4 panel aislado, 5 parche, 6 aviso. */
TPL['shared-workspace'] = {
  def: {
    kicker: 'Espacio de trabajo', title: 'Un árbol para todos, [[o una copia cada uno]]',
    agents: ['agente A', 'agente B', 'agente C'], files: ['src/envio.js', 'src/carrito.js', 'test/carrito.test.js'], targets: [0, 1, 1],
    shared: { label: 'shared workspace · de serie', note: 'Encargos que no toquen los mismos ficheros' },
    isolated: { label: 'task.isolation.enabled', note: 'Cada agente trabaja en una copia', flag: 'apagado de serie' },
    clash: 'se pisan', merge: 'parche o rama',
  },
  html(d, H) {
    const cxL = [270, 520, 770], cxR = [1150, 1400, 1650], fy = j => 604 + j * 92;
    const hits = d.files.map((_, j) => d.targets.filter(t => t === j).length);
    const chip = (cx, y, t, i) => `<div class="abs r" data-i="${i}" style="left:${cx - 105}px;top:${y}px;width:210px;text-align:center"><span class="chip" style="display:block">${H.esc(t)}</span></div>`;
    const lines = d.agents.map((a, i) => { const j = d.targets[i], tx = 380 + i * 140, ty = fy(j) + 2;
      return `<path class="draw" data-i="2" d="M${cxL[i]} 478 C${cxL[i]} 548 ${tx} ${ty - 70} ${tx} ${ty}"/>`; }).join('');
    const merge = cxR.map(cx => `<path class="draw" data-i="5" d="M${cx} 672 C${cx} 760 1400 742 1400 818"/>`).join('');
    const files = d.files.map((f, j) => `<div class="abs" style="left:220px;top:${fy(j)}px;width:600px;height:76px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);display:flex;align-items:center;gap:16px;padding:0 28px">${H.GLYPH('document-text', 32)}<span class="mono" style="font-size:28px">${H.esc(f)}</span></div>`
      + (hits[j] > 1 ? `<div class="abs r" data-i="3" style="left:220px;top:${fy(j)}px;width:600px;height:76px;border-radius:12px;border:3px solid var(--red);box-shadow:0 0 30px rgba(248,113,113,.45);display:flex;align-items:center;justify-content:flex-end;gap:10px;padding:0 28px">${H.GLYPH('exclamation-triangle', 30, 'bad')}<span class="k bad" style="font-size:22px">${H.esc(d.clash)}</span></div>` : '')).join('');
    const copies = cxR.map((cx, i) => `<div class="g r" data-i="4" style="left:${cx - 110}px;top:520px;width:220px;height:152px;padding:22px 24px"><div class="flex k" style="font-size:22px;gap:10px">${H.GLYPH('document-duplicate', 30)}copia</div>
<i style="display:block;height:14px;border-radius:6px;background:rgba(96,165,250,.35);margin-top:16px;width:90%"></i><i style="display:block;height:14px;border-radius:6px;background:rgba(96,165,250,.35);margin-top:10px;width:70%"></i><i style="display:block;height:14px;border-radius:6px;background:rgba(96,165,250,.35);margin-top:10px;width:80%"></i></div>`).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:800px;height:660px;border-top:6px solid var(--amber)"><div class="k am">${H.A(d.shared.label)}</div></div>
<div class="g r" data-i="4" style="left:1000px;top:320px;width:800px;height:660px;border-top:6px solid var(--ok)"><div class="k ok">${H.A(d.isolated.label)}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${lines}${merge}</svg>
${d.agents.map((a, i) => chip(cxL[i], 414, a, 1)).join('')}
<div class="r" data-i="1">${files}</div>
<div class="abs s r" data-i="3" style="left:160px;top:${fy(d.files.length) + 6}px;width:720px;font-size:26px">${H.A(d.shared.note)}</div>
${d.agents.map((a, i) => chip(cxR[i], 414, a, 4)).join('')}
${copies}
<div class="g lit r" data-i="5" style="left:1200px;top:818px;width:400px;height:76px;padding:0;display:grid;place-items:center"><span class="mono" style="font-size:28px">${H.A(d.merge)}</span></div>
<div class="abs s r" data-i="5" style="left:1040px;top:908px;width:720px;font-size:26px;text-align:center">${H.A(d.isolated.note)}</div>
<div class="abs r" data-i="6" style="left:1460px;top:352px"><span class="pill" style="color:var(--amber);border-color:var(--amber)">${H.A(d.isolated.flag)}</span></div>`;
  },
};
