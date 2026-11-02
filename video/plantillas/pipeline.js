/* pipeline · entrada → plan → etapas en paralelo → salida, unidas por trazos.
   Datos: kicker, title, input, plan, parallel[] (2–3), parallelLabel, output. Pasos: 1 entrada, 2 plan, 3 paralelo, 4 trazo final, 5 salida. */
TPL.pipeline = {
  def: {
    kicker: 'Flujo', title: 'De la idea a [[la entrega]]',
    input: 'Petición', plan: 'Plan', parallel: ['Código', 'Tests'], parallelLabel: 'en paralelo', output: 'Pull request',
  },
  html(d, H) {
    const n = d.parallel.length, sp = n > 2 ? 220 : 280, cy = j => 620 + Math.round((j - (n - 1) / 2) * sp);
    const box = 'padding:0;display:grid;place-items:center';
    const paths = d.parallel.map((p, j) => `<path class="draw" data-i="3" d="M800 620 C900 620 900 ${cy(j)} 1000 ${cy(j)}"/>`).join('')
      + d.parallel.map((p, j) => `<path class="draw" data-i="4" d="M1240 ${cy(j)} C1340 ${cy(j)} 1340 620 1440 620"/>`).join('');
    const par = d.parallel.map((p, j) => `<div class="g r" data-i="3" style="left:1000px;top:${cy(j) - 60}px;width:240px;height:120px;${box}"><span class="t" style="font-size:32px">${H.esc(p)}</span></div>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3"><path class="draw" data-i="2" d="M420 620 H560"/>${paths}</svg>
<div class="g r" data-i="1" style="left:120px;top:560px;width:300px;height:120px;${box}"><span class="t" style="font-size:34px">${H.esc(d.input)}</span></div>
<div class="g lit r" data-i="2" style="left:560px;top:540px;width:240px;height:160px;${box}"><span class="t" style="font-size:34px">${H.esc(d.plan)}</span></div>
${par}
<div class="g r" data-i="5" style="left:1440px;top:540px;width:360px;height:160px;${box};border-color:var(--ok)"><span class="t" style="font-size:34px">${H.esc(d.output)}</span></div>
${d.parallelLabel ? `<div class="abs k r" data-i="3" style="left:1000px;top:${cy(0) - 110}px">${H.esc(d.parallelLabel)}</div>` : ''}`;
  },
};
