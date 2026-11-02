/* queue-modes · vídeo 02 · la cola de mensajes: una tecla la devuelve al editor y un ajuste decide si se entrega de uno en uno o junta.
   Datos: kicker, title, editor, queue, msgs[] (2–3), key, modes[2] = { name, note, all }, turn. Pasos: 1 cola, 2 tecla y vuelta al editor,
   3 primer modo, 4 segundo modo. */
TPL['queue-modes'] = {
  def: {
    kicker: 'La cola · steeringMode y followUpMode', title: 'Recuperar la cola [[o elegir cómo se entrega]]',
    editor: 'editor', queue: 'en cola', msgs: ['mensaje 1', 'mensaje 2', 'mensaje 3'], key: 'Alt+↑',
    modes: [{ name: 'one-at-a-time', note: 'por defecto · de uno en uno', all: false }, { name: 'all', note: 'se entregan juntos', all: true }],
    turn: 'turno',
  },
  html(d, H) {
    const chips = d.msgs.map(m => `<span class="chip" style="font-size:22px;padding:8px 16px">${H.esc(m)}</span>`).join('');
    const T = (w, first) => `<div style="width:${w}px;height:84px;border-radius:12px;background:rgba(96,165,250,.32);border:1.5px solid var(--cyan);display:grid;place-items:center;flex:none"><span class="k" style="color:var(--ink)">${first ? H.esc(d.turn) : ''}</span></div>`;
    const M = k => `<div style="width:76px;height:76px;border-radius:12px;background:rgba(251,191,36,.22);border:2px solid var(--amber);display:grid;place-items:center;flex:none"><span class="mono am" style="font-size:28px;font-weight:700">${k + 1}</span></div>`;
    const lane = (m, j) => {
      const n = d.msgs.length;
      const seq = m.all ? T(260, 1) + `<div class="flex" style="gap:8px">${d.msgs.map((_, k) => M(k)).join('')}</div>` + T(260)
        : T(220, 1) + d.msgs.map((_, k) => M(k) + T(n > 2 ? 170 : 220)).join('');
      return `<div class="abs r" data-i="${j + 3}" style="left:120px;top:${590 + j * 190}px;width:1680px;height:150px;padding-top:30px;display:flex;align-items:center;gap:0">
<div style="width:420px;flex:none"><div class="mono cy" style="font-size:32px">${H.esc(m.name)}</div><div class="s" style="font-size:24px;margin-top:6px">${H.A(m.note)}</div></div>
<div class="flex" style="gap:14px">${seq}</div></div>`;
    };
    return `${H.HEAD(d)}
<div class="g" style="left:120px;top:330px;width:640px;height:170px"><div class="k">${H.A(d.editor)}</div></div>
<div class="abs flex r" data-i="2" style="left:154px;top:410px;width:580px;gap:12px">${chips}</div>
<div class="g" style="left:1160px;top:330px;width:640px;height:170px;border-color:var(--amber)"><div class="k am">${H.A(d.queue)}</div></div>
<div class="abs flex r" data-i="1" data-off="2" style="left:1194px;top:410px;width:580px;gap:12px">${chips}</div>
<div class="abs r" data-i="2" style="left:840px;top:322px;width:240px;text-align:center"><span class="kc" style="font-size:32px;padding:20px 30px">${H.esc(d.key)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4">
<path class="draw" data-i="2" d="M1140 450 H782"/><path class="draw" data-i="2" d="M802 434 L782 450 L802 466"/></svg>
${d.modes.map((m, j) => `<div class="abs r" data-i="${j + 3}" style="left:120px;top:${590 + j * 190}px;width:1680px;height:2px;background:var(--line)"></div>`).join('')}${d.modes.map(lane).join('')}`;
  },
};
