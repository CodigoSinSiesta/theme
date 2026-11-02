/* quote · cita grande con autor y fuente (dos pasos: cita, autor).
   Datos: kicker, quote (con [[tramo en degradado]]), author, source, logo? (nombre de logo en lugar del icono de persona). Cita de hasta ~110 caracteres. */
TPL.quote = {
  def: {
    kicker: 'Fuente',
    quote: 'Un agente es un modelo [[con un bucle y herramientas]]. Lo demás es ingeniería.',
    author: 'Nombre del autor', source: 'README · github.com/…',
  },
  html(d, H) {
    const q = H.esc(d.quote).replace(/\[\[(.+?)\]\]/g, '<span style="background:var(--grad);-webkit-background-clip:text;color:transparent">$1</span>');
    return `${H.HEAD(d)}
<div class="abs mono" style="left:120px;top:150px;font-size:420px;line-height:1;color:var(--cyan);opacity:.22;font-weight:800">“</div>
<div class="abs r" data-i="1" style="left:240px;top:330px;width:1400px;font:700 70px/1.2 var(--disp);letter-spacing:-.01em">${q}</div>
<div class="abs r" data-i="2" style="left:240px;top:700px;display:flex;align-items:center;gap:26px"><div class="cy" style="width:84px;height:84px;border-radius:50%;border:2px solid var(--cyan);display:grid;place-items:center">${d.logo ? H.ICO(d.logo, 56) : H.GLYPH('user', 46)}</div><div><div class="t" style="font-size:36px">${H.A(d.author)}</div><div class="k" style="margin-top:6px">${H.esc(d.source)}</div></div></div>`;
  },
};
