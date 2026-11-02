/* cost-calc · fórmula tokens × tarifa = coste. Datos: kicker, title, terms[] = { label, amount, rate, cost }, total = { label, value }, note.
   Un término por paso (con su «+»), luego «=» y total, luego la nota. 2–4 términos. */
TPL['cost-calc'] = {
  def: {
    kicker: 'Coste', title: 'Lo que cuesta [[una demo]]',
    terms: [
      { label: 'Entrada', amount: '12.000', rate: '× 0,30 $/M', cost: '0,36 ¢' },
      { label: 'Caché', amount: '90.000', rate: '× 0,03 $/M', cost: '0,27 ¢' },
      { label: 'Salida', amount: '8.000', rate: '× 1,20 $/M', cost: '0,96 ¢' },
    ],
    total: { label: 'Total', value: '1,6 ¢' },
    note: 'cifras de ejemplo con tarifas efectivas de DeepSeek',
  },
  html(d, H) {
    const n = d.terms.length;
    const op = (s, i) => `<span class="t cy r" data-i="${i}" style="font-size:80px">${s}</span>`;
    const body = d.terms.map((t, i) => (i ? op('+', i + 1) : '') + `<div class="g r" data-i="${i + 1}" style="position:relative;width:380px;height:360px;text-align:center"><div class="k">${H.esc(t.label)}</div><div class="t mono" style="font-size:44px;margin-top:20px">${H.esc(t.amount)}</div><div class="s" style="font-size:24px">${H.esc(t.rate)}</div><div class="t cy" style="margin-top:20px;font-size:40px">${H.esc(t.cost)}</div></div>`).join('');
    return `${H.HEAD(d)}
<div class="abs" style="left:120px;top:380px;width:1680px;display:flex;align-items:center;justify-content:space-between">${body}${op('=', n + 1)}<div class="g lit r" data-i="${n + 1}" style="position:relative;width:260px;height:360px;text-align:center;padding:24px 10px"><div class="k">${H.esc(d.total.label)}</div><div class="t" style="font-size:74px;margin-top:60px">${H.esc(d.total.value)}</div></div></div>
<div class="abs k r" data-i="${n + 2}" style="left:120px;top:830px">${H.esc(d.note)}</div>`;
  },
};
