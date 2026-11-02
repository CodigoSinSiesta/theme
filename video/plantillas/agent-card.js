/* agent-card · tarjetas de agente (glifo, rol, herramientas y modelo) repartidas en el ancho.
   Datos: kicker, title, cards[] = { glyph, name, role, tools[], model, lit? } (2–4 tarjetas; glyph: director sub tool user model file vps). */
TPL['agent-card'] = {
  def: {
    kicker: 'Reparto', title: 'Tres agentes, [[tres roles]]',
    cards: [
      { glyph: 'director', name: 'Director', role: 'reparte el trabajo', tools: ['delegar', 'leer_plan', 'revisar'], model: 'modelo grande' },
      { glyph: 'sub', name: 'Investigador', role: 'busca y resume', tools: ['buscar_web', 'leer_fichero', 'resumir'], model: 'modelo rápido', lit: true },
      { glyph: 'tool', name: 'Ejecutor', role: 'toca el código', tools: ['editar', 'bash', 'test'], model: 'modelo medio' },
    ],
  },
  html(d, H) {
    const n = d.cards.length, gap = 45, w = Math.round((1680 - gap * (n - 1)) / n);
    const cards = d.cards.map((c, i) => `<div class="g${c.lit ? ' lit' : ''} r" data-i="${i + 1}" style="left:${120 + i * (w + gap)}px;top:340px;width:${w}px;height:600px">${H.GLYPH(c.glyph, 84)}<div class="t" style="margin-top:18px">${H.esc(c.name)}</div><div class="k" style="margin-top:8px">${H.esc(c.role)}</div>
<div class="mono" style="margin-top:30px;font-size:24px;color:var(--pale);line-height:1.9">${c.tools.map(t => '▸ ' + H.esc(t)).join('<br>')}</div><div class="mono cy" style="margin-top:26px;font-size:22px">◆ ${H.esc(c.model)}</div></div>`).join('');
    return `${H.HEAD(d)}\n${cards}`;
  },
};
