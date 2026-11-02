/* gateway · canales de entrada (izquierda) → pasarela → un solo agente. Un paso por canal; el último pasa la pasarela y el agente.
   Datos: channels[] = { logo, name } (1–6, ideal 3–5), hub = { label, name }, agent = { logo, name }. */
TPL.gateway = {
  def: {
    kicker: 'Pasarela', title: 'Habla con él [[donde estés]]',
    channels: [{ logo: 'telegram', name: 'Telegram' }, { logo: 'discord', name: 'Discord' }, { logo: 'slack', name: 'Slack' }, { logo: 'whatsapp', name: 'WhatsApp' }, { logo: 'signal', name: 'Signal' }],
    hub: { label: 'pasarela', name: 'gateway' },
    agent: { logo: 'hermes', name: 'Un solo agente' },
  },
  html(d, H) {
    const n = d.channels.length, step = n > 1 ? Math.min(120, 580 / (n - 1)) : 120, t0 = Math.max(330, 620 - 50 - (n - 1) * step / 2);
    const cy = i => t0 + i * step + 50, last = n + 1;
    const paths = d.channels.map((c, i) => `<path class="draw" data-i="${i + 1}" d="M480 ${cy(i)} C620 ${cy(i)} 620 640 760 640"/>`).join('')
      + `<path class="draw" data-i="${last}" d="M1100 640 H1300"/>`;
    const nodes = d.channels.map((c, i) => `<div class="g r flex" data-i="${i + 1}" style="left:120px;top:${t0 + i * step}px;width:360px;height:100px;padding:0 24px;gap:20px">${H.ICO(c.logo, 60)}<span class="t" style="font-size:32px">${H.A(c.name)}</span></div>`).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${paths}</svg>
${nodes}
<div class="g r" data-i="${last}" style="left:760px;top:540px;width:340px;height:200px;text-align:center"><div class="k">${H.A(d.hub.label)}</div><div class="t" style="margin-top:14px;font-size:38px">${H.A(d.hub.name)}</div></div>
<div class="g lit r flex" data-i="${last}" style="left:1300px;top:540px;width:500px;height:200px;gap:26px">${H.ICO(d.agent.logo, 110)}<span class="t" style="font-size:40px;white-space:nowrap">${H.A(d.agent.name)}</span></div>`;
  },
};
