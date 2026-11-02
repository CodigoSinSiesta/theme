/* slash-menu · se escribe «/» y aparece el menú filtrado. Datos: kicker, title, input, items[] = { cmd, desc } (`lit`: índice iluminado, 0 por defecto),
   hint, hintAccent. Pasos: 1 entrada, 2… cada opción, último el pie. 2–4 opciones. */
TPL['slash-menu'] = {
  def: {
    kicker: 'Comandos', title: 'Escribe [[/]] y elige',
    input: '/co', lit: 0,
    items: [
      { cmd: '/compact', desc: 'Reduce el historial para ganar contexto' },
      { cmd: '/context', desc: 'Muestra cómo se reparte la ventana' },
      { cmd: '/copy', desc: 'Copia la última respuesta' },
    ],
    hint: '↑ ↓ para moverte · Enter para ejecutar ·', hintAccent: '85 comandos en omp',
  },
  html(d, H) {
    const n = d.items.length, h = 40 + n * 130;
    const items = d.items.map((it, i) => `<div class="r flex" data-i="${i + 2}" style="${i === d.lit ? 'background:rgba(96,165,250,.22);' : ''}padding:26px 34px;gap:30px"><span class="mono${i === d.lit ? ' cy' : ''} t" style="font-size:36px;width:300px">${H.esc(it.cmd)}</span><span class="s">${H.esc(it.desc)}</span></div>`).join('');
    return `${H.HEAD(d)}
<div class="g r flex" data-i="1" style="left:360px;top:330px;width:1200px;height:100px;padding:0 34px"><span class="mono t" style="font-size:42px"><span class="cy">›</span> ${H.esc(d.input)}<span class="cy">▍</span></span></div>
<div class="g" style="left:360px;top:450px;width:1200px;height:${h}px;padding:12px 0">${items}</div>
<div class="abs k r" data-i="${n + 2}" style="left:360px;top:${450 + h + 30}px">${H.esc(d.hint)} <span class="cy">${H.esc(d.hintAccent)}</span></div>`;
  },
};
