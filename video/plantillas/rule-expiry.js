/* rule-expiry · vídeo 06 · los tres datos de una regla y lo que da el tercero: la misma regla con fecha de caducidad se borra
   al llegar el momento; sin ella, se queda para siempre. Datos: kicker, title, slots[3] = { t, s, lit? }, rule, expiry = { k, t },
   noExpiry, when, now, del, forever. Pasos: 1–3 un dato por paso, 4 la regla, 5 su caducidad, 6 se borra, 7 la misma sin caducidad. */
TPL['rule-expiry'] = {
  def: {
    kicker: 'Cada regla, con tres datos', title: 'Una regla que [[sabe cuándo irse]]',
    slots: [{ t: 'De dónde sale', s: 'el incidente o la decisión' }, { t: 'Cuándo aplica', s: 'en qué casos vale' }, { t: 'Cuándo caduca', s: 'cuándo deja de valer', lit: true }],
    rule: '«no uses la librería de fechas antigua»',
    expiry: { k: 'caduca', t: '«hasta que terminemos la migración, en noviembre»' },
    noExpiry: 'sin fecha de caducidad', when: 'noviembre', now: 'hoy',
    del: '✕ se puede borrar', forever: 'para siempre →',
  },
  html(d, H) {
    const slot = (s, k) => `<div class="g${s.lit ? ' lit' : ''} r" data-i="${k + 1}" style="left:${120 + k * 570}px;top:320px;width:540px;height:140px;padding:24px 30px">
<div class="flex" style="gap:16px"><span class="k${s.lit ? ' cy' : ''}">${k + 1}</span><span style="font:700 36px var(--disp)">${H.A(s.t)}</span></div>
<div class="s" style="font-size:26px;margin-top:10px">${H.A(s.s)}</div></div>`;
    const X = 1400, card = 'border-radius:16px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:24px 30px';
    return `${H.HEAD(d)}
${d.slots.map(slot).join('')}
<div class="abs r" data-i="4" style="left:120px;top:510px;width:1250px;height:150px;${card}">
<div class="mono" style="font-size:30px;color:var(--ink)"><span style="position:relative">${H.esc(d.rule)}<i class="bx" data-i="6" style="position:absolute;left:-6px;right:-6px;top:50%;height:4px;margin-top:-2px;background:var(--red);border-radius:2px"></i></span></div>
<div class="flex r" data-i="5" style="gap:14px;margin-top:16px"><span class="k cy">${H.A(d.expiry.k)}</span><span class="chip" style="font-size:24px;color:var(--ink);border-color:var(--cyan)">${H.esc(d.expiry.t)}</span></div></div>
<div class="abs r" data-i="6" style="left:1430px;top:558px;width:370px"><span class="pill" style="display:inline-block;color:var(--red);border-color:var(--red)">${H.A(d.del)}</span></div>
<div class="abs r" data-i="7" style="left:120px;top:690px;width:1680px;height:150px;${card}">
<div class="mono" style="font-size:30px;color:var(--ink)">${H.esc(d.rule)}</div>
<div class="s" style="font-size:26px;margin-top:20px;color:var(--pale3)">${H.A(d.noExpiry)}</div></div>
<div class="abs r" data-i="7" style="left:1430px;top:740px;width:340px"><span class="pill" style="display:inline-block;color:var(--amber);border-color:var(--amber)">${H.A(d.forever)}</span></div>
<div class="abs r" data-i="4" style="left:120px;top:890px;width:1680px;height:3px;background:var(--line)"></div>
<div class="abs k r" data-i="4" style="left:120px;top:910px">${H.A(d.now)}</div>
<div class="abs r" data-i="5" style="left:${X - 2}px;top:496px;width:4px;height:398px;background:repeating-linear-gradient(var(--cyan) 0 14px, transparent 14px 26px)"></div>
<div class="abs k cy r" data-i="5" style="left:${X - 150}px;top:910px;width:300px;text-align:center">${H.A(d.when)}</div>`;
  },
};
