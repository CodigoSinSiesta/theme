/* override · capas de configuración y cuál gana. Datos: kicker, title, layers[] = { label, value, kind: 'struck'|'win'|'empty' (win ilumina) },
   result = { label, value, note }. Una capa por paso, luego flecha y resultado. 2–5 capas. */
TPL.override = {
  def: {
    kicker: 'Configuración', title: 'Quién [[manda]] en el valor',
    layers: [
      { label: 'Global · ~/.omp', value: 'approval: ask', kind: 'struck' },
      { label: 'Perfil · profiles/demo', value: 'approval: ask', kind: 'struck' },
      { label: 'Proyecto · .omp/config.yml', value: 'approval: write', kind: 'win' },
      { label: 'Flag · --approval-mode', value: '— sin definir —', kind: 'empty' },
    ],
    result: { label: 'valor efectivo', value: 'write', note: 'gana la capa más cercana al trabajo' },
  },
  html(d, H) {
    const n = d.layers.length, c = 325 + n * 65;
    const val = l => l.kind === 'win' ? 'ok" style="font-size:30px;font-weight:700' : l.kind === 'empty' ? '" style="font-size:30px;color:var(--pale3)' : '" style="font-size:30px;text-decoration:line-through;text-decoration-color:var(--red);color:var(--pale3)';
    const rows = d.layers.map((l, i) => `<div class="g${l.kind === 'win' ? ' lit' : ''} r flex" data-i="${i + 1}" style="left:120px;top:${340 + i * 130}px;width:1100px;height:110px;padding:0 36px;justify-content:space-between"><span class="k${l.kind === 'win' ? ' cy' : ''}">${H.esc(l.label)}</span><span class="mono ${val(l)}">${H.esc(l.value)}</span></div>`).join('');
    const R = d.result;
    return `${H.HEAD(d)}${rows}
<div class="abs r" data-i="${n + 1}" style="left:1280px;top:${c - 25}px;font:700 60px var(--disp);color:var(--cyan)">→</div>
<div class="g lit r" data-i="${n + 1}" style="left:1380px;top:${c - 145}px;width:420px;height:290px"><div class="k">${H.esc(R.label)}</div><div class="mono ok" style="font-size:40px;font-weight:700;margin-top:30px">${H.esc(R.value)}</div><div class="s" style="font-size:24px;margin-top:14px">${H.esc(R.note)}</div></div>`;
  },
};
