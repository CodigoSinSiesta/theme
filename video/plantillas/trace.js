/* trace · línea de tiempo de una ejecución con una barra por paso (3–9 filas).
   Datos: total (segundos del eje), steps[] = { name, s (inicio), d (duración), kind: 'think' | 'tool' | 'long' | 'end', label? (texto a la derecha de la barra) }. */
TPL.trace = {
  def: {
    kicker: 'Traza', title: 'Qué hizo el agente [[y cuánto tardó]]',
    total: 12,
    steps: [
      { name: 'pensar', s: 0, d: 1.5, kind: 'think' },
      { name: 'leer_fichero', s: 1.5, d: 0.5, kind: 'tool' },
      { name: 'pensar', s: 2, d: 1.2, kind: 'think' },
      { name: 'editar', s: 3.2, d: 0.5, kind: 'tool' },
      { name: 'pensar', s: 3.7, d: 0.8, kind: 'think' },
      { name: 'bash · pytest', s: 4.5, d: 5.5, kind: 'long', label: '5,5 s' },
      { name: 'pensar', s: 10, d: 1, kind: 'think' },
      { name: 'responder', s: 11, d: 1, kind: 'end' },
    ],
  },
  html(d, H) {
    const px = 1280 / d.total, ROW = 64;
    const bg = { think: 'background:rgba(96,165,250,.35);border:1.5px solid var(--cyan)', tool: 'background:var(--cyan)', long: 'background:var(--ink)', end: 'background:var(--ok)' };
    const names = d.steps.map(s => H.esc(s.name)).join('<br>');
    const bars = d.steps.map((s, i) => {
      const l = Math.round(520 + s.s * px), w = Math.round(s.d * px), t = 406 + i * ROW;
      return `<i class="bx" data-i="${i + 1}" style="position:absolute;left:${l}px;top:${t}px;width:${w}px;height:42px;border-radius:9px;${bg[s.kind] || bg.think}"></i>`
        + (s.label ? `<div class="abs mono r" data-i="${i + 1}" style="left:${l + w + 13}px;top:${t}px;font-size:26px;line-height:42px;color:var(--ink)">${H.esc(s.label)}</div>` : '');
    }).join('\n');
    return `${H.HEAD(d)}
<div class="abs k" style="left:520px;top:335px">0 s</div><div class="abs k" style="left:1760px;top:335px">${H.esc(d.total)} s</div>
<div class="abs" style="left:520px;top:375px;width:1280px;height:2px;background:var(--line)"></div>
<div class="abs mono" style="left:120px;top:395px;font-size:28px;line-height:${ROW}px;color:var(--pale)">${names}</div>
${bars}`;
  },
};
