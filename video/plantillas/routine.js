/* routine · reloj → agente → informe → canal de entrega (4 nodos fijos en fila) + nota final (paso 5).
   Datos: time, worker = { logo, name }, report = { label, lines[] (2–4) }, channel = { logo, name }, note. */
TPL.routine = {
  def: {
    kicker: 'Rutina', title: 'Se despierta, trabaja [[y te avisa]]',
    time: '08:00',
    worker: { logo: 'hermes', name: 'Trabaja' },
    report: { label: 'informe diario', lines: ['3 PRs abiertos', '2 tests fallan', '1 deploy listo'] },
    channel: { logo: 'telegram', name: 'Telegram' },
    note: 'sin que estés delante',
  },
  html(d, H) {
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<line class="draw" data-i="2" x1="400" y1="640" x2="520" y2="640"/><line class="draw" data-i="3" x1="860" y1="640" x2="980" y2="640"/><line class="draw" data-i="4" x1="1380" y1="640" x2="1500" y2="640"/></svg>
<div class="g r" data-i="1" style="left:120px;top:520px;width:280px;height:240px;text-align:center"><svg width="90" height="90" viewBox="0 0 48 48" class="cy" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="24" cy="24" r="18"/><path d="M24 12 V24 L32 29"/></svg><div class="t mono" style="margin-top:12px;font-size:38px">${H.esc(d.time)}</div></div>
<div class="g lit r flex" data-i="2" style="left:520px;top:520px;width:340px;height:240px;flex-direction:column;justify-content:center;gap:12px">${H.ICO(d.worker.logo, 100)}<span class="t" style="font-size:34px">${H.A(d.worker.name)}</span></div>
<div class="g r" data-i="3" style="left:980px;top:520px;width:400px;height:240px"><div class="k">${H.A(d.report.label)}</div><div class="mono" style="font-size:26px;line-height:1.8;margin-top:12px;color:var(--pale)">${d.report.lines.map(H.esc).join('<br>')}</div></div>
<div class="g r flex" data-i="4" style="left:1500px;top:520px;width:300px;height:240px;flex-direction:column;justify-content:center;gap:12px">${H.ICO(d.channel.logo, 100)}<span class="t" style="font-size:34px">${H.A(d.channel.name)}</span></div>
<div class="abs k r" data-i="5" style="left:520px;top:800px">${H.A(d.note)}</div>`;
  },
};
