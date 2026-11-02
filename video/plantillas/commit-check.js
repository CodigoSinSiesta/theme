/* commit-check · un mensaje de commit pasando por el validador. Pasos: 1 comando, 2…n+1 una comprobación, n+2 el resultado.
   Datos: kicker, title, command, checks[] = { ok: bool, text } (1–4), result = { title, text, ok? (por defecto true) }. */
TPL['commit-check'] = {
  def: {
    kicker: 'Commit', title: 'El validador [[no negocia]]',
    command: 'omp commit  →  «añadir cupones»',
    checks: [
      { ok: false, text: 'Idioma: tiene que ser inglés' },
      { ok: false, text: 'Verbo en pasado («added»)' },
      { ok: true, text: 'Menos de 72 caracteres' },
    ],
    result: { title: 'mensaje aceptado', text: 'added coupon codes', ok: true },
  },
  html(d, H) {
    const checks = d.checks.map((c, i) => `<div class="g r flex" data-i="${i + 2}" style="left:120px;top:${480 + i * 130}px;width:820px;height:100px;padding:0 36px;gap:24px"><span class="${c.ok ? 'ok' : 'bad'} t">${c.ok ? '✓' : '✗'}</span><span class="s">${H.esc(c.text)}</span></div>`).join('');
    const r = d.result || {}, rc = r.ok === false ? 'bad' : 'ok';
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:340px;width:1680px;height:110px;padding:0 40px;display:flex;align-items:center"><span class="mono" style="font-size:36px"><span class="cy">$</span> ${H.esc(d.command)}</span></div>${checks}
<div class="g lit r" data-i="${d.checks.length + 2}" style="left:1000px;top:480px;width:800px;height:360px"><div class="k ${rc}">${H.esc(r.title)}</div><div class="mono" style="font-size:40px;margin-top:40px;line-height:1.6"><span class="${rc}">${rc === 'ok' ? '✓' : '✗'}</span> ${H.esc(r.text)}</div></div>`;
  },
};
