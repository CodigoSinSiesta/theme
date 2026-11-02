/* model-switch · comando, fila de proveedores (uno por paso, uno iluminado) y lema final.
   Datos: command, providers[] (2–6) = { logo, name, lit? }, tagline = { lead, rest }. */
TPL['model-switch'] = {
  def: {
    kicker: 'Modelos', title: 'Cambias de modelo, [[no de agente]]',
    command: '$ hermes model',
    providers: [{ logo: 'anthropic', name: 'Anthropic', lit: true }, { logo: 'openai', name: 'OpenAI' }, { logo: 'google', name: 'Google' }, { logo: 'openrouter', name: 'OpenRouter' }, { logo: 'ollama', name: 'Ollama' }],
    tagline: { lead: 'Sin lock-in:', rest: ' el mismo agente, el proveedor que elijas.' },
  },
  html(d, H) {
    const n = d.providers.length, gap = 45, w = Math.min(300, Math.floor((1680 - (n - 1) * gap) / n)), x0 = 120 + (1680 - (n * w + (n - 1) * gap)) / 2;
    const cards = d.providers.map((p, i) => `<div class="g${p.lit ? ' lit' : ''} r" data-i="${i + 2}" style="left:${x0 + i * (w + gap)}px;top:470px;width:${w}px;height:300px;display:grid;place-items:center;text-align:center">${H.ICO(p.logo, 100)}<div class="t" style="font-size:${w < 250 ? 28 : 34}px">${H.A(p.name)}</div></div>`).join('');
    return `${H.HEAD(d)}
<div class="abs r" data-i="1" style="left:120px;top:330px;width:1680px;text-align:center"><span class="chip" style="font-size:38px;padding:14px 36px">${H.esc(d.command)}</span></div>
${cards}
<div class="abs r" data-i="${n + 2}" style="left:120px;top:830px;width:1680px;text-align:center;font:700 44px var(--disp)"><span class="cy">${H.A(d.tagline.lead)}</span>${H.A(d.tagline.rest)}</div>`;
  },
};
