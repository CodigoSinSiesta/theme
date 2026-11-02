/* hero-logo · presentación de una herramienta: logo grande, banner opcional, frase y etiquetas.
   Datos: kicker, logo, name (alt del banner), banner (ruta bajo logos/herramientas/ o '' para omitirlo), text, pills[] (1–4). */
TPL['hero-logo'] = {
  def: {
    kicker: 'Herramienta', logo: 'hermes', name: 'Hermes Agent', banner: 'hermes/banner.png',
    text: 'Agente que vive en tu servidor y recuerda lo que hacéis juntos.',
    pills: ['Nous Research', 'código abierto', 'memoria + skills'],
  },
  html(d, H) {
    const ban = d.banner ? `<img src="${TPLRT.base}${H.esc(d.banner)}" alt="${H.esc(d.name)}" style="width:900px;border-radius:14px;display:block">` : '';
    return `${H.HEAD(d)}
<div class="g lit r" data-i="1" style="left:120px;top:250px;width:560px;height:560px;display:grid;place-items:center">${H.ICO(d.logo, 440)}</div>
<div class="abs r" data-i="2" style="left:780px;top:${d.banner ? 290 : 400}px;width:1000px">${ban}
<div class="s" style="font-size:42px;margin-top:${d.banner ? 30 : 0}px">${H.A(d.text)}</div></div>
<div class="abs r" data-i="3" style="left:780px;top:640px;display:flex;gap:18px">${d.pills.map(p => `<span class="pill">${H.esc(p)}</span>`).join('')}</div>`;
  },
};
