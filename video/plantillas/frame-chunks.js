/* frame-chunks · vídeo 21 · protocolo RPC v2: un mensaje más largo que el límite de línea sale troceado en varias
   líneas y el cliente lo vuelve a juntar, en lugar de recortarse. Datos: kicker, title, msg, limit, parts (2–4, esquemático),
   chunk (texto de cada línea), client = { k, t, ok }. Pasos: 1 mensaje que pasa el límite, 2 troceado en líneas, 3 el cliente lo junta. */
TPL['frame-chunks'] = {
  def: {
    kicker: 'RPC v2 · maxFrameBytes: 1048576', title: 'Troceado, [[no recortado]]',
    msg: 'un mensaje más grande que el límite', limit: 'límite de cada línea · 1 MB', parts: 3,
    chunk: '{"type":"rpc_chunk", …}',
    client: { k: 'tu cliente', t: 'vuelve a juntar los trozos', ok: 'un solo mensaje, entero' },
  },
  html(d, H) {
    const n = Math.max(2, Math.min(4, d.parts)), seg = 1680 / n, pitch = n > 3 ? 78 : 92, y = k => 560 + k * pitch, rh = pitch - 18;
    const divs = Array.from({ length: n - 1 }, (_, k) => `<line class="draw" data-i="2" x1="${120 + seg * (k + 1)}" y1="356" x2="${120 + seg * (k + 1)}" y2="466" stroke-width="4"/>`).join('');
    const rows = Array.from({ length: n }, (_, k) => `<div class="abs flex r" data-i="2" style="left:120px;top:${y(k)}px;width:${Math.round(seg)}px;height:${rh}px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--cyan);padding:0 24px"><span class="mono" style="font-size:24px">${H.esc(d.chunk)}</span></div>`).join('');
    const join = Array.from({ length: n }, (_, k) => `<path class="draw" data-i="3" d="M${120 + seg} ${y(k) + rh / 2} C${120 + seg + 110} ${y(k) + rh / 2} ${120 + seg + 110} ${y(0) + 140} 900 ${y(0) + 140}"/>`).join('');
    const bar = Array.from({ length: n }, (_, k) => `<div style="flex:1;height:52px;border-radius:8px;background:rgba(96,165,250,.35);border:1.5px solid var(--cyan)"></div>`).join('');
    const top = y(0), C = d.client;
    return `${H.HEAD(d)}
<div class="abs s r" data-i="1" style="left:120px;top:302px;width:520px;font-size:28px;color:var(--ink)">${H.A(d.msg)}</div>
<div class="g r" data-i="1" style="left:120px;top:356px;width:1680px;height:110px;padding:0;background:linear-gradient(90deg,rgba(96,165,250,.30),rgba(96,165,250,.12))"></div>
<div class="abs r" data-i="1" style="left:${118 + seg}px;top:342px;width:4px;height:140px;background:repeating-linear-gradient(var(--amber) 0 14px, transparent 14px 24px)"></div>
<div class="abs k am r" data-i="1" style="left:${140 + seg}px;top:484px">${H.esc(d.limit)}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${divs}${join}</svg>
${rows}
<div class="g lit r" data-i="3" style="left:900px;top:${top}px;width:900px;height:280px"><div class="k">${H.A(C.k)}</div><div class="t" style="font-size:36px;margin-top:12px">${H.A(C.t)}</div>
<div class="flex" style="gap:8px;margin-top:22px">${bar}</div>
<div class="flex" style="gap:14px;margin-top:20px">${H.GLYPH('check-circle', 34, 'ok')}<span class="s" style="font-size:28px;color:var(--ink)">${H.A(C.ok)}</span></div></div>`;
  },
};
