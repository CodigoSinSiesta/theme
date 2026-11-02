/* bang-to-context · vídeo 02 · la salida de un comando con «!» entra en la siguiente petición junto a tu mensaje.
   Datos: kicker, title, pane, cmd, out, msg, req, reqItems[2] (salida, mensaje), model, you/agent = { k, t }. Fijo: un comando y un
   mensaje. Pasos: 1 comando y petición vacía, 2 salida → petición, 3 mensaje → petición, 4 el modelo la tiene, 5 nota de variables. */
TPL['bang-to-context'] = {
  def: {
    kicker: 'Un caso típico', title: 'La salida ya está [[en el contexto]]',
    pane: 'Pi · tu sesión', cmd: '!npm test', out: '✕ pruebas que fallan', msg: 'arregla esto',
    req: 'siguiente petición', reqItems: ['salida de !npm test', 'arregla esto'], model: 'El modelo ya tiene la salida, sin copiarla',
    you: { k: 'tus comandos · ! y !!', t: 'sin variables de sesión' },
    agent: { k: 'comandos del modelo', t: 'id de sesión · modelo activo' },
  },
  html(d, H) {
    const row = (top, t, i, amber) => `<div class="abs r" data-i="${i}" style="left:1120px;top:${top}px;width:640px;height:80px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);${amber ? 'border-left:6px solid var(--amber);' : ''}display:flex;align-items:center;padding:0 24px"><span class="mono" style="font-size:28px;color:${amber ? 'var(--amber)' : 'var(--ink)'}">${H.esc(t)}</span></div>`;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:760px;height:440px"><div class="k">${H.A(d.pane)}</div></div>
<div class="abs r" data-i="1" style="left:160px;top:390px;width:680px;height:160px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);border-left:6px solid var(--amber);padding:24px 28px">
<div class="mono" style="font-size:34px;color:var(--amber)">${H.esc(d.cmd)}</div>
<div class="mono bad r" data-i="2" style="font-size:28px;margin-top:20px">${H.esc(d.out)}</div></div>
<div class="abs r" data-i="3" style="left:160px;top:600px;width:680px;height:96px;border-radius:14px;border:1.5px solid var(--cyan);background:rgba(30,58,138,.38);display:flex;align-items:center;padding:0 28px"><span class="mono cy" style="font-size:32px">› ${H.esc(d.msg)}</span></div>
<div class="g lit r" data-i="1" style="left:1080px;top:320px;width:720px;height:440px"><div class="k">${H.A(d.req)}</div></div>
${row(390, d.reqItems[0], 2, true)}${row(490, d.reqItems[1], 3, false)}
<div class="abs r flex" data-i="4" style="left:1120px;top:610px;width:640px;gap:22px">${H.GLYPH('cpu-chip', 56)}<span class="s" style="font-size:28px;color:var(--ink)">${H.A(d.model)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M842 470 C960 470 990 430 1110 430"/><path class="draw" data-i="3" d="M842 648 C960 648 990 530 1110 530"/></svg>
<div class="g r" data-i="5" style="left:120px;top:810px;width:820px;height:140px;border-left:6px solid var(--amber)"><div class="k am">${H.A(d.you.k)}</div><div class="s" style="margin-top:12px">${H.A(d.you.t)}</div></div>
<div class="g r" data-i="5" style="left:980px;top:810px;width:820px;height:140px;border-left:6px solid var(--cyan)"><div class="k cy">${H.A(d.agent.k)}</div><div class="s" style="margin-top:12px">${H.A(d.agent.t)}</div></div>`;
  },
};
