/* json-events · salida JSON línea a línea. Datos: kicker, title, label, events[] = { type, cls ('cy'|'am'|'ok'), fields (texto tras el tipo, p. ej. '"tool":"bash"';
   [[x]] lo pinta en verde), lit? }. Una línea por paso. Hasta ~7 líneas. */
TPL['json-events'] = {
  def: {
    kicker: 'Salida', title: 'Qué sale con [[--mode json]]', label: 'stdout',
    events: [
      { type: 'session', cls: 'cy', fields: '"id":"01HX…","cwd":"~/csn/tienda"' },
      { type: 'tool_execution_start', cls: 'am', fields: '"tool":"bash"' },
      { type: 'tool_execution_end', cls: 'am', fields: '"tool":"bash","ok":[[true]]' },
      { type: 'message_end', cls: 'cy', fields: '"role":"assistant"' },
      { type: 'agent_end', cls: 'ok', fields: '"isTerminal":true', lit: true },
    ],
  },
  html(d, H) {
    const rows = d.events.map((e, i) => `<div class="r" data-i="${i + 1}"${e.lit ? ' style="background:rgba(52,211,153,.14);border-radius:8px;padding:0 10px;display:inline-block"' : ''}>{"type":"<span class="${H.esc(e.cls || 'cy')}">${H.esc(e.type)}</span>"`
      + (e.fields ? ',' + H.esc(e.fields).replace(/\[\[(.+?)\]\]/g, '<span class="ok">$1</span>') : '') + '}</div>').join('');
    return `${H.HEAD(d)}
<div class="g" style="left:120px;top:340px;width:1680px;height:${Math.max(520, 150 + d.events.length * 62)}px;padding:0"><div class="k" style="padding:16px 30px;border-bottom:1px solid var(--line)">${H.esc(d.label)}</div>
<div class="mono" style="font-size:30px;line-height:2.05;padding:22px 34px;color:var(--pale)">${rows}</div></div>`;
  },
};
