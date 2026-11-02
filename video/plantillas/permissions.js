/* permissions · columnas de acciones según el permiso, una por paso.
   Datos: columns[] (2–4) = { label, tone: 'ok' | 'am' | 'bad', items[], lit? }. Con 4 columnas la letra baja a 26 px. */
TPL.permissions = {
  def: {
    kicker: 'Permisos', title: 'Qué puede hacer [[solo]]',
    columns: [
      { label: 'permitido', tone: 'ok', items: ['leer ficheros', 'buscar en el repo', 'listar carpetas'] },
      { label: 'pregunta antes', tone: 'am', items: ['editar ficheros', 'ejecutar bash', 'instalar paquetes'] },
      { label: 'denegado', tone: 'bad', lit: true, items: ['borrar fuera del repo', 'leer ~/.ssh', 'red externa'] },
    ],
  },
  html(d, H) {
    const n = d.columns.length, w = Math.round((1680 - (n - 1) * 60) / n), fs = n > 3 ? 26 : 30;
    const col = { ok: 'var(--ok)', am: 'var(--amber)', bad: 'var(--red)' };
    return `${H.HEAD(d)}
` + d.columns.map((c, i) => `<div class="g${c.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${120 + i * (w + 60)}px;top:340px;width:${w}px;height:560px;border-top:6px solid ${col[c.tone] || col.ok}"><div class="k ${c.tone || 'ok'}">${H.A(c.label)}</div><div class="mono" style="font-size:${fs}px;line-height:2.2;margin-top:18px;color:var(--pale)">${c.items.map(H.esc).join('<br>')}</div></div>`).join('\n');
  },
};
