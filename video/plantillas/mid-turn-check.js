/* mid-turn-check · vídeo 13 · un turno largo como columnas de contexto que crecen con cada herramienta, el umbral fijado
   a mano y dónde se comprueba: al final del turno y entre una herramienta y la siguiente. Datos: kicker, title, win, thr = { label, unit },
   cols[] = { t, h (0–1), tool } (5–8; h sobre la ventana), cross (índice de la primera columna que pasa el umbral), legend[3].
   Pasos: 1 turno y umbral, 2 control al final del turno, 3 controles entre herramientas, 4 el turno llena la ventana. */
TPL['mid-turn-check'] = {
  def: {
    kicker: 'El umbral de compactación', title: 'Se comprueba [[también a mitad de turno]]',
    win: 'ventana', thr: { label: 'umbral', unit: '% o tokens' }, thrH: 0.72,
    cols: [{ t: 'tu mensaje', h: 0.16 }, { t: 'read', h: 0.3, tool: true }, { t: 'bash', h: 0.45, tool: true }, { t: 'edit', h: 0.6, tool: true },
      { t: 'bash', h: 0.79, tool: true }, { t: 'read', h: 0.92, tool: true }, { t: 'respuesta', h: 1 }],
    cross: 4,
    legend: ['al terminar un turno', 'entre una herramienta y la siguiente', 'un solo turno puede llenar la ventana'],
  },
  html(d, H) {
    const X0 = 330, X1 = 1700, BASE = 830, TOP = 390, HH = BASE - TOP, n = d.cols.length, slot = (X1 - X0) / n, cw = slot - 64;
    const yOf = h => BASE - h * HH, thrY = yOf(d.thrH);
    const cols = d.cols.map((c, i) => {
      const x = X0 + i * slot + 32, y = yOf(c.h);
      const fill = c.tool ? 'rgba(96,165,250,.32)' : 'rgba(148,163,184,.22)', bd = c.tool ? 'var(--cyan)' : 'var(--line)';
      return `<div class="abs" style="left:${x}px;top:${y}px;width:${cw}px;height:${BASE - y}px;border-radius:10px 10px 0 0;background:${fill};border:2px solid ${bd};border-bottom:none"></div>
<div class="abs mono" style="left:${x - 30}px;top:${BASE + 14}px;width:${cw + 60}px;text-align:center;font-size:24px;color:${c.tool ? 'var(--sky)' : 'var(--pale)'}">${H.esc(c.t)}</div>`;
    }).join('');
    // controles entre herramientas: en el borde entre dos columnas de herramienta
    const mids = d.cols.map((c, i) => i > 0 && c.tool && d.cols[i - 1].tool ? X0 + i * slot : null).filter(x => x != null);
    const crossX = X0 + (d.cross + 1) * slot;
    const dia = (x, sz, col, extra = '') => `<div class="abs" style="left:${x - sz / 2}px;top:${BASE - sz / 2}px;width:${sz}px;height:${sz}px;border-radius:6px;background:${col};rotate:45deg;${extra}"></div>`;
    const midMarks = mids.map(x => `<line class="draw" data-i="3" x1="${x}" y1="${BASE}" x2="${x}" y2="${TOP - 10}" stroke-width="2" opacity=".55"/>`).join('');
    const legItem = (t, mark) => `<div class="flex" style="gap:16px">${mark}<span class="s" style="font-size:26px;color:var(--ink)">${H.esc(t)}</span></div>`;
    const sq = (col, rot = true) => `<i style="display:block;width:26px;height:26px;border-radius:5px;background:${col};${rot ? 'rotate:45deg;' : ''}flex:none"></i>`;
    return `${H.HEAD(d)}
<div class="r" data-i="1">
<div class="abs" style="left:${X0}px;top:${TOP}px;width:${X1 - X0}px;height:0;border-top:3px solid var(--red);opacity:.75"></div>
<div class="abs k bad" style="left:120px;top:${TOP - 14}px;width:190px;text-align:right">${H.esc(d.win)}</div>
${cols}
<div class="abs" style="left:${X0 - 10}px;top:${BASE}px;width:${X1 - X0 + 40}px;height:3px;background:var(--line)"></div>
<div class="abs" style="left:${X0}px;top:${thrY}px;width:${X1 - X0}px;height:0;border-top:4px dashed var(--cyan)"></div>
<div class="abs k cy" style="left:120px;top:${thrY - 34}px;width:190px;text-align:right">${H.esc(d.thr.label)}</div>
<div class="abs" style="left:150px;top:${thrY + 4}px;width:160px;text-align:right"><span class="chip" style="font-size:22px;padding:6px 14px;white-space:nowrap">${H.esc(d.thr.unit)}</span></div>
</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${midMarks}
<line class="draw" data-i="2" x1="${X1 + 20}" y1="${BASE}" x2="${X1 + 20}" y2="${TOP - 10}" stroke-width="4"/></svg>
<div class="r" data-i="2">${dia(X1 + 20, 34, 'var(--cyan)', 'box-shadow:0 0 22px var(--cyan)')}</div>
<div class="r" data-i="3">${mids.map(x => dia(x, 26, 'var(--sky)')).join('')}</div>
<div class="r" data-i="4">${dia(crossX, 34, 'var(--amber)', 'box-shadow:0 0 26px var(--amber)')}
<div class="abs" style="left:${X0 + (n - 1) * slot + 26}px;top:${TOP - 6}px;width:${cw + 12}px;height:12px;border-radius:6px;background:var(--red);box-shadow:0 0 22px var(--red)"></div></div>
<div class="abs flex r" data-i="2" style="left:${X0}px;top:932px">${legItem(d.legend[0], sq('var(--cyan)'))}</div>
<div class="abs flex r" data-i="3" style="left:${X0 + 420}px;top:932px">${legItem(d.legend[1], sq('var(--sky)'))}</div>
<div class="abs flex r" data-i="4" style="left:${X0 + 950}px;top:932px">${legItem(d.legend[2], sq('var(--amber)'))}</div>`;
  },
};
