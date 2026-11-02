/* truncate-once · vídeo 22 · dónde se acota la salida: una sola vez en el centro (un corte, un aviso) frente a cada
   herramienta por su cuenta (cada una con su aviso y alguna sin cortar). Esquemático: herramientas genéricas. Datos: kicker, title,
   limits[3] = { icon, t }, center = { k, cut, model, notice }, own = { k, notices[2], forgot }, tools[3]. Pasos: 1–3 los tres
   límites, 4 una vez en el centro, 5 cada herramienta trunca, 6 cada una su aviso, 7 una se olvida. */
TPL['truncate-once'] = {
  def: {
    kicker: 'Playbook · dónde viven los límites', title: 'Acota la salida [[una sola vez]]',
    limits: [{ icon: 'document-text', t: 'texto que llega al modelo' }, { icon: 'clock', t: 'tiempo de un comando' }, { icon: 'hand-raised', t: 'qué se aprueba solo' }],
    tools: ['herramienta A', 'herramienta B', 'herramienta C'],
    center: { k: 'en el centro · una vez', cut: 'límite', model: 'modelo', notice: 'un solo aviso, igual para todas' },
    own: { k: 'cada herramienta, por su cuenta', notices: ['su aviso', 'otro aviso'], forgot: 'se olvida de truncar' },
  },
  html(d, H) {
    const lim = d.limits.map((l, i) => `<div class="g r flex" data-i="${i + 1}" style="left:${120 + i * 570}px;top:296px;width:540px;height:80px;padding:0 28px;gap:18px">${H.GLYPH(l.icon, 36)}<span class="s" style="font-size:28px;color:var(--ink)">${H.esc(l.t)}</span></div>`).join('');
    const chip = (x, y, t, i, extra = '') => `<div class="abs r" data-i="${i}" style="left:${x}px;top:${y}px;width:250px"><span class="chip" style="display:block;text-align:center;font-size:24px${extra}">${H.esc(t)}</span></div>`;
    const ly = i => 520 + i * 120, ry = i => 540 + i * 135;
    const left = d.tools.map((t, i) => chip(156, ly(i) - 27, t, 4)).join('');
    const right = d.tools.map((t, i) => chip(1016, ry(i) - 27, t, 5)).join('');
    const bars = [0, 1].map(i => `<i class="bx" data-i="5" style="position:absolute;left:1290px;top:${ry(i) - 12}px;width:170px;height:24px;border-radius:6px;background:rgba(96,165,250,.55)"></i>
<div class="abs r" data-i="5" style="left:1462px;top:${ry(i) - 22}px">${H.GLYPH('scissors', 44)}</div>`).join('');
    const notes = d.own.notices.map((t, i) => `<div class="abs r" data-i="6" style="left:1530px;top:${ry(i) - 27}px;width:240px"><span class="${i ? 'chip' : 'pill'}" style="display:block;text-align:center;font-size:24px;${i ? 'border-style:dashed;color:var(--amber)' : 'color:var(--cyan)'}">${H.esc(t)}</span></div>`).join('');
    return `${H.HEAD(d)}
${lim}
<div class="g lit r" data-i="4" style="left:120px;top:410px;width:800px;height:550px"><div class="k cy">${H.esc(d.center.k)}</div></div>
<div class="g r" data-i="5" style="left:980px;top:410px;width:820px;height:550px"><div class="k">${H.esc(d.own.k)}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
${d.tools.map((t, i) => `<path class="draw" data-i="4" d="M406 ${ly(i)} C450 ${ly(i)} 440 ${ly(1)} 488 ${ly(1)}"/>`).join('')}
<line class="draw" data-i="4" x1="652" y1="${ly(1)}" x2="704" y2="${ly(1)}"/></svg>
${left}
<div class="g r flex" data-i="4" style="left:488px;top:${ly(1) - 80}px;width:164px;height:160px;padding:0;flex-direction:column;justify-content:center;gap:10px">${H.GLYPH('scissors', 48)}<span class="k cy">${H.esc(d.center.cut)}</span></div>
<div class="g r flex" data-i="4" style="left:704px;top:${ly(1) - 80}px;width:180px;height:160px;padding:0;flex-direction:column;justify-content:center;gap:10px">${H.GLYPH('cpu-chip', 48)}<span class="k">${H.esc(d.center.model)}</span></div>
<div class="abs r" data-i="4" style="left:156px;top:850px;width:728px;text-align:center"><span class="pill" style="color:var(--cyan)">${H.esc(d.center.notice)}</span></div>
${right}${bars}${notes}
<i class="bx" data-i="7" style="position:absolute;left:1290px;top:${ry(2) - 12}px;width:440px;height:24px;border-radius:6px 0 0 6px;background:rgba(248,113,113,.7)"></i>
<svg class="abs r" data-i="7" style="left:1730px;top:${ry(2) - 24}px" width="30" height="48"><path d="M0 0 L28 24 L0 48 Z" fill="rgba(248,113,113,.9)"/></svg>
<div class="abs flex r" data-i="7" style="left:1290px;top:${ry(2) + 36}px;gap:12px">${H.GLYPH('x-circle', 34, 'bad')}<span class="s bad" style="font-size:26px">${H.esc(d.own.forgot)}</span></div>`;
  },
};
