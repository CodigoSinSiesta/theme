/* prompt-assembly · bloques apilados dentro de la ventana de contexto; cada uno entra en un paso.
   Datos: kicker, title, window (rótulo), blocks[] = { label, value, h (peso de altura), lit? }, note (con [[acento]]).
   Las alturas se escalan para llenar el marco (528 px): 3–8 bloques. El último bloque dispara también la nota. */
TPL['prompt-assembly'] = {
  def: {
    kicker: 'Contexto', title: 'Cómo se monta [[cada turno]]',
    window: 'ventana de contexto',
    blocks: [
      { label: 'Sistema', value: '794', h: 62 }, { label: 'AGENTS.md', value: '620', h: 62 },
      { label: 'Herramientas', value: '1.177', h: 100 }, { label: 'Skills', value: '180', h: 62 },
      { label: 'Historial', value: 'crece', h: 120 }, { label: 'Tu mensaje', value: 'nuevo', h: 62, lit: true },
    ],
    note: 'Todo esto viaja [[en cada petición]].',
  },
  html(d, H) {
    const gap = 12, n = d.blocks.length, avail = 528 - gap * (n - 1);
    const sum = d.blocks.reduce((a, b) => a + (b.h || 62), 0), k = Math.min(1.3, avail / sum);
    let y = 390;
    const blocks = d.blocks.map((b, i) => {
      const h = Math.round((b.h || 62) * k), s = `<div class="g${b.lit ? ' lit' : ''} r flex" data-i="${i + 1}" style="left:650px;top:${y}px;width:620px;height:${h}px;padding:0 24px;justify-content:space-between;border-radius:12px"><span class="s" style="font-size:26px">${H.A(b.label)}</span><span class="mono${b.lit ? ' cy' : ''}" style="font-size:22px;${b.lit ? '' : 'color:var(--pale3)'}">${H.A(b.value)}</span></div>`;
      y += h + gap; return s;
    }).join('');
    const note = H.esc(d.note).replace(/\[\[(.+?)\]\]/g, '<span class="cy">$1</span>');
    return `${H.HEAD(d)}
<div class="abs" style="left:620px;top:330px;width:680px;height:620px;border:3px dashed var(--line);border-radius:26px"></div>
<div class="abs k" style="left:640px;top:345px">${H.A(d.window)}</div>
${blocks}
<div class="abs r" data-i="${n}" style="left:1380px;top:560px;width:420px;font:700 38px/1.3 var(--disp)">${note}</div>`;
  },
};
