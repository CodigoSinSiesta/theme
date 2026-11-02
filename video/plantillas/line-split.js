/* line-split · vídeo 10 · el mismo flujo JSONL cortado de dos maneras: readline también corta en U+2028 y parte
   un registro; separar solo por \n deja los registros enteros. Datos: kicker, title, stream = { label, a, sep, b, c }, bad = { label,
   pieces[] = { t, ok } }, good = { label, pieces[] }, note. Pasos: 1 flujo, 2 readline, 3 trozos (rotos y enteros), 4 por \n, 5 nota. */
TPL['line-split'] = {
  def: {
    kicker: 'Leer JSONL desde código', title: 'Corta [[solo por \\n]]',
    stream: { label: 'stdout de pi --mode json', a: '{"type":"message_update","delta":"…', sep: 'U+2028', b: '…"}', c: '{"type":"agent_settled"}' },
    bad: { label: 'readline · corta también en U+2028 y U+2029', pieces: [
      { t: '{"type":"message_update","delta":"…', ok: false }, { t: '…"}', ok: false }, { t: '{"type":"agent_settled"}', ok: true }] },
    good: { label: 'Decodificador de bytes · separa por \\n', pieces: [
      { t: '{"type":"message_update","delta":"… U+2028 …"}', ok: true }, { t: '{"type":"agent_settled"}', ok: true }] },
    note: 'Y lee la salida sin parar: [[si dejas de leer, Pi se queda esperando]].',
  },
  html(d, H) {
    const s = d.stream, nl = `<span class="cy" style="font-weight:700">\\n</span>`;
    const piece = (p, i) => `<div class="flex r" data-i="${i}" style="margin-top:12px;height:72px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid ${p.ok ? 'var(--line)' : 'var(--red)'};padding:0 22px;justify-content:space-between">
<span class="mono" style="font-size:22px;line-height:1.2;white-space:nowrap">${H.esc(p.t)}</span><span class="t ${p.ok ? 'ok' : 'bad'}" style="font-size:28px;line-height:1">${p.ok ? '✓' : '✕'}</span></div>`;
    const bad = d.bad.pieces.map(p => piece(p, 3)).join('');
    const good = d.good.pieces.map(p => piece(p, 4)).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:1680px;height:150px;padding:24px 34px"><div class="k">${H.esc(s.label)}</div>
<div class="mono" style="font-size:28px;margin-top:20px;white-space:nowrap">${H.esc(s.a)}<span class="chip" style="font-size:26px;font-weight:700;color:var(--amber);border-color:var(--amber);padding:6px 12px;margin:0 6px">${H.esc(s.sep)}</span>${H.esc(s.b)}${nl}${H.esc(s.c)}${nl}</div></div>
<div class="g r" data-i="2" style="left:120px;top:510px;width:820px;height:330px;padding:24px 30px"><div class="k bad">${H.A(d.bad.label)}</div>${bad}</div>
<div class="g lit r" data-i="4" style="left:980px;top:510px;width:820px;height:330px;padding:24px 30px"><div class="k ok">${H.A(d.good.label).replace(/\\n/g, '<span style="text-transform:none">\\n</span>')}</div>${good}</div>
<div class="g r" data-i="5" style="left:120px;top:880px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
