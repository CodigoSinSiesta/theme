/* chat · conversación: mensajes del usuario (derecha), del agente (izquierda, con su logo) y llamadas a herramienta.
   Datos: kicker, title, logo (del agente), messages[] = { who:'user'|'agent', text, cursor? } | { who:'tool', tool, cmd, result, lit? }. Hasta 5 mensajes. */
TPL.chat = {
  def: {
    kicker: 'Sesión', title: 'Así se ve [[una petición]]', logo: 'hermes',
    messages: [
      { who: 'user', text: 'Pasa los tests y abre una PR.' },
      { who: 'agent', text: 'Voy a lanzar la suite y mirar qué falla.' },
      { who: 'tool', tool: 'bash', cmd: '$ pytest -q  →  ', result: '2 fallan', lit: true },
      { who: 'agent', text: 'Corrijo los dos y vuelvo a probar', cursor: true },
    ],
  },
  html(d, H) {
    let top = 310, shown = false, out = '';
    d.messages.forEach((m, k) => {
      const i = k + 1;
      if (m.who === 'user') out += `<div class="g r" data-i="${i}" style="left:880px;top:${top}px;width:920px;padding:22px 30px;border-radius:26px 26px 6px 26px"><div class="s msg">${H.A(m.text)}</div></div>`;
      else if (m.who === 'tool') out += `<div class="g${m.lit ? ' lit' : ''} r" data-i="${i}" style="left:240px;top:${top}px;width:900px;padding:18px 30px;border-radius:14px"><div class="k" style="font-size:18px">▸ herramienta · ${H.esc(m.tool)}</div><div class="mono" style="font-size:28px;margin-top:6px">${H.esc(m.cmd)}${m.result ? `<span class="bad">${H.esc(m.result)}</span>` : ''}</div></div>`;
      else {
        if (!shown && d.logo) { out += `<div class="abs r cy" data-i="${i}" style="left:120px;top:${top}px">${H.ICO(d.logo, 76)}</div>`; shown = true; }
        out += `<div class="g r" data-i="${i}" style="left:240px;top:${top}px;width:900px;padding:22px 30px;border-radius:26px 26px 26px 6px"><div class="s msg">${H.A(m.text)}${m.cursor ? '<span class="cy mono"> ▍</span>' : ''}</div></div>`;
      }
      top += m.who === 'user' ? 130 : 160;
    });
    return `${H.HEAD(d)}\n${out}`;
  },
};
