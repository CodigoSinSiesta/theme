/* spawn-vs-clone · vídeo 16 · de dónde parte cada agente: un subagente nuevo sin historial frente a un clon que
   copia la sesión. Datos: kicker, title, session = { label, bars }, spawn = { label, empty, note }, clone = { label, bars, note,
   model }. Pasos: 1 sesión, 2 subagente, 3 clon, 4 nota del clon, 5 modelo del clon. */
TPL['spawn-vs-clone'] = {
  def: {
    kicker: 'task frente a /tan', title: 'Empezar de cero [[o clonar la sesión]]',
    session: { label: 'tu sesión', bars: [92, 70, 84, 60] },
    spawn: { label: 'task · subagente', empty: 'sin historial', note: 'solo el texto del encargo' },
    clone: { label: '/tan · clon', bars: [92, 70, 84], note: 'solo este encargo · no toques su trabajo', model: '/switch @smol → Flash' },
  },
  html(d, H) {
    const bar = (w, mt = 12) => `<i style="display:block;height:26px;border-radius:7px;background:rgba(96,165,250,.38);margin-top:${mt}px;width:${+w}%"></i>`;
    return `${H.HEAD(d)}
<div class="g lit r" data-i="1" style="left:710px;top:300px;width:500px;height:236px"><div class="k">${H.A(d.session.label)}</div>${d.session.bars.map((w, i) => bar(w, i ? 12 : 18)).join('')}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M840 536 C840 590 500 580 500 626"/><path class="draw" data-i="3" d="M1080 536 C1080 590 1420 580 1420 626"/></svg>
<div class="g r" data-i="2" style="left:160px;top:626px;width:680px;height:330px"><div class="k">${H.A(d.spawn.label)}</div>
<div style="margin-top:18px;height:128px;border:2px dashed var(--line);border-radius:14px;display:grid;place-items:center" class="k">${H.A(d.spawn.empty)}</div>
<div class="s" style="margin-top:20px;font-size:28px">${H.A(d.spawn.note)}</div></div>
<div class="g r" data-i="3" style="left:1080px;top:626px;width:680px;height:330px"><div class="k">${H.A(d.clone.label)}</div>${d.clone.bars.map((w, i) => bar(w, i ? 12 : 18)).join('')}
<div class="flex" style="gap:14px;margin-top:22px;flex-wrap:wrap"><span class="chip r" data-i="4" style="font-size:22px">${H.A(d.clone.note)}</span><span class="chip r" data-i="5" style="font-size:22px;border-color:var(--cyan)">${H.A(d.clone.model)}</span></div></div>`;
  },
};
