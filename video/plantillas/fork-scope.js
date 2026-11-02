/* fork-scope · vídeo 12 · qué copia /fork: en Pi, el camino hasta el mensaje elegido; en oh my pi, la sesión entera con sus ramas.
   Datos: kicker, title, left / right = { k, src, dst, note }, pick, noPick, here. Árbol fijo de 7 nodos (tronco, rama de arriba con el
   mensaje elegido, rama de abajo). Pasos: 1 originales, 2 sin selector, 3 elegir mensaje, 4 copia de Pi, 5 copia de omp, 6 «te cambia». */
TPL['fork-scope'] = {
  def: {
    kicker: '/fork', title: 'Un camino [[o la sesión entera]]',
    left: { k: 'Pi · /fork', src: 'sesión.jsonl', dst: 'fichero nuevo', note: 'el camino hasta él' },
    right: { k: 'oh my pi · /fork', src: 'sesión.jsonl', dst: 'fichero nuevo', note: 'todas sus ramas' },
    pick: 'eliges un mensaje', noPick: 'ningún selector', here: 'te cambia a él',
  },
  html(d, H) {
    // nodos relativos a la caja del fichero: 0–1 tronco, 2–4 rama de arriba (3 = mensaje elegido en Pi), 5–6 rama de abajo
    const N = [[70, 100], [180, 100], [290, 70], [400, 70], [510, 70], [290, 160], [400, 160]];
    const E = [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [5, 6]];
    const PATH = [0, 1, 2, 3];
    const tree = (x0, y0, step, keep, pick) => {
      const ok = k => keep.includes(k);
      const lines = E.filter(([a, b]) => ok(a) && ok(b)).map(([a, b]) => { const [ax, ay] = N[a], [bx, by] = N[b];
        return ay === by ? `<line class="draw" data-i="${step}" x1="${x0 + ax}" y1="${y0 + ay}" x2="${x0 + bx}" y2="${y0 + by}"/>`
          : `<path class="draw" data-i="${step}" d="M${x0 + ax} ${y0 + ay} C${x0 + ax + 50} ${y0 + ay} ${x0 + bx - 50} ${y0 + by} ${x0 + bx} ${y0 + by}"/>`; }).join('');
      const nodes = N.map(([nx, ny], k) => ok(k) ? `<div class="nd${pick === k ? ' lit' : ''}" style="left:${x0 + nx}px;top:${y0 + ny}px;width:40px;height:40px;margin:-20px 0 0 -20px"></div>` : '').join('');
      return { lines, nodes };
    };
    const fbox = (x, y, t, step, lit) => `<div class="abs r" data-i="${step}" style="left:${x}px;top:${y}px;width:620px;height:210px;border-radius:16px;background:rgba(15,23,42,.6);border:${lit ? '2px solid var(--cyan);box-shadow:0 0 30px rgba(96,165,250,.35)' : '1.5px solid var(--line)'};padding:24px 26px"><div class="flex" style="gap:12px">${H.GLYPH('document-text', 30)}<span class="mono" style="font-size:24px;color:var(--pale)">${H.A(t)}</span></div></div>`;
    const ALL = [0, 1, 2, 3, 4, 5, 6];
    const L = 160, R = 1040, yS = 412, yD = 712;
    const T = [tree(L, yS, 1, ALL), tree(R, yS, 1, ALL), tree(L, yD, 4, PATH), tree(R, yD, 5, ALL)];
    const pickNode = N[3];
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:800px;height:660px"><div class="k">${H.A(d.left.k)}</div></div>
<div class="g lit r" data-i="1" style="left:1000px;top:320px;width:800px;height:660px"><div class="k cy">${H.A(d.right.k)}</div></div>
${fbox(L, yS - 20, d.left.src, 1)}${fbox(R, yS - 20, d.right.src, 1)}${fbox(L, yD - 20, d.left.dst, 4)}${fbox(R, yD - 20, d.right.dst, 5, true)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${T.map(t => t.lines).join('')}
<path class="draw" data-i="4" d="M${L + 310} ${yS + 190} V${yD - 20}"/><path class="draw" data-i="5" d="M${R + 310} ${yS + 190} V${yD - 20}"/></svg>
<div class="r" data-i="1">${T[0].nodes}${T[1].nodes}</div>
<div class="r" data-i="4">${T[2].nodes}</div><div class="r" data-i="5">${T[3].nodes}</div>
<div class="abs r" data-i="3" style="left:${L + pickNode[0] - 32}px;top:${yS + pickNode[1] - 32}px;width:64px;height:64px;border-radius:50%;border:3px dashed var(--cyan)"></div>
<div class="abs r" data-i="3" style="left:${L + 300}px;top:${yS - 8}px"><span class="chip" style="font-size:24px;border-color:var(--cyan)">${H.A(d.pick)}</span></div>
<div class="abs r" data-i="2" style="left:${R + 300}px;top:${yS - 8}px"><span class="chip" style="font-size:24px;color:var(--red);border-color:var(--red)">✕ ${H.A(d.noPick)}</span></div>
<div class="abs s r" data-i="4" style="left:${L + 22}px;top:${yD + 206}px;font-size:26px">${H.A(d.left.note)}</div>
<div class="abs s r" data-i="5" style="left:${R + 22}px;top:${yD + 206}px;font-size:26px;color:var(--ink)">${H.A(d.right.note)}</div>
<div class="abs r" data-i="6" style="left:${R + 330}px;top:${yD - 8}px"><span class="pill" style="color:var(--cyan);border-color:var(--cyan);background:rgba(15,23,42,.85)">${H.A(d.here)}</span></div>`;
  },
};
