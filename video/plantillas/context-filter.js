/* context-filter · vídeo 16 · qué pasa de la sesión principal a un subagente: lo que cruza la barrera y lo que no.
   Datos: kicker, title, from, to, gate, items[] = { t, icon (Heroicon), pass } (3–5, en el orden en que se
   nombran), note. Pasos: 1 tarjetas, uno por elemento (2…n+1), n+2 nota. */
TPL['context-filter'] = {
  def: {
    kicker: 'Qué recibe un subagente', title: 'Lo que [[cruza]] y lo que no',
    from: 'Sesión principal', to: 'Subagente', gate: 'task',
    items: [{ t: 'La conversación', icon: 'chat-bubble-left-right', pass: false }, { t: 'Árbol de trabajo', icon: 'folder', pass: true }, { t: 'AGENTS.md', icon: 'document-text', pass: true }, { t: 'Contexto común del lote', icon: 'clipboard-document-list', pass: true }],
    note: 'Cada encargo se explica solo: qué ficheros, qué restricciones y cómo se sabe que está hecho.',
  },
  html(d, H) {
    const n = d.items.length, pitch = n > 4 ? 82 : 96, y = k => 430 + k * pitch;
    const row = (x, k, it, extra = '') => `<div class="abs" style="left:${x}px;top:${y(k)}px;width:560px;height:${pitch - 20}px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);display:flex;align-items:center;gap:18px;padding:0 26px;${extra}">${H.GLYPH(it.icon, 34)}<span style="font:500 28px var(--body)">${H.A(it.t)}</span></div>`;
    const left = d.items.map((it, k) => row(150, k, it)).join('');
    const strike = d.items.map((it, k) => it.pass ? '' : `<div class="abs bx" data-i="${k + 2}" style="left:170px;top:${y(k) + (pitch - 20) / 2 - 2}px;width:520px;height:4px;background:var(--red);border-radius:2px"></div>`).join('');
    const right = d.items.map((it, k) => it.pass ? `<div class="r" data-i="${k + 2}">${row(1210, k, it, 'border-color:var(--cyan)')}</div>` : '').join('');
    const paths = d.items.map((it, k) => { const yy = y(k) + (pitch - 20) / 2; return it.pass ? `<path class="draw" data-i="${k + 2}" d="M720 ${yy} H1200"/>` : `<path class="draw" data-i="${k + 2}" d="M720 ${yy} H930" stroke="#f87171"/>`; }).join('');
    const xs = d.items.map((it, k) => it.pass ? '' : `<div class="abs t bad r" data-i="${k + 2}" style="left:940px;top:${y(k) + (pitch - 20) / 2 - 30}px;font-size:48px;line-height:60px">✕</div>`).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:620px;height:${y(n) - 300}px"><div class="k">${H.A(d.from)}</div></div>
<div class="g lit r" data-i="1" style="left:1180px;top:320px;width:620px;height:${y(n) - 300}px"><div class="k">${H.A(d.to)}</div></div>
<div class="r" data-i="1">${left}</div>
<div class="abs r" data-i="1" style="left:958px;top:330px;width:4px;height:${y(n) - 330}px;background:repeating-linear-gradient(var(--line) 0 14px, transparent 14px 26px)"></div>
<div class="abs r" data-i="1" style="left:900px;top:${y(n) + 4}px;width:120px;text-align:center"><span class="mono cy" style="font-size:26px">${H.esc(d.gate)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${paths}</svg>
${strike}${xs}${right}
<div class="g lit r" data-i="${n + 2}" style="left:120px;top:${y(n) + 60}px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
