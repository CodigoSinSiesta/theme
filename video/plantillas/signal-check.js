/* signal-check · vídeo 10 · una ejecución que «ha ido bien» para el agente y dos vigilantes: el que solo mira si
   terminó y el script que lee los eventos. Datos: kicker, title, run = { name, ok, signal }, events = { file, rows[] (1–2 = { tool, why, tag }),
   mix }, naive = { label, ok, miss }, script = { name, text, warn }, note. Pasos: 1 ejecución, 2 señal, 3 eventos, 4 mezcla, 5 vigilante ingenuo, 6 script, 7 nota. */
TPL['signal-check'] = {
  def: {
    kicker: 'La lección', title: 'Mira los eventos, [[no solo si ha terminado]]',
    run: { name: 'pi --mode json', ok: 'Para Pi, todo bien', signal: 'stopReason: stop' },
    events: { file: 'errores.jsonl', rows: [
      { tool: 'bash', why: 'Sin interfaz para aprobar la acción', tag: 'bloqueada' },
      { tool: 'bash', why: 'Sin interfaz para aprobar la acción', tag: 'bloqueada' }],
      mix: 'Mezcla bloqueadas y fallidas: [[filtra por el motivo]]' },
    naive: { label: 'Solo mira si terminó', ok: '✓ todo bien', miss: 'No se habría enterado' },
    script: { name: 'revisar.sh', text: 'Lee los eventos', warn: 'Aviso: herramientas con error o bloqueadas' },
    note: 'Decide de antemano qué señales miras, y [[no te fíes de una sola]].',
  },
  html(d, H) {
    const rows = d.events.rows.map((r, k) => `<div class="flex" style="margin-top:${k ? 12 : 18}px;height:72px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:0 22px;gap:22px">
<span class="mono cy" style="font-size:26px;font-weight:700;width:80px">${H.esc(r.tool)}</span><span class="s" style="font-size:24px;flex:1">${H.A(r.why)}</span><span class="bdg chg">${H.esc(r.tag)}</span></div>`).join('');
    const eh = 96 + d.events.rows.length * 84;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:880px;height:170px;padding:26px 34px">
<div class="flex" style="gap:16px">${H.GLYPH('command-line', 40)}<span class="k">${H.esc(d.run.name)}</span></div>
<div class="flex" style="margin-top:22px;justify-content:space-between"><span class="t ok" style="font-size:40px">${H.A(d.run.ok)}</span><span class="pill r" data-i="2" style="color:var(--ok);border-color:var(--ok)">${H.esc(d.run.signal)}</span></div></div>
<div class="g r" data-i="3" style="left:120px;top:530px;width:880px;height:${eh}px;padding:24px 34px"><span class="k">${H.esc(d.events.file)}</span>${rows}</div>
<div class="abs s r" data-i="4" style="left:150px;top:${530 + eh + 14}px;width:840px;font-size:26px">${H.A(d.events.mix)}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="5" d="M1000 405 H1130"/><path class="draw" data-i="6" d="M1000 ${530 + eh / 2} H1130"/></svg>
<div class="g r" data-i="5" style="left:1140px;top:320px;width:660px;height:170px;padding:26px 34px"><div class="k">${H.A(d.naive.label)}</div>
<div class="flex" style="margin-top:22px;gap:28px"><span class="t ok" style="font-size:36px">${H.A(d.naive.ok)}</span><span class="s bad" style="font-size:26px">${H.A(d.naive.miss)}</span></div></div>
<div class="g lit r" data-i="6" style="left:1140px;top:530px;width:660px;height:${eh}px;padding:26px 34px">
<div class="flex" style="gap:16px">${H.GLYPH('document-text', 40)}<span class="mono cy" style="font-size:30px;font-weight:700">${H.esc(d.script.name)}</span></div>
<div class="s" style="font-size:28px;margin-top:16px">${H.A(d.script.text)}</div>
<div class="flex" style="margin-top:12px;gap:12px">${H.GLYPH('exclamation-triangle', 32, 'am')}<span class="s am" style="font-size:26px">${H.A(d.script.warn)}</span></div></div>
<div class="g lit r" data-i="7" style="left:120px;top:880px;width:1680px;height:96px;padding:0 34px;display:flex;align-items:center"><span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.note)}</span></div>`;
  },
};
