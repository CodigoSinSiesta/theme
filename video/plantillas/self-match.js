/* self-match · vídeo 17 · por qué importa el orden: sustituir y después crear deja intacto el cuerpo de la función;
   si la función ya existiera, el patrón también encajaría en su cuerpo y la reescribiría como una llamada a sí misma.
   Datos: kicker, title, pattern, good/bad = { label }, sites[] = { n, before, after } (2–3), fn = { head, body, call }, hit,
   intact, loop. Pasos: 1 líneas, 2 patrón, 3 sustitución, 4 función nueva, 5 al revés, 6 función previa, 7 cuerpo encaja, 8 bucle. */
TPL['self-match'] = {
  def: {
    kicker: 'ast_grep + ast_edit', title: 'Primero sustituir: [[el orden importa]]',
    pattern: 'Math.round($X * 100) / 100',
    good: { label: 'Lo pedido · sustituir y, después, crear' }, bad: { label: 'Al revés · si redondear ya existiera' },
    sites: [{ n: '9', before: 'Math.round(… * 100) / 100', after: 'redondear(…)' },
      { n: '32', before: 'Math.round(total * 100) / 100', after: 'redondear(total)' },
      { n: '43', before: 'Math.round(… * 100) / 100', after: 'redondear(…)' }],
    fn: { head: 'export function redondear(importe) {', body: 'Math.round(importe * 100) / 100', call: 'redondear(importe)' },
    hit: 'también encaja', intact: 'Su cuerpo ya no pasa por el patrón', loop: 'Se llamaría a sí misma',
  },
  html(d, H) {
    const box = (x, y, w, h, extra = '') => `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:14px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:24px 26px;${extra}`;
    const ring = (txt, i, off, col) => `<span style="position:relative">${H.esc(txt)}<i class="r" data-i="${i}"${off ? ` data-off="${off}"` : ''} style="position:absolute;left:-4px;right:-4px;top:-2px;bottom:-2px;border-radius:6px;background:${col === 'red' ? 'rgba(248,113,113,.18)' : 'rgba(96,165,250,.18)'};box-shadow:0 0 0 2px var(--${col})"></i></span>`;
    const code = 'font-family:var(--mono);font-size:22px;line-height:31px;white-space:pre;color:var(--pale)';
    const sites = d.sites.map(s => `<div style="position:relative;height:36px;${code};line-height:36px"><span class="k" style="display:inline-block;width:62px">${H.esc(s.n)}</span><span class="r" data-off="3">${ring(s.before, 2, 3, 'cyan')}</span><span class="abs ok r" data-i="3" style="left:62px;top:0">${H.esc(s.after)}</span></div>`).join('');
    const fnBox = (x, y, w, i, label, body, extra = '') => `<div class="abs r" data-i="${i}" style="${box(x, y, w, 184, extra)}"><div class="k">${label}</div>
<div style="${code};margin-top:10px">${body}</div></div>`;
    const head = d.fn.head, k = head.indexOf(d.fn.call.split('(')[0]);
    const headLoop = k < 0 ? H.esc(head) : `${H.esc(head.slice(0, k))}${ring(d.fn.call.split('(')[0], 8, 0, 'red')}${H.esc(head.slice(k + d.fn.call.split('(')[0].length))}`;
    const arrow = (x1, x2, y, i) => `<path class="draw" data-i="${i}" d="M${x1} ${y} H${x2}"/><path class="draw" data-i="${i}" d="M${x2 - 12} ${y - 11} L${x2} ${y} L${x2 - 12} ${y + 11}"/>`;
    return `${H.HEAD(d)}
<div class="g r flex" data-i="2" style="left:120px;top:296px;width:1680px;height:76px;padding:0 30px;gap:26px"><span class="k">patrón</span><span class="mono cy" style="font-size:30px">${H.esc(d.pattern)}</span></div>
<div class="g r" data-i="1" style="left:120px;top:392px;width:1680px;height:282px;border-top:6px solid var(--ok)"><div class="k ok">${H.A(d.good.label)}</div></div>
<div class="abs r" data-i="1" style="${box(150, 466, 620, 184)}"><div class="k">src/carrito.js</div><div style="margin-top:6px">${sites}</div></div>
${fnBox(850, 466, 660, 4, 'después · función nueva', `${H.esc(head)}\n  return ${H.esc(d.fn.body)};\n}`)}
<div class="abs r" data-i="4" style="left:1540px;top:488px;width:240px;text-align:center">${H.GLYPH('check-circle', 48, 'ok')}<div class="s ok" style="font-size:24px;line-height:1.3;margin-top:8px">${H.A(d.intact)}</div></div>
<div class="g r" data-i="5" style="left:120px;top:692px;width:1680px;height:300px;border-top:6px solid var(--red)"><div class="k bad">${H.A(d.bad.label)}</div></div>
${fnBox(150, 766, 660, 6, `antes · ya existe<span class="r bad" data-i="7"> · ${H.esc(d.hit)}</span>`, `${H.esc(head)}\n  return ${ring(d.fn.body, 7, 0, 'red')};\n}`)}
${fnBox(890, 766, 640, 8, 'después de ast_edit', `${headLoop}\n  return <span class="bad">${ring(d.fn.call, 8, 0, 'red')}</span>;\n}`, 'border-color:var(--red)')}
<div class="abs r" data-i="8" style="left:1556px;top:788px;width:226px;text-align:center">${H.GLYPH('x-circle', 48, 'bad')}<div class="s bad" style="font-size:24px;line-height:1.3;margin-top:8px">${H.A(d.loop)}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${arrow(782, 838, 558, 4)}${arrow(822, 878, 858, 8)}</svg>`;
  },
};
