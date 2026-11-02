/* declared-after · vídeo 07 · qué queda declarado turno a turno: lo que carga tool_search se queda; codemode llama por nombre y no declara nada.
   Datos: kicker, title, turns (2–3), turnLabel, search = { label, call, again, tools[] (1–2) }, code = { label, call, byName, none }, trayLabel.
   Pasos: 1 búsqueda y declaradas, 2 siguen en los turnos siguientes, 3 sin volver a buscar, 4 scripts de codemode, 5 por su nombre, 6 nada declarado. */
TPL['declared-after'] = {
  def: {
    kicker: 'Lo que queda después', title: 'Declaradas una vez, [[o nunca]]',
    turns: 3, turnLabel: 'turno',
    search: { label: 'tool search', call: 'tool_search', again: 'tool_search', tools: ['list_allowed_directories', 'list_directory_with_sizes'] },
    code: { label: 'codemode', call: 'script', byName: 'tools.<nombre>(…)', none: 'ninguna' },
    trayLabel: 'declaradas',
  },
  html(d, H) {
    const n = d.turns, x0 = 420, cw = 430, gap = n === 3 ? 30 : 120, cx = k => x0 + k * (cw + gap);
    const yA = 340, yB = 670, lh = 300, S = d.search, C = d.code;
    const tray = (x, y, inner, i) => `<div class="abs r" data-i="${i}" style="left:${x}px;top:${y}px;width:${cw}px;height:186px;border:2px dashed var(--line);border-radius:14px;padding:16px 16px"><div class="k" style="font-size:22px">${H.esc(d.trayLabel)}</div>${inner}</div>`;
    const chips = S.tools.map(t => `<div style="margin-top:12px"><span class="chip" style="font-size:22px">${H.esc(t)}</span></div>`).join('');
    const laneLabel = (y, glyph, label) => `<div class="g" style="left:120px;top:${y}px;width:1680px;height:${lh}px;padding:28px 30px"><div style="width:250px">${H.GLYPH(glyph, 44)}<div class="k" style="margin-top:14px">${H.A(label)}</div></div></div>`;
    const turnsA = Array.from({ length: n }, (_, k) => {
      const i = k ? 2 : 1;
      const call = k
        ? `<div class="abs r" data-i="3" style="left:${cx(k)}px;top:${yA + 26}px"><span class="chip" style="font-size:22px;color:var(--pale3);border-style:dashed"><span style="text-decoration:line-through;text-decoration-color:var(--red)">${H.esc(S.again)}</span></span></div>`
        : `<div class="abs r" data-i="1" style="left:${cx(k)}px;top:${yA + 26}px"><span class="chip" style="font-size:22px;border-color:var(--cyan)">${H.GLYPH('magnifying-glass', 22)} ${H.esc(S.call)}</span></div>`;
      return call + tray(cx(k), yA + 92, chips, i);
    }).join('');
    const turnsB = Array.from({ length: n }, (_, k) => `<div class="abs r" data-i="4" style="left:${cx(k)}px;top:${yB + 26}px"><span class="chip" style="font-size:22px;border-color:var(--cyan)">${H.esc(C.call)}</span></div>
<div class="abs mono cy r" data-i="5" style="left:${cx(k) + 150}px;top:${yB + 36}px;font-size:22px">${H.esc(C.byName)}</div>
${tray(cx(k), yB + 92, `<div class="r" data-i="6" style="margin-top:44px;text-align:center"><span class="t bad" style="font-size:30px">✕ ${H.esc(C.none)}</span></div>`, 4)}`).join('');
    const heads = Array.from({ length: n }, (_, k) => `<div class="abs k" style="left:${cx(k)}px;top:300px;width:${cw}px;text-align:center;font-size:22px">${H.esc(d.turnLabel)} ${k + 1}</div>`).join('');
    return `${H.HEAD(d)}
${heads}
<div class="r" data-i="1">${laneLabel(yA, 'magnifying-glass', S.label)}</div>
<div class="r" data-i="4">${laneLabel(yB, 'command-line', C.label)}</div>
${turnsA}${turnsB}`;
  },
};
