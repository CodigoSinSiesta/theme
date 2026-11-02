/* package-identity · vídeo 09 · con qué clave identifica Pi cada paquete según su origen, y por qué dos declaraciones
   equivalentes acaban en una sola carga. Datos: kicker, title, rows[3] = { k, decl, key, why }, alt (segunda forma de la fila 3),
   once, note. Pasos: 1 npm, 2 git, 3 «sin la versión», 4 local, 5 la forma equivalente, 6 una sola carga, 7 módulos por separado. */
TPL['package-identity'] = {
  def: {
    kicker: 'Cómo identifica Pi un paquete', title: 'Dos formas, [[una sola carga]]',
    rows: [
      { k: 'npm', decl: 'npm:@ejemplo/pi-tools@1.0.0', key: '@ejemplo/pi-tools', why: 'por su nombre' },
      { k: 'git', decl: 'git:github.com/ejemplo/pi-tools@v1', key: 'github.com/ejemplo/pi-tools', why: 'sin la versión' },
      { k: 'local', decl: '~/csn/extensiones', key: '/Users/…/csn/extensiones', why: 'por la ruta absoluta' },
    ],
    alt: '../../../Users/…/csn/extensiones',
    once: 'se carga una vez',
    note: 'Cada paquete carga sus módulos por separado: [[no comparten dependencias]].',
  },
  html(d, H) {
    const KX = 1170, KW = 630;
    const box = [[330, 110], [470, 110], [610, 150]];
    const mid = i => box[i][0] + box[i][1] / 2;
    const chipY = [mid(0) - 26, mid(1) - 26, mid(2) - 60, mid(2) + 20];
    const chip = (y, t, i) => `<div class="abs r" data-i="${i}" style="left:280px;top:${y}px;width:560px"><span class="chip" style="font-size:24px">${H.esc(t)}</span></div>`;
    const lab = (i, t, st) => `<div class="abs k r" data-i="${st}" style="left:120px;top:${mid(i) - 14}px;width:140px">${H.A(t)}</div>`;
    const arrow = (y0, y1, st) => `<path class="draw" data-i="${st}" d="M860 ${y0} C1000 ${y0} 1020 ${y1} ${KX - 14} ${y1}"/><path class="draw" data-i="${st}" d="M${KX - 26} ${y1 - 10} L${KX - 12} ${y1} L${KX - 26} ${y1 + 10}"/>`;
    const step = [1, 2, 4];
    const keys = d.rows.map((r, i) => `<div class="g${i === 2 ? ' lit' : ''} r" data-i="${step[i]}" style="left:${KX}px;top:${box[i][0]}px;width:${KW}px;height:${box[i][1]}px;padding:0 34px;display:flex;flex-direction:column;justify-content:center;gap:8px">
  <div class="mono" style="font-size:26px">${H.esc(r.key)}</div>
  <div class="k${i === 1 ? ' am r' : ' cy'}"${i === 1 ? ' data-i="3"' : ''}>${H.A(r.why)}</div></div>`).join('');
    return `${H.HEAD(d)}
${d.rows.map((r, i) => lab(i, r.k, step[i])).join('')}
${chip(chipY[0], d.rows[0].decl, 1)}${chip(chipY[1], d.rows[1].decl, 2)}${chip(chipY[2], d.rows[2].decl, 4)}${chip(chipY[3], d.alt, 5)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
  ${arrow(mid(0), mid(0), 1)}${arrow(mid(1), mid(1), 2)}${arrow(chipY[2] + 26, mid(2) - 12, 4)}${arrow(chipY[3] + 26, mid(2) + 12, 5)}
</svg>
${keys}
<div class="abs r" data-i="6" style="left:${KX}px;top:${box[2][0] + box[2][1] + 18}px"><span class="pill flex" style="gap:10px;color:var(--ok);border-color:var(--ok)">${H.GLYPH('check-circle', 28, 'ok')}${H.A(d.once)}</span></div>
<div class="g r" data-i="7" style="left:120px;top:868px;width:1680px;height:104px;padding:0 34px;display:flex;align-items:center;gap:20px">${H.GLYPH('cube', 40)}<span class="s" style="color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
