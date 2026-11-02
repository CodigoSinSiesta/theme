/* serial-review · vídeo 25 · el impuesto de orquestación en una línea de tiempo: los agentes se lanzan a la vez con
   una tecla y trabajan en paralelo, pero cerrar, revisar y encajar cada resultado pasa por tu carril, de uno en uno, y los
   demás esperan. Datos: kicker, title, agents[3] = { name, end (x de 560 a 1000) }, order (orden de revisión, índices),
   launch, you = { name, sub }, review, wait, axis, note. Ancho de cada revisión fijo (320 px). Pasos: 1 carriles, 2 los agentes
   trabajan, 3 lanzar, 4 primera revisión, 5 tu atención, 6 las demás en serie, 7 nota. */
TPL['serial-review'] = {
  def: {
    kicker: 'Lección 14 · el impuesto de orquestación (Addy Osmani)', title: 'Lanzar es una tecla; [[revisar, en serie]]',
    agents: [{ name: 'agente 1', end: 760 }, { name: 'agente 2', end: 880 }, { name: 'agente 3', end: 820 }],
    order: [0, 2, 1],
    launch: 'lanzar · una tecla', you: { name: 'tú', sub: 'solo hay una' },
    review: 'cerrar · revisar · encajar', wait: 'espera', axis: 'tiempo →',
    note: 'Más agentes en paralelo no hacen más rápida tu revisión',
  },
  html(d, H) {
    const XS = 430, RW = 320, YA = [400, 490, 580], YT = 770;
    let t = 0; const start = {};
    d.order.forEach(a => { const s = Math.max(d.agents[a].end, t); start[a] = s; t = s + RW; });
    const lane = (y, name, i) => `<div class="abs s r" data-i="1" style="left:160px;top:${y - 21}px;font-size:30px;color:var(--ink)">${H.esc(name)}</div>
<div class="abs r" data-i="1" style="left:${XS}px;top:${y - 1}px;width:${1760 - XS}px;height:2px;background:var(--line)"></div>`;
    const agent = (a, k) => `<div class="abs r" data-i="2" style="left:${XS - 12}px;top:${YA[k] - 12}px;width:24px;height:24px;border-radius:50%;background:var(--cyan);box-shadow:0 0 14px var(--cyan)"></div>
<i class="bx" data-i="2" style="position:absolute;left:${XS}px;top:${YA[k] - 18}px;width:${a.end - XS}px;height:36px;border-radius:10px;background:linear-gradient(90deg,rgba(96,165,250,.8),rgba(96,165,250,.4))"></i>`;
    const rev = (a, n) => { const i = n ? 6 : 4, s = start[a], k = a, waited = s > d.agents[a].end;
      return `<i class="bx" data-i="${i}" style="position:absolute;left:${s + 2}px;top:${YT - 28}px;width:${RW - 6}px;height:56px;border-radius:12px;background:rgba(96,165,250,.32);border:1.5px solid var(--cyan)"></i>
<div class="abs mono r" data-i="${i}" style="left:${s + 26}px;top:${YT - 16}px;font-size:24px;color:var(--ink)">${H.esc(d.agents[a].name)}</div>
${waited ? `<path class="draw" data-i="${i}" d="M${d.agents[a].end} ${YA[k]} H${s}" stroke="#fbbf24" stroke-dasharray="10 8"/>` : ''}
<path class="draw" data-i="${i}" d="M${s} ${YA[k] + (waited ? 0 : 18)} V${YT - 30}" stroke-dasharray="6 8"/>`; };
    const svgRev = d.order.map((a, n) => rev(a, n)).join('');
    const paths = svgRev.match(/<path[^>]*\/>/g).join(''), blocks = svgRev.replace(/<path[^>]*\/>/g, '');
    const waitLab = d.order.slice(1).map((a, n) => `<div class="abs k am r" data-i="6" style="left:${d.agents[a].end + 24}px;top:${YA[a] - 54}px">${H.A(d.wait)}</div>`).join('');
    return `${H.HEAD(d)}
${d.agents.map((a, k) => lane(YA[k], a.name, 1)).join('')}${lane(YT, d.you.name, 1)}
<div class="abs k r" data-i="5" style="left:160px;top:${YT + 26}px;color:var(--cyan)">${H.A(d.you.sub)}</div>
<div class="abs r" data-i="3" style="left:${XS - 40}px;top:300px"><span class="chip">${H.esc(d.launch)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="3" d="M${XS} 362 V${YA[2] + 24}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4 8"/>${paths}</svg>
${d.agents.map(agent).join('')}${blocks}${waitLab}
<div class="abs k r" data-i="4" style="left:160px;top:${YT - 72}px">${H.A(d.review)}</div>
<div class="abs k" style="left:1580px;top:${YT + 44}px">${H.A(d.axis)}</div>
<div class="g lit r" data-i="7" style="left:120px;top:880px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
