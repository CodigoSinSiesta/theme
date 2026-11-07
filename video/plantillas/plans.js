/* plans · planes o precios en tarjetas (una por paso); la marcada `lit` sobresale con insignia.
   Datos: kicker, title, plans[] = { name, price, lit?, badge?, items[] = { t, m?: 'ok'(def)|'bad'|'am' } }. 2–4 planes (el ancho se reparte). */
TPL.plans = {
  def: {
    kicker: 'Planes', title: 'Qué cuesta [[cada opción]]',
    plans: [
      { name: 'Gratis', price: '0 €', items: [{ t: '10 peticiones al día' }, { t: 'Voz estándar' }, { t: 'Sin prioridad', m: 'bad' }] },
      { name: 'Pago', price: 'Tier 1', lit: true, badge: 'recomendado', items: [{ t: '100 peticiones al día' }, { t: 'Prioridad' }, { t: 'Todos los modelos' }] },
      { name: 'Empresa', price: 'A medida', items: [{ t: 'Cuotas a pactar' }, { t: 'Soporte' }, { t: 'Contrato anual', m: 'am' }] },
    ],
  },
  html(d, H) {
    const n = d.plans.length, w = Math.floor((1680 - (n - 1) * 60) / n);
    const mk = { ok: '✓', bad: '✗', am: '●' };
    const cards = d.plans.map((p, i) => {
      const items = p.items.map(it => { const m = it.m || 'ok'; return `<span class="${m}">${mk[m]}</span> ${H.esc(it.t)}`; }).join('<br>');
      const head = p.lit
        ? `<div class="flex" style="justify-content:space-between"><div class="k cy">${H.esc(p.name)}</div>${p.badge ? `<span class="pill" style="font-size:22px;padding:6px 16px">${H.esc(p.badge)}</span>` : ''}</div>`
        : `<div class="k">${H.esc(p.name)}</div>`;
      return `<div class="g${p.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${120 + i * (w + 60)}px;top:${p.lit ? 310 : 340}px;width:${w}px;height:${p.lit ? 650 : 600}px">${head}<div class="t" style="font-size:80px;margin:14px 0">${H.esc(p.price)}</div><div class="s" style="font-size:27px;line-height:1.9">${items}</div></div>`;
    }).join('');
    return H.HEAD(d) + cards;
  },
};
