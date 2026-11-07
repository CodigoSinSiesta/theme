/* hook-pipeline · modelo → hook pre (¿permitir?) → herramienta → hook post, con rama de bloqueo hacia abajo.
   Datos: kicker, title, model = { title }, pre/post = { kicker, title }, tool = { title }, block = { kicker, text }, yes, no. 5 pasos fijos. */
TPL['hook-pipeline'] = {
  def: {
    kicker: 'Hooks', title: 'Antes y después [[de cada herramienta]]',
    model: { title: 'Modelo pide' },
    pre: { kicker: 'hook pre', title: '¿permitir?' },
    tool: { title: 'Herramienta' },
    post: { kicker: 'hook post', title: 'registrar' },
    block: { kicker: 'bloquea', text: 'motivo al modelo' },
    yes: 'sí', no: 'no',
  },
  html(d, H) {
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4">
<line class="draw" data-i="2" x1="420" y1="600" x2="520" y2="600"/><line class="draw" data-i="3" x1="820" y1="600" x2="920" y2="600" stroke="#34d399"/><line class="draw" data-i="4" x1="1220" y1="600" x2="1320" y2="600"/>
<line class="draw" data-i="5" x1="670" y1="680" x2="670" y2="760" stroke="#f87171"/></svg>
<div class="g r flex" data-i="1" style="left:120px;top:520px;width:300px;height:160px;flex-direction:column;justify-content:center;gap:10px">${H.GLYPH('model', 48)}<span class="t" style="font-size:32px">${H.A(d.model.title)}</span></div>
<div class="g lit r" data-i="2" style="left:520px;top:520px;width:300px;height:160px;text-align:center;padding:40px 10px"><div class="k cy">${H.A(d.pre.kicker)}</div><div class="t" style="font-size:32px;margin-top:10px">${H.A(d.pre.title)}</div></div>
<div class="g r flex" data-i="3" style="left:920px;top:520px;width:300px;height:160px;flex-direction:column;justify-content:center;gap:10px">${H.GLYPH('tool', 48)}<span class="t" style="font-size:32px">${H.A(d.tool.title)}</span></div>
<div class="g r" data-i="4" style="left:1320px;top:520px;width:300px;height:160px;text-align:center;padding:40px 10px"><div class="k cy">${H.A(d.post.kicker)}</div><div class="t" style="font-size:32px;margin-top:10px">${H.A(d.post.title)}</div></div>
<div class="g r" data-i="5" style="left:520px;top:760px;width:300px;height:130px;text-align:center;padding:26px 10px;border-color:var(--red)"><div class="k bad">${H.A(d.block.kicker)}</div><div class="s" style="font-size:24px;margin-top:6px">${H.A(d.block.text)}</div></div>
<div class="abs mono ok r" data-i="3" style="left:850px;top:556px;font-size:26px">${H.A(d.yes)}</div><div class="abs mono bad r" data-i="5" style="left:690px;top:700px;font-size:26px">${H.A(d.no)}</div>`;
  },
};
