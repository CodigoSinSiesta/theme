/* hidden-retries · vídeo 03 · el proveedor falla, Pi espera y reintenta, el pie lo cuenta, y los intentos fallidos se
   quedan en el fichero de sesión marcados para que no viajen al modelo. Datos: kicker, title, tries[] = { label, code?, run? } (2–3;
   el último va en curso), wait, status, file = { label, rows[] = { t, fail? } }, model = { label, hidden }. Pasos: 1 primer fallo,
   2 espera y reintentos, 3 pie, 4 fichero de sesión, 5 marcados y lo que ve el modelo. */
TPL['hidden-retries'] = {
  def: {
    kicker: 'Errores del proveedor', title: 'Reintenta, y [[el modelo no ve los fallos]]',
    tries: [{ label: 'petición', code: '429' }, { label: 'reintento 1', code: '429' }, { label: 'reintento 2', run: 'en curso' }],
    wait: 'espera', status: 'retrying 2/3',
    file: { label: 'fichero de sesión', rows: [{ t: 'historia anterior' }, { t: 'tu mensaje' }, { t: 'error 429', fail: 1 }, { t: 'error 429', fail: 1 }] },
    model: { label: 'lo que ve el modelo', hidden: 'marcado: no viaja' },
  },
  html(d, H) {
    const n = d.tries.length, W = 400, gapW = (1680 - n * W) / (n - 1), xT = i => 120 + i * (W + gapW);
    const tries = d.tries.map((t, i) => {
      const last = i === n - 1, step = i === 0 ? 1 : 2;
      return `<div class="g${last ? ' lit' : ''} r" data-i="${step}" style="left:${xT(i)}px;top:310px;width:${W}px;height:150px"><div class="k">${H.esc(t.label)}</div>
<div class="flex" style="margin-top:16px;gap:16px">${t.code ? `<span class="mono bad" style="font-size:44px;font-weight:700">✕ ${H.esc(t.code)}</span>` : `<span class="mono cy" style="font-size:36px;line-height:52px">${H.esc(t.run || '…')}</span>`}</div></div>`;
    }).join('');
    const waits = d.tries.slice(1).map((_, i) => { const x = xT(i) + W, cx = x + gapW / 2;
      return `<div class="abs r" data-i="2" style="left:${cx - 80}px;top:330px;width:160px;text-align:center">${H.GLYPH('clock', 44)}<div class="k" style="margin-top:6px">${H.esc(d.wait)}</div></div>`; }).join('');
    const arrows = d.tries.slice(1).map((_, i) => { const x1 = xT(i) + W + 10, x2 = xT(i + 1) - 10;
      return `<path class="draw" data-i="2" d="M${x1} 430 H${x2}"/><path class="draw" data-i="2" d="M${x2 - 12} 419 L${x2} 430 L${x2 - 12} 441"/>`; }).join('');
    const rows = d.file.rows, y = j => 652 + j * 80;
    const left = rows.map((r, j) => `<div class="abs flex" style="left:150px;top:${y(j)}px;width:760px;height:72px;padding:0 24px;gap:16px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid ${r.fail ? 'var(--red)' : 'var(--line)'}"><span class="s${r.fail ? ' bad' : ''}" style="font-size:26px">${H.esc(r.t)}</span></div>`
      + (r.fail ? `<div class="abs r flex" data-i="5" style="left:600px;top:${y(j) + 14}px;width:290px;height:44px;justify-content:flex-end;gap:10px">${H.GLYPH('eye-slash', 30, 'am')}<span class="k am">marcado</span></div>` : '')).join('');
    const right = rows.map((r, j) => r.fail
      ? `<div class="abs flex" style="left:1010px;top:${y(j)}px;width:760px;height:72px;padding:0 24px;gap:16px;border-radius:12px;border:2px dashed var(--line)">${H.GLYPH('eye-slash', 30, 'am')}<span class="k">${H.esc(d.model.hidden)}</span></div>`
      : `<div class="abs flex" style="left:1010px;top:${y(j)}px;width:760px;height:72px;padding:0 24px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line)"><span class="s" style="font-size:26px">${H.esc(r.t)}</span></div>`).join('');
    const hpan = 76 + rows.length * 80 + 14;
    return `${H.HEAD(d)}
${tries}${waits}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${arrows}</svg>
<div class="g r flex" data-i="3" style="left:120px;top:480px;width:1680px;height:72px;padding:0 30px;gap:20px;background:rgba(11,17,32,.9)"><span class="k">pie</span><span class="mono am" style="font-size:28px">${H.esc(d.status)}</span></div>
<div class="g r" data-i="4" style="left:120px;top:576px;width:820px;height:${hpan}px"><div class="k">${H.esc(d.file.label)}</div></div>
<div class="r" data-i="4">${left}</div>
<div class="g r" data-i="5" style="left:980px;top:576px;width:820px;height:${hpan}px"><div class="k cy">${H.esc(d.model.label)}</div></div>
<div class="r" data-i="5">${right}</div>`;
  },
};
