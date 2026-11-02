/* tool-allowlist · vídeo 21 · SDK de oh my pi: toolNames pide herramientas pero no quita las demás; con
   restrictToolNames: true las pedidas son las únicas. Datos: kicker, title, ask = { k, code }, asked[] (2–4), rest[] (3–8, las
   que siguen), open = { k, note }, strict = { k, add, code, note }, close = { k, code }. Pasos: 1 lo pedido, 2 las demás siguen,
   3 restrictToolNames, 4 el cierre. */
TPL['tool-allowlist'] = {
  def: {
    kicker: 'El SDK de oh my pi', title: 'toolNames [[no es una lista blanca]]',
    ask: { k: 'resumen.ts pide', code: 'toolNames: ["read", "grep", "glob"]' },
    asked: ['read', 'grep', 'glob'], rest: ['bash', 'edit', 'write', 'lsp', 'task', 'eval', '…'],
    open: { k: 'sin restrictToolNames', note: 'no quita las demás' },
    strict: { k: 'con restrictToolNames', add: 'y añade', code: 'restrictToolNames: true', note: 'solo esas' },
    close: { k: 'al final · el cierre es asíncrono', code: 'await session.dispose()' },
  },
  html(d, H) {
    const lit = t => `<span class="chip" style="color:var(--ink);border-color:var(--cyan);background:rgba(96,165,250,.28)">${H.esc(t)}</span>`;
    const dim = t => `<span class="chip">${H.esc(t)}</span>`;
    const O = d.open, S = d.strict;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<line class="draw" data-i="1" x1="760" y1="430" x2="820" y2="430"/><line class="draw" data-i="3" x1="760" y1="712" x2="820" y2="712"/></svg>
<div class="g r" data-i="1" style="left:120px;top:340px;width:640px;height:180px"><div class="k">${H.A(d.ask.k)}</div><div class="mono" style="font-size:24px;margin-top:24px;white-space:pre">${H.esc(d.ask.code)}</div></div>
<div class="g r" data-i="1" style="left:820px;top:340px;width:980px;height:260px"><div class="flex" style="justify-content:space-between"><span class="k">${H.A(O.k)}</span><span class="r s am" data-i="2" style="font-size:26px">${H.A(O.note)}</span></div>
<div class="flex" style="flex-wrap:wrap;gap:14px;margin-top:24px">${d.asked.map(lit).join('')}<span class="r flex" data-i="2" style="flex-wrap:wrap;gap:14px">${d.rest.map(dim).join('')}</span></div></div>
<div class="g r" data-i="3" style="left:120px;top:630px;width:640px;height:164px"><div class="k">${H.A(S.add)}</div><div class="mono cy" style="font-size:26px;margin-top:20px;white-space:pre">${H.esc(S.code)}</div></div>
<div class="g lit r" data-i="3" style="left:820px;top:630px;width:980px;height:164px"><div class="flex" style="justify-content:space-between"><span class="k">${H.A(S.k)}</span><span class="s ok" style="font-size:26px">${H.A(S.note)}</span></div>
<div class="flex" style="gap:14px;margin-top:18px">${d.asked.map(lit).join('')}</div></div>
<div class="g r flex" data-i="4" style="left:120px;top:830px;width:1680px;height:110px;padding:0 34px;gap:30px"><span class="k">${H.A(d.close.k)}</span><span class="mono" style="font-size:28px">${H.esc(d.close.code)}</span></div>`;
  },
};
