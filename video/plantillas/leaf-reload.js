/* leaf-reload · vídeo 12 · la hoja no se guarda: saltas, cierras sin escribir y al volver la hoja está en la última entrada escrita.
   Datos: kicker, title, rule, panels[3] = { k, note }, leafJump, leafBack, closed, note. Árbol fijo de 6 nodos (tronco, rama escrita
   arriba, rama del salto abajo). Pasos: 1 regla, 2–4 un panel cada uno, 5 nota. */
TPL['leaf-reload'] = {
  def: {
    kicker: 'Apunte honesto', title: 'La hoja [[no se guarda]]',
    rule: 'Al cargar una sesión, la hoja va a la [[última entrada escrita]]',
    panels: [{ k: '1 · rebobinas o saltas', note: 'la hoja, en otra rama' }, { k: '2 · cierras sin escribir', note: 'el fichero no guarda la hoja' }, { k: '3 · al volver', note: 'donde estabas antes del salto' }],
    leafJump: 'hoja', leafBack: 'última escrita', closed: 'sin escribir nada',
    note: 'Después de moverte, [[envía algo]] antes de cerrar, de retomar o de bifurcar.',
  },
  html(d, H) {
    const W = 520, X = i => 120 + i * (W + 60), top = 420, H0 = 400;
    // nodos relativos al panel: 0–1 tronco, 2–3 rama escrita (arriba), 4–5 rama del salto (abajo)
    const N = [[50, 200], [160, 200], [265, 130], [370, 130], [265, 270], [370, 270]];
    const E = [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5]];
    const leafOf = [4, null, 3];
    const tree = (i, dim) => {
      const x0 = X(i), y0 = top;
      const lines = E.map(([a, b]) => { const [ax, ay] = N[a], [bx, by] = N[b];
        return ay === by ? `<line class="draw" data-i="${i + 2}" x1="${x0 + ax}" y1="${y0 + ay}" x2="${x0 + bx}" y2="${y0 + by}"/>`
          : `<path class="draw" data-i="${i + 2}" d="M${x0 + ax} ${y0 + ay} C${x0 + ax + 50} ${y0 + ay} ${x0 + bx - 50} ${y0 + by} ${x0 + bx} ${y0 + by}"/>`; }).join('');
      const nodes = N.map(([nx, ny], k) => `<div class="nd${leafOf[i] === k ? ' lit' : ''}" style="left:${x0 + nx}px;top:${y0 + ny}px;width:40px;height:40px;margin:-20px 0 0 -20px${dim ? ';opacity:.35' : ''}"></div>`).join('');
      return { lines, nodes };
    };
    const T = [0, 1, 2].map(i => tree(i, i === 1));
    const tag = (i, k, t, cls) => { const [nx, ny] = N[k]; return `<div class="abs k ${cls}" style="left:${X(i) + nx - 130}px;top:${top + ny + 30}px;width:260px;text-align:center">↑ ${H.A(t)}</div>`; };
    return `${H.HEAD(d)}
<div class="abs s r" data-i="1" style="left:120px;top:330px;width:1680px;font-size:32px;color:var(--ink)">${H.A(d.rule)}</div>
${d.panels.map((p, i) => `<div class="g${i === 2 ? ' lit' : ''} r" data-i="${i + 2}" style="left:${X(i)}px;top:${top}px;width:${W}px;height:${H0}px"><div class="k${i === 2 ? ' cy' : ''}">${H.A(p.k)}</div>
<div class="s" style="position:absolute;left:34px;bottom:26px;font-size:26px">${H.A(p.note)}</div></div>`).join('')}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${T.map((t, i) => i === 1 ? t.lines.replace(/<(line|path) /g, '<$1 stroke-opacity=".35" ') : t.lines).join('')}</svg>
${T.map((t, i) => `<div class="r" data-i="${i + 2}">${t.nodes}</div>`).join('')}
<div class="r" data-i="2">${tag(0, 4, d.leafJump, 'cy')}</div>
<div class="abs r" data-i="3" style="left:${X(1) + 40}px;top:${top + 172}px;width:${W - 80}px;text-align:center"><span class="pill" style="color:var(--amber);border-color:var(--amber);background:rgba(15,23,42,.85)">${H.A(d.closed)}</span></div>
<div class="r" data-i="4">${tag(2, 3, d.leafBack, 'am')}</div>
<div class="g lit r" data-i="5" style="left:120px;top:870px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
