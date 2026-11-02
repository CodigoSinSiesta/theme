/* cost-by-model · vídeo 04 · el coste de una sesión repartido por modelo en una barra, y debajo lo repagado por fallos de caché a la misma escala.
   Datos: kicker, title, total = { label, v, text }, parts[] = { name, v, text, lit? } (2–4; v en la misma unidad que total.v), extra = { label, v, text, note }
   (v ≤ 60 % del total para que quepa el texto), note. Pasos: 1 total, 2…n+1 un modelo, n+2 lo repagado, n+3 nota. */
TPL['cost-by-model'] = {
  def: {
    kicker: '/session · coste por modelo', title: 'Lo que costó [[cada modelo]]',
    total: { label: 'coste total', v: 12, text: '0,012 $' },
    parts: [
      { name: 'deepseek-v4-pro', v: 10, text: '0,010 $', lit: true },
      { name: 'deepseek-flash', v: 2, text: '0,002 $' },
      { name: 'llama3.2 · local', v: 0, text: '0,000 $' },
    ],
    extra: { label: 'cache re-billed', v: 6, text: '0,006 $', note: '8.556 tokens · 2 fallos de caché' },
    note: 'Lo que pagamos de más [[por cambiar de modelo]].',
  },
  html(d, H) {
    const n = d.parts.length, W = 1680, k = W / d.total.v;
    const col = ['rgba(96,165,250,.8)', 'rgba(96,165,250,.38)', 'rgba(148,163,184,.4)', 'rgba(148,163,184,.22)'];
    let x = 120;
    const segs = d.parts.map((p, i) => { const w = Math.round(p.v * k), s = w ? `<i class="bx" data-i="${i + 2}" style="position:absolute;left:${x}px;top:400px;width:${w}px;height:80px;background:${col[i]};border-radius:${i ? 0 : 14}px ${x + w >= 120 + W - 1 ? 14 : 0}px ${x + w >= 120 + W - 1 ? 14 : 0}px ${i ? 0 : 14}px"></i>` : ''; x += w; return s; }).join('');
    const legend = d.parts.map((p, i) => `<div class="abs flex r" data-i="${i + 2}" style="left:120px;top:${514 + i * 60}px;gap:20px;height:48px"><i style="width:30px;height:30px;border-radius:8px;${p.v ? `background:${col[i]}` : 'border:2px dashed var(--pale3)'}"></i><span class="mono${p.lit ? ' cy' : ''}" style="font-size:28px;width:420px">${H.esc(p.name)}</span><span class="mono" style="font-size:28px;${p.lit ? 'color:var(--ink);font-weight:700' : 'color:var(--pale)'}">${H.esc(p.text)}</span></div>`).join('');
    const ew = Math.round(d.extra.v * k), ey = 514 + n * 60 + 30;
    return `${H.HEAD(d)}
<div class="abs k r" data-i="1" style="left:120px;top:350px">${H.A(d.total.label)}</div>
<div class="abs t r" data-i="1" style="left:1300px;top:328px;width:500px;text-align:right;font-size:48px">${H.esc(d.total.text)}</div>
<div class="abs r" data-i="1" style="left:120px;top:400px;width:${W}px;height:80px;border:2px dashed var(--line);border-radius:14px"></div>
${segs}${legend}
<div class="abs k am r" data-i="${n + 2}" style="left:120px;top:${ey}px">${H.A(d.extra.label)}</div>
<i class="bx" data-i="${n + 2}" style="position:absolute;left:120px;top:${ey + 40}px;width:${ew}px;height:72px;background:rgba(251,191,36,.35);border:2px solid var(--amber);border-radius:14px"></i>
<div class="abs flex r" data-i="${n + 2}" style="left:${150 + ew}px;top:${ey + 40}px;height:72px;gap:22px"><span class="mono am" style="font-size:30px;font-weight:700">${H.esc(d.extra.text)}</span><span class="mono" style="font-size:26px;color:var(--pale)">${H.A(d.extra.note)}</span></div>
<div class="g lit r" data-i="${n + 3}" style="left:120px;top:${ey + 140}px;width:${W}px;height:86px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:32px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
