/* run-spread · vídeo 25 · la dispersión de varias ejecuciones: en cada medida, una fila por condición con un punto por
   ejecución, la banda de la más baja a la más alta y la media marcada. Datos: kicker, title, panels[2] = { k, max, rows[2] =
   { name, runs[] (2–5 números), mean, meanT, range } }, notes[2]. Pasos: 1 primer panel, 2–3 sus filas, 4 segundo panel y su
   primera fila, 5 su segunda fila, 6 y 7 las dos notas. */
TPL['run-spread'] = {
  def: {
    kicker: 'Tres ejecuciones de cada · dispersión', title: 'Varios: más caro [[y menos predecible]]',
    panels: [
      { k: 'Segundos por ejecución', max: 200, rows: [
        { name: 'uno', runs: [59, 80, 48], mean: 62, meanT: 'media 62 s', range: '48–80 s' },
        { name: 'varios', runs: [93, 149, 190], mean: 144, meanT: 'media 144 s', range: '93–190 s' }] },
      { k: 'Tokens por ejecución', max: 1400000, rows: [
        { name: 'uno', runs: [429508, 512558, 296281], mean: 412782, meanT: 'media 413k', range: '296k–513k' },
        { name: 'varios', runs: [402592, 997928, 1342079], mean: 914200, meanT: 'media 914k', range: '403k–1,34M' }] },
    ],
    notes: ['Repartir: cuesta más y es menos predecible', 'Tu revisión no sale en ninguna columna'],
  },
  html(d, H) {
    const X0 = 420, XW = 1080, TOP = [310, 610], PH = 280;
    const panel = (p, k) => {
      const top = TOP[k], x = v => Math.round(X0 + XW * v / p.max);
      const rows = p.rows.map((r, j) => {
        const y = top + 136 + j * 90, i = k ? 4 + j : 2 + j, lo = Math.min(...r.runs), hi = Math.max(...r.runs), col = j ? 'var(--amber)' : 'var(--cyan)';
        return `<div class="abs s r" data-i="${k ? 4 : 1}" style="left:160px;top:${y - 21}px;font-size:30px;color:var(--ink)">${H.esc(r.name)}</div>
<i class="bx" data-i="${i}" style="position:absolute;left:${x(lo)}px;top:${y - 7}px;width:${x(hi) - x(lo)}px;height:14px;border-radius:7px;background:${j ? 'rgba(251,191,36,.35)' : 'rgba(96,165,250,.35)'}"></i>
${r.runs.map(v => `<div class="abs r" data-i="${i}" style="left:${x(v) - 13}px;top:${y - 13}px;width:26px;height:26px;border-radius:50%;background:${col};box-shadow:0 0 14px ${col}"></div>`).join('')}
<div class="abs r" data-i="${i}" style="left:${x(r.mean) - 2}px;top:${y - 28}px;width:4px;height:56px;border-radius:2px;background:var(--ink)"></div>
<div class="abs mono r" data-i="${i}" style="left:${x(r.mean) - 110}px;top:${y - 64}px;width:220px;text-align:center;font-size:22px;color:var(--pale3)">${H.esc(r.meanT)}</div>
<div class="abs mono r" data-i="${i}" style="left:1560px;top:${y - 17}px;font-size:26px;color:${col}">${H.esc(r.range)}</div>`;
      }).join('');
      return `<div class="g r" data-i="${k ? 4 : 1}" style="left:120px;top:${top}px;width:1680px;height:${PH}px"><div class="k">${H.A(p.k)}</div></div>
<div class="abs r" data-i="${k ? 4 : 1}" style="left:${X0}px;top:${top + 112}px;width:2px;height:${PH - 140}px;background:var(--line)"></div>${rows}`;
    };
    return `${H.HEAD(d)}
${d.panels.map(panel).join('')}
<div class="g lit r" data-i="6" style="left:120px;top:906px;width:1680px;height:84px;padding:0 34px;display:flex;align-items:center;gap:40px"><span class="s" style="font-size:28px;color:var(--ink)">${H.A(d.notes[0])}</span>
<i class="r" data-i="7" style="display:block;width:2px;height:40px;background:var(--line)"></i><span class="s r" data-i="7" style="font-size:28px;color:var(--ink)">${H.A(d.notes[1])}</span></div>`;
  },
};
