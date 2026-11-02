/* memory · agente central con almacenes de memoria que se rellenan (curvas desde el agente a cada tarjeta).
   Datos: agent = { logo, name }, stores[] (2–4) = { label, sub, bars?: [{w, dim?}] | chips?: [{t, accent?}] }. Paso 1 agente, 2… almacenes. */
TPL.memory = {
  def: {
    kicker: 'Aprendizaje', title: 'Un agente [[que recuerda]]',
    agent: { logo: 'hermes', name: 'Hermes' },
    stores: [
      { label: 'Corta', sub: 'lo de esta sesión', bars: [{ w: 300 }, { w: 420, dim: true }, { w: 220 }] },
      { label: 'Larga', sub: 'lo que sabe de ti', chips: [{ t: 'prefiere español' }, { t: 'usa VPS' }, { t: 'repo: csn' }] },
      { label: 'Skills', sub: 'lo que ha aprendido a hacer', chips: [{ t: 'informe.md' }, { t: 'deploy.md' }, { t: '+ nueva', accent: true }] },
    ],
  },
  html(d, H) {
    const n = d.stores.length, w = Math.round((1680 - (n - 1) * 60) / n);
    const cx = i => 120 + i * (w + 60) + w / 2;
    const paths = d.stores.map((s, i) => `<path class="draw" data-i="${i + 2}" d="M960 520 C960 580 ${cx(i)} 580 ${cx(i)} 640"/>`).join('');
    const cards = d.stores.map((s, i) => {
      const body = s.bars
        ? `<div style="margin-top:26px">${s.bars.map((b, j) => `<i class="bx" data-i="${i + 2}" style="display:block;height:18px;width:${Math.min(b.w, w - 80)}px;background:var(--cyan);border-radius:9px;${j < s.bars.length - 1 ? 'margin-bottom:14px;' : ''}${b.dim ? 'background:rgba(96,165,250,.6)' : ''}"></i>`).join('')}</div>`
        : `<div style="margin-top:22px;display:flex;flex-wrap:wrap;gap:12px">${(s.chips || []).map(c => `<span class="chip" style="font-size:22px${c.accent ? ';border-color:var(--cyan)' : ''}">${H.esc(c.t)}</span>`).join('')}</div>`;
      return `<div class="g r" data-i="${i + 2}" style="left:${120 + i * (w + 60)}px;top:640px;width:${w}px;height:310px"><div class="k">${H.A(s.label)}</div><div class="s" style="font-size:26px;margin-top:6px">${H.A(s.sub)}</div>${body}</div>`;
    }).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${paths}</svg>
<div class="g lit r" data-i="1" style="left:0;right:0;margin:0 auto;top:320px;width:max-content;min-width:400px;height:200px;display:flex;align-items:center;justify-content:center;gap:26px">${H.ICO(d.agent.logo, 110)}<span class="t">${H.A(d.agent.name)}</span></div>
${cards}`;
  },
};
