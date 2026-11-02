/* balancing-plug · vídeo 25 · una cifra de cuadre: dos desgloses del mismo pedido con el mismo total, uno correcto y
   otro con una partida calculada «por diferencia»; una comprobación que solo mira el total y la suma da por buenos los dos.
   Datos: kicker, title, total = { v, t }, rows[2] = { name, base, iva, envio } (importes en número y en texto «37,80»),
   labels = { base, iva, envio }, plug, check = { k, ok[2], no }. Las barras se escalan al total. Pasos: 1 filas, 2 base,
   3 envío de la fila 1, 4 envío de la fila 2, 5 IVA de la fila 1, 6 IVA de la fila 2, 7 total, 8 cifra de cuadre, 9 qué comprobaba. */
TPL['balancing-plug'] = {
  def: {
    kicker: 'Pedido de la frontera · rama cuadre', title: 'Cuadra, [[pero no es correcto]]',
    total: { v: 50.69, t: '50,69 €' },
    rows: [
      { name: 'cuadre', base: [37.80, '37,80'], iva: [12.89, '12,89'], envio: [0, '0,00'] },
      { name: 'la tienda', base: [37.80, '37,80'], iva: [7.94, '7,94'], envio: [4.95, '4,95'] },
    ],
    labels: { base: 'base', iva: 'IVA', envio: 'envío' },
    plug: 'cifra de cuadre',
    check: { k: 'Aceptación v1 · lo que comprobaba', ok: ['total = el de la tienda', 'base + IVA + envío = total'], no: 'cada importe: no' },
  },
  html(d, H) {
    const X0 = 440, W = 1200, px = v => Math.round(W * v / d.total.v), Y = [380, 560], BH = 70;
    const seg = (x, w, y, i, col) => w > 0 ? `<i class="bx" data-i="${i}" style="position:absolute;left:${x}px;top:${y}px;width:${w - 3}px;height:${BH}px;border-radius:10px;background:${col}"></i>` : '';
    const lab = (x, y, i, t) => `<div class="abs mono r" data-i="${i}" style="left:${x + 24}px;top:${y + 17}px;font-size:28px;color:var(--ink)">${H.A(t)}</div>`;
    const C = { base: 'rgba(96,165,250,.55)', iva: 'rgba(251,191,36,.55)', envio: 'rgba(52,211,153,.6)' };
    const rows = d.rows.map((r, k) => {
      const y = Y[k], b = px(r.base[0]), iv = px(r.iva[0]), en = px(r.envio[0]), xi = X0 + b, xe = xi + iv;
      const ivI = k ? 6 : 5, enI = k ? 4 : 3;
      return `<div class="abs t r" data-i="1" style="left:120px;top:${y + 8}px;font-size:40px">${H.A(r.name)}</div>
<div class="abs r" data-i="1" style="left:${X0}px;top:${y}px;width:${W}px;height:${BH}px;border-radius:10px;border:1.5px dashed var(--line)"></div>
${seg(X0, b, y, 2, C.base)}${seg(xi, iv, y, ivI, C.iva)}${seg(xe, en, y, enI, C.envio)}
${lab(X0, y, 2, `${d.labels.base} ${r.base[1]}`)}${lab(xi, y, ivI, `${d.labels.iva} ${r.iva[1]}`)}
<div class="abs r" data-i="${enI}" style="right:300px;top:${y + BH + 14}px"><span class="chip" style="${r.envio[0] ? "color:var(--ok)" : "color:var(--red);border-color:var(--red)"}">${H.esc(d.labels.envio)} ${H.esc(r.envio[1])} €</span></div>
<div class="abs mono r" data-i="7" style="left:${X0 + W + 22}px;top:${y + 16}px;font-size:30px;font-weight:700">${H.esc(d.total.t)}</div>`;
    }).join('');
    const p = d.rows[0], pxI = X0 + px(p.base[0]), pw = px(p.iva[0]);
    return `${H.HEAD(d)}
${rows}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none"><path class="draw" data-i="7" d="M${X0 + W} 360 V${Y[1] + BH + 2}" stroke="#e2e8f0" stroke-width="3" stroke-dasharray="8 8"/></svg>
<div class="abs r" data-i="8" style="left:${pxI - 4}px;top:${Y[0] - 4}px;width:${pw + 4}px;height:${BH + 8}px;border-radius:12px;border:3px solid var(--red);box-shadow:0 0 28px rgba(248,113,113,.45)"></div>
<div class="abs r" data-i="8" style="left:${pxI - 4}px;top:312px"><span class="chip" style="color:var(--red);border-color:var(--red)">${H.esc(d.plug)}</span></div>
<div class="g r" data-i="9" style="left:120px;top:770px;width:1680px;height:180px"><div class="k">${H.A(d.check.k)}</div>
<div class="flex" style="gap:64px;margin-top:22px">${d.check.ok.map(t => `<div class="flex" style="gap:14px">${H.GLYPH('check-circle', 40, 'ok')}<span class="s" style="font-size:30px;color:var(--ink)">${H.A(t)}</span></div>`).join('')}
<div class="flex" style="gap:14px">${H.GLYPH('x-circle', 40, 'bad')}<span class="s bad" style="font-size:30px">${H.A(d.check.no)}</span></div></div></div>`;
  },
};
