/* howto · pasos numerados, cada uno con su comando (chip). Un paso por fila.
   Datos: kicker, title, steps[] = { t, cmd?, lit?, done? } — sin `cmd` se muestra `done` (✓ verde). 2–6 filas. */
TPL.howto = {
  def: {
    kicker: 'Puesta en marcha', title: 'Cuatro pasos, [[cuatro minutos]]',
    steps: [
      { t: 'Instala el agente', cmd: 'curl -fsSL …/install.sh | bash' },
      { t: 'Elige un modelo', cmd: 'hermes model' },
      { t: 'Conecta un canal', cmd: 'hermes gateway setup' },
      { t: 'Escríbele', lit: true, done: '✓ listo' },
    ],
  },
  html(d, H) {
    const n = d.steps.length, pitch = n <= 4 ? 150 : Math.floor(600 / n), h = pitch - 20;
    const rows = d.steps.map((s, i) => `<div class="g${s.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:120px;top:${340 + i * pitch}px;width:1680px;height:${h}px;padding:0 36px;display:flex;align-items:center;gap:30px"><span class="t${s.lit ? '' : ' cy'} mono" style="width:70px">${i + 1}</span><span class="t" style="font-size:36px;width:560px">${H.esc(s.t)}</span>${s.cmd ? `<span class="chip" style="margin-left:auto">${H.esc(s.cmd)}</span>` : `<span class="ok t" style="margin-left:auto">${H.esc(s.done || '✓')}</span>`}</div>`).join('');
    return H.HEAD(d) + rows;
  },
};
