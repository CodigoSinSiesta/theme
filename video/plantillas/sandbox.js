/* sandbox · el agente dentro de una caja punteada (con lo que ve y dónde corre) y el host fuera.
   Datos: agent = { logo, name }, inside = { label, lines[] }, runsOn = { label, logos[], note }, outside = { label, lines[] } (cada línea con ✗). */
TPL.sandbox = {
  def: {
    kicker: 'Aislamiento', title: 'Trabaja [[dentro de una caja]]',
    agent: { logo: 'hermes', name: 'Agente' },
    inside: { label: 'dentro', lines: ['proyecto/', 'tests/'] },
    runsOn: { label: 'se ejecuta en', logos: ['docker', 'modal', 'vercel'], note: 'Docker, Modal o Vercel Sandbox: el agente no ve nada más.' },
    outside: { label: 'tu máquina · fuera', lines: ['disco personal', 'claves y ~/.ssh', 'red interna', 'otros proyectos'] },
  },
  html(d, H) {
    return `${H.HEAD(d)}
<div class="r" data-i="1" style="position:absolute;left:120px;top:330px;width:900px;height:620px;border:3px dashed var(--cyan);border-radius:30px;background:rgba(96,165,250,.06)"></div>
<div class="g lit r flex" data-i="1" style="left:170px;top:380px;width:420px;height:170px;gap:24px">${H.ICO(d.agent.logo, 100)}<span class="t">${H.A(d.agent.name)}</span></div>
<div class="g r" data-i="2" style="left:620px;top:380px;width:350px;height:170px"><div class="k">${H.A(d.inside.label)}</div><div class="mono" style="font-size:26px;line-height:1.9;margin-top:6px;color:var(--pale)">${d.inside.lines.map(H.esc).join('<br>')}</div></div>
<div class="abs k r" data-i="3" style="left:170px;top:610px">${H.A(d.runsOn.label)}</div>
<div class="abs flex r" data-i="3" style="left:170px;top:660px;gap:28px">${d.runsOn.logos.map(l => H.ICO(l, 90)).join('')}</div>
<div class="abs r" data-i="3" style="left:170px;top:790px;width:800px;font:500 26px/1.5 var(--body);color:var(--pale3)">${H.A(d.runsOn.note)}</div>
<div class="abs r" data-i="4" style="left:1060px;top:330px;width:4px;height:620px;background:var(--red);opacity:.7"></div>
<div class="g r" data-i="4" style="left:1130px;top:330px;width:670px;height:620px"><div class="k">${H.A(d.outside.label)}</div><div class="mono" style="font-size:32px;line-height:2.3;margin-top:20px;color:var(--pale)">${d.outside.lines.map(l => `<span class="bad">✗</span> ${H.esc(l)}`).join('<br>')}</div></div>`;
  },
};
