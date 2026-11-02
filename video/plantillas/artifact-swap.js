/* artifact-swap · vídeo 13 · /shake: la pantalla no cambia; en lo que recibe el modelo cada resultado de herramienta pasa a
   ser una referencia que apunta a una copia guardada junto a la sesión. Datos: kicker, title, cols = { screen, model, store },
   rows[] = { t, tool?, ref? } (3–5 filas con 2 resultados como mucho: con 3 la barra final baja de y=1000; tool = resultado que se quita; ref = nombre corto tras la referencia), ref, read, file. Pasos: 1 pantalla, 2 modelo, 3 referencias,
   4 copias, 5 «lo lee», 6 fichero de sesión. */
TPL['artifact-swap'] = {
  def: {
    kicker: 'Después de /shake', title: 'Adelgaza [[lo que ve el modelo]]',
    cols: { screen: 'en pantalla · no cambia', model: 'lo que recibe el modelo', store: 'junto a la sesión' },
    rows: [{ t: 'tu petición' }, { t: 'diff', tool: true, ref: 'diff' }, { t: 'respuesta' }, { t: 'salida de los tests', tool: true, ref: 'tests' }, { t: 'respuesta' }],
    ref: 'artifact://', read: 'si lo necesita, lo lee', file: 'El fichero de sesión [[sigue teniendo todo]].',
  },
  html(d, H) {
    const C = [120, 720, 1320], W = 480, top = 320, y0 = top + 70, hm = 72, ht = 110, gp = 8;
    let y = y0; const Y = d.rows.map(r => { const v = y; y += (r.tool ? ht : hm) + gp; return v; });
    const bottom = y - gp;
    const blk = (x, yy, h, t, tool, extra = '') => `<div class="abs" style="left:${x + 30}px;top:${yy}px;width:${W - 60}px;height:${h}px;border-radius:12px;background:${tool ? 'rgba(96,165,250,.22)' : 'rgba(15,23,42,.6)'};border:1.5px solid var(--line);padding:0 26px;display:flex;align-items:${tool ? 'flex-start;padding-top:18px' : 'center'};${extra}"><span class="${tool ? 'mono' : 's'}" style="font-size:24px;line-height:1.15;${tool ? 'color:var(--sky)' : 'color:var(--ink)'}">${H.A(t)}</span></div>`;
    const col = (i, step, label, lit) => `<div class="g${lit ? ' lit' : ''} r" data-i="${step}" style="left:${C[i]}px;top:${top}px;width:${W}px;height:${bottom - top + 30}px"><div class="k${lit ? ' cy' : ''}">${H.A(label)}</div></div>`;
    const screen = d.rows.map((r, k) => blk(C[0], Y[k], r.tool ? ht : hm, r.t, r.tool)).join('');
    const modelKeep = d.rows.map((r, k) => r.tool ? '' : blk(C[1], Y[k], hm, r.t)).join('');
    const modelFull = d.rows.map((r, k) => r.tool ? blk(C[1], Y[k], ht, r.t, true) : '').join('');
    const refs = d.rows.map((r, k) => r.tool ? blk(C[1], Y[k], hm, d.ref + (r.ref || r.t), false, 'border:2px dashed var(--cyan);font-family:var(--mono)') : '').join('');
    const copies = d.rows.map((r, k) => r.tool ? blk(C[2], Y[k], ht, r.t, true, 'border-color:var(--cyan)') : '').join('');
    const links = d.rows.map((r, k) => r.tool ? `<path class="draw" data-i="4" d="M${C[1] + W - 30} ${Y[k] + hm / 2} C${C[1] + W + 40} ${Y[k] + hm / 2} ${C[2] - 10} ${Y[k] + 40} ${C[2] + 30} ${Y[k] + 40}"/>` : '').join('');
    return `${H.HEAD(d)}
${col(0, 1, d.cols.screen)}${col(1, 2, d.cols.model, true)}${col(2, 4, d.cols.store)}
<div class="r" data-i="1">${screen}</div>
<div class="r" data-i="2">${modelKeep}</div><div class="r" data-i="2" data-off="3">${modelFull}</div>
<div class="r" data-i="3">${refs}</div>
<div class="r" data-i="4">${copies}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${links}</svg>
<div class="abs k ok r" data-i="5" style="left:${C[2] + 30}px;top:${bottom - 30}px;width:${W - 60}px;text-align:right">↩ ${H.A(d.read)}</div>
<div class="g r flex" data-i="6" style="left:120px;top:${bottom + 40}px;width:1680px;height:86px;padding:0 34px;gap:20px;border-color:var(--ok)">${H.GLYPH('document-text', 40, 'ok')}<span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.file)}</span></div>`;
  },
};
