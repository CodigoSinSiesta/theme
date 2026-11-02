/* mcp-modes · 2–4 tarjetas comparando modos con barra de coste. Cada tarjeta entra en un paso.
   Datos: kicker, title, logo, modes[] = { name, text, pct (0–100), cost, tone: 'bad'|'am'|'ok', lit? }. */
TPL['mcp-modes'] = {
  def: { kicker: 'MCP', title: 'Tres modos, [[tres costes]]', logo: 'mcp',
    modes: [
      { name: 'direct', text: 'Todas las herramientas del servidor, en el contexto desde el principio.', pct: 92, cost: 'coste alto', tone: 'bad' },
      { name: 'deferred', text: 'Solo los nombres; la definición completa se pide al usarla.', pct: 42, cost: 'coste medio', tone: 'am' },
      { name: 'codemode', text: 'Una sola herramienta: el modelo escribe código que llama al servidor.', pct: 12, cost: 'coste bajo', tone: 'ok', lit: true },
    ] },
  html(d, H) {
    const n = d.modes.length, gap = 60, w = (1680 - (n - 1) * gap) / n;
    const col = { bad: 'var(--red)', am: 'var(--amber)', ok: 'var(--ok)' };
    return `${H.HEAD(d)}
${d.modes.map((m, i) => `<div class="g${m.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${120 + i * (w + gap)}px;top:340px;width:${w}px;height:560px"><div class="flex" style="gap:18px">${H.ICO(d.logo, 56)}<span class="mono t${m.lit ? ' cy' : ''}" style="font-size:36px">${H.esc(m.name)}</span></div><div class="s" style="font-size:27px;margin-top:20px;line-height:1.4">${H.A(m.text)}</div><div style="margin-top:40px;height:40px;border:1.5px solid var(--line);border-radius:10px;overflow:hidden"><i class="bx" data-i="${i + 1}" style="display:block;height:100%;width:${m.pct}%;background:${col[m.tone] || col.am}"></i></div><div class="k ${m.tone || 'am'}" style="margin-top:14px">${H.A(m.cost)}</div></div>`).join('\n')}`;
  },
};
