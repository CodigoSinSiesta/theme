/* id-pairing · vídeo 10 · órdenes RPC que salen con su id y respuestas que vuelven en otro orden: emparejar por
   posición falla, por identificador acierta. Datos: kicker, title, sent = { label, items[] = { id, type } } (2–4),
   back = { label, order[] (ids en orden de llegada), command }, note. Pasos: 1 órdenes, 2 respuestas, 3 por orden (✕), 4 por id y nota. */
TPL['id-pairing'] = {
  def: {
    kicker: 'La clave del protocolo', title: 'Empareja por [[identificador]]',
    sent: { label: '→ stdin · órdenes, en orden de envío', items: [{ id: '1', type: 'get_state' }, { id: '2', type: 'prompt' }, { id: '3', type: 'set_model' }] },
    back: { label: '← stdout · respuestas, en orden de llegada', order: ['2', '3', '1'] },
    note: 'Las órdenes se atienden de forma asíncrona: [[no te fíes del orden de llegada]].',
  },
  html(d, H) {
    const S = d.sent.items, n = S.length, pitch = n > 3 ? 104 : 130, y = k => 400 + k * pitch, hh = pitch - 30;
    const type = id => (S.find(o => o.id === id) || {}).type || '';
    const box = (x, k, inner, i) => `<div class="g r flex" data-i="${i}" style="left:${x}px;top:${y(k)}px;width:700px;height:${hh}px;padding:0 26px"><span class="mono" style="font-size:26px;white-space:nowrap">${inner}</span></div>`;
    const idt = id => `<span class="cy" style="font-weight:700">"id":"${H.esc(id)}"</span>`;
    const left = S.map((o, k) => box(120, k, `{${idt(o.id)},"type":"${H.esc(o.type)}"}`, 1)).join('');
    const right = d.back.order.map((id, k) => box(1100, k, `{${idt(id)},"command":"${H.esc(type(id))}",…}`, 2)).join('');
    const mid = k => y(k) + hh / 2;
    const wrong = S.map((o, k) => `<line x1="820" y1="${mid(k)}" x2="1100" y2="${mid(k)}" stroke="#f87171" stroke-dasharray="10 8"/>`).join('');
    const xs = S.map((o, k) => o.id === d.back.order[k] ? '' : `<div class="abs t bad r" data-i="3" data-off="4" style="left:942px;top:${mid(k) - 34}px;font-size:44px;line-height:60px">✕</div>`).join('');
    const right2 = S.map((o, k) => { const j = d.back.order.indexOf(o.id); return j < 0 ? '' : `<path class="draw" data-i="4" d="M820 ${mid(k)} C960 ${mid(k)} 960 ${mid(j)} 1100 ${mid(j)}"/>`; }).join('');
    return `${H.HEAD(d)}
<div class="abs k r" data-i="1" style="left:120px;top:340px">${H.A(d.sent.label)}</div>
<div class="abs k r" data-i="2" style="left:1100px;top:340px">${H.A(d.back.label)}</div>
${left}${right}
<svg class="abs r" data-i="3" data-off="4" style="left:0;top:0" width="1920" height="1080" fill="none" stroke-width="3">${wrong}</svg>${xs}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4">${right2}</svg>
<div class="g lit r" data-i="4" style="left:120px;top:${y(n) + 10}px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
