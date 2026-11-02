/* live-cells · vídeo 17 · eval: lo que define una llamada sigue en el proceso vivo para la siguiente. Datos: kicker, title,
   proc = { label, langs[] }, mem[] = { t, s? } (1–4), cells[2] = { label, lines[] = { t, s? } } (hasta 3 líneas; [[x]] = viene de memoria), note.
   Pasos: 1 proceso, 2 llamada 1 y memoria, 3 llamada 2, 4 nota; líneas y memoria con s entran en su paso (aquí 5 y 6). */
TPL['live-cells'] = {
  def: {
    kicker: 'eval', title: 'Un proceso [[que sigue vivo]]',
    proc: { label: 'proceso vivo', langs: ['JavaScript', 'Python'] },
    mem: [{ t: 'totalConEnvio' }, { t: 'totalConCupon' }, { t: 'subtotales', s: 5 }],
    cells: [
      { label: 'llamada 1 · js', lines: [{ t: 'import { totalConEnvio, totalConCupon }' }, { t: "  from 'src/carrito.js';" }] },
      { label: 'llamada 2 · js', lines: [{ t: '[[totalConEnvio]](linea)' }, { t: 'const subtotales = [39.99, 40, 45];', s: 5 }, { t: '[[totalConCupon]](linea, { porcentaje: 10 })', s: 6 }] },
    ],
    note: 'Como en un [[cuaderno]]: lo definido sigue ahí en la siguiente llamada.',
  },
  html(d, H) {
    const cy = [330, 620], ch = [230, 280];
    const cell = (c, k) => `<div class="g r" data-i="${k + 2}" style="left:120px;top:${cy[k]}px;width:960px;height:${ch[k]}px;padding:24px 32px"><div class="k">${H.esc(c.label)}</div>
${c.lines.map(l => `<div class="mono${l.s ? ' r' : ''}"${l.s ? ` data-i="${l.s}"` : ''} style="font-size:28px;margin-top:14px;white-space:pre">${H.esc(l.t).replace(/\[\[(.+?)\]\]/g, '<span class="cy">$1</span>')}</div>`).join('')}</div>`;
    const mem = d.mem.map(m => `<div class="r" data-i="${m.s || 2}" style="margin-top:14px"><span class="chip" style="color:var(--cyan);border-color:var(--cyan)">${H.esc(m.t)}</span></div>`).join('');
    const note = H.esc(d.note).replace(/\[\[(.+?)\]\]/g, '<span class="cy">$1</span>');
    return `${H.HEAD(d)}
<div class="g lit r" data-i="1" style="left:1240px;top:330px;width:560px;height:570px;padding:28px 34px"><div class="k">${H.esc(d.proc.label)}</div>
<div class="flex" style="gap:14px;margin-top:18px">${d.proc.langs.map(l => `<span class="pill">${H.esc(l)}</span>`).join('')}</div>
<div class="k" style="margin-top:40px">en memoria</div>${mem}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M1080 440 C1160 440 1160 600 1240 600"/><path class="draw" data-i="3" d="M1240 680 C1160 680 1160 760 1080 760"/></svg>
${d.cells.map(cell).join('\n')}
<div class="abs s r" data-i="4" style="left:120px;top:930px;width:1680px;font-size:30px;color:var(--ink)">${note}</div>`;
  },
};
