/* loop-trap · vídeo 26 · una función pequeña en el centro: quién la usa, cómo se propaga un error y la trampa de
   restar en cada línea frente a una sola vez. Datos: kicker, title, fn = { file, name, note }, callers[3] = { t, sub }, spread,
   trap = { k, note }, each = { k, lines[2], cut, total }, once = { k, base, cut, total }. Pasos: 1 función, 2 quién la usa,
   3 el error se propaga, 4 las líneas, una a una, 5 restar en cada línea (✗) frente a una sola vez (✓). */
TPL['loop-trap'] = {
  def: {
    kicker: 'Por qué esta funcionalidad', title: 'Pequeña, en el centro [[y con trampa]]',
    fn: { file: 'src/carrito.js', name: 'totalConCupon()', note: 'una función y sus pruebas' },
    callers: [{ t: 'el envío', sub: '' }, { t: 'el desglose', sub: 'vídeo 25' }, { t: 'el ticket', sub: 'vídeo 24' }],
    spread: 'Un error se propaga por toda la tienda.',
    trap: { k: 'la trampa natural', note: 'Recorre las líneas una a una.' },
    each: { k: 'en cada línea', lines: ['mochila', '3 libretas'], cut: '−5 €', total: '32 €' },
    once: { k: 'una sola vez', base: 'subtotal · 42 €', cut: '−5 €', total: '37 €' },
  },
  html(d, H) {
    const cx = [235, 500, 765];
    const callers = d.callers.slice(0, 3).map((c, k) => `<div class="g r flex" data-i="2" style="left:${cx[k] - 115}px;top:650px;width:230px;height:130px;padding:0 20px;flex-direction:column;justify-content:center;gap:6px"><span class="t" style="font-size:32px">${H.A(c.t)}</span>${c.sub ? `<span class="k">${H.esc(c.sub)}</span>` : ''}</div>`).join('');
    const redRing = cx.map(x => `<div class="abs r" data-i="3" style="left:${x - 115}px;top:650px;width:230px;height:130px;border-radius:22px;border:3px solid var(--red);box-shadow:0 0 30px rgba(248,113,113,.35)"></div>`).join('');
    const up = cx.map(x => `<line class="draw" data-i="2" x1="${x}" y1="646" x2="${x}" y2="514"/><path class="draw" data-i="2" d="M${x - 12} 528 L${x} 514 L${x + 12} 528"/>`).join('');
    const down = cx.map(x => `<line class="draw" data-i="3" x1="${x + 18}" y1="514" x2="${x + 18}" y2="646" stroke="#f87171"/><path class="draw" data-i="3" d="M${x + 6} 632 L${x + 18} 646 L${x + 30} 632" stroke="#f87171"/>`).join('');
    const line = (t, cut, y) => `<div class="abs flex" style="left:1010px;top:${y}px;width:500px;height:72px;padding:0 24px;justify-content:space-between;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line)"><span class="mono" style="font-size:26px">${H.esc(t)}</span><span class="mono bad r" data-i="5" style="font-size:26px">${H.esc(cut)}</span></div>`;
    const total = (y, h, txt, ok) => `<div class="abs r flex" data-i="5" style="left:1540px;top:${y}px;width:230px;height:${h}px;justify-content:center;gap:14px">${H.GLYPH(ok ? 'check-circle' : 'x-circle', 44, ok ? 'ok' : 'bad')}<span class="t ${ok ? 'ok' : 'bad'}" style="font-size:52px">${H.esc(txt)}</span></div>`;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${up}${down}</svg>
<div class="g lit r" data-i="1" style="left:120px;top:330px;width:760px;height:180px"><div class="k">${H.esc(d.fn.file)}</div><div class="mono" style="font-size:38px;margin-top:12px;color:var(--ink)">${H.esc(d.fn.name)}</div><div class="s" style="font-size:24px;margin-top:4px">${H.A(d.fn.note)}</div></div>
${callers}${redRing}
<div class="abs s bad r" data-i="3" style="left:120px;top:810px;width:760px;font-size:28px">${H.A(d.spread)}</div>
<div class="g r" data-i="4" style="left:980px;top:330px;width:820px;height:590px"><div class="k am">${H.esc(d.trap.k)}</div><div class="s" style="font-size:26px;margin-top:6px">${H.A(d.trap.note)}</div></div>
<div class="abs r" data-i="4" style="left:996px;top:440px;width:788px;height:240px;border-radius:16px;border:1.5px solid var(--line);background:rgba(15,23,42,.35)"></div>
<div class="abs k bad r" data-i="4" style="left:1020px;top:458px">${H.esc(d.each.k)}</div>
<div class="r" data-i="4">${d.each.lines.slice(0, 2).map((t, k) => line(t, d.each.cut, 496 + k * 82)).join('')}</div>
${total(496, 150, d.each.total, false)}
<div class="abs r" data-i="4" style="left:996px;top:700px;width:788px;height:190px;border-radius:16px;border:1.5px solid var(--line);background:rgba(15,23,42,.35)"></div>
<div class="abs k ok r" data-i="4" style="left:1020px;top:718px">${H.esc(d.once.k)}</div>
<div class="r" data-i="4">${line(d.once.base, d.once.cut, 770)}</div>
${total(731, 150, d.once.total, true)}`;
  },
};
