/* tool-call-outcomes · vídeo 08 · el modelo pide una herramienta, tu handler de tool_call decide y hay tres salidas:
   pasa, modifica los argumentos o bloquea (y el motivo vuelve al modelo como resultado). Datos: kicker, title, model, call = { k, name, input },
   handler = { k, name }, exits[3] = { code, t, s, tone: 'ok'|'cy'|'bad' }, back. Pasos: 1 modelo y handler, 2 llamada, 3–5 una salida cada uno, 6 vuelta. */
TPL['tool-call-outcomes'] = {
  def: {
    kicker: 'tool_call', title: 'Antes de ejecutar, [[tu handler decide]]',
    model: 'El modelo pide',
    call: { k: 'tool_call', name: 'bash', input: '{ command: "…" }' },
    handler: { k: 'tu handler', name: 'pi.on("tool_call")' },
    exits: [
      { code: 'return;', t: 'Pasa', s: 'la herramienta se ejecuta', tone: 'ok' },
      { code: 'event.input.command = …', t: 'Modifica', s: 'los argumentos, en el sitio', tone: 'cy' },
      { code: '{ block: true, reason }', t: 'Bloquea', s: 'la herramienta no se ejecuta', tone: 'bad' },
    ],
    back: 'el motivo vuelve como resultado',
  },
  html(d, H) {
    const cys = [415, 630, 845], col = { ok: 'var(--ok)', cy: 'var(--cyan)', bad: 'var(--red)' }, stroke = { ok: '#34d399', cy: '#60a5fa', bad: '#f87171' };
    const exits = d.exits.slice(0, 3).map((e, i) => `<div class="g r" data-i="${i + 3}" style="left:1260px;top:${cys[i] - 92}px;width:540px;height:184px;padding:22px 30px;border-left:6px solid ${col[e.tone] || col.cy}">
<div class="mono" style="font-size:26px;color:${col[e.tone] || col.cy}">${H.esc(e.code)}</div>
<div class="t" style="font-size:40px;margin-top:10px">${H.A(e.t)}</div><div class="s" style="font-size:26px;margin-top:2px">${H.A(e.s)}</div></div>`).join('\n');
    const curves = d.exits.slice(0, 3).map((e, i) => `<path class="draw" data-i="${i + 3}" stroke="${stroke[e.tone] || stroke.cy}" d="M1180 630 C1220 630 1220 ${cys[i]} 1260 ${cys[i]}"/>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M380 630 H440"/><path class="draw" data-i="2" d="M800 630 H860"/>${curves}
<path class="draw" data-i="6" stroke="#f87171" stroke-dasharray="none" d="M1530 937 V960 H250 V730"/></svg>
<div class="g r" data-i="1" style="left:120px;top:530px;width:260px;height:200px;padding:28px 24px;text-align:center">${H.GLYPH('cpu-chip', 56)}<div class="t" style="font-size:30px;margin-top:10px">${H.A(d.model)}</div></div>
<div class="g r" data-i="2" style="left:440px;top:520px;width:360px;height:220px;padding:26px 28px"><div class="k cy">${H.A(d.call.k)}</div>
<div class="mono" style="font-size:44px;font-weight:700;margin-top:14px">${H.esc(d.call.name)}</div><div class="mono" style="font-size:24px;color:var(--pale);margin-top:14px">${H.esc(d.call.input)}</div></div>
<div class="g lit r" data-i="1" style="left:860px;top:530px;width:320px;height:200px;padding:0 20px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:20px"><div class="k cy">${H.A(d.handler.k)}</div><div class="mono" style="font-size:24px;line-height:1.35">${H.esc(d.handler.name)}</div></div>
${exits}
<div class="abs r" data-i="6" style="left:400px;top:905px;width:720px;text-align:center"><span class="mono bad" style="font-size:26px">${H.A(d.back)}</span></div>`;
  },
};
