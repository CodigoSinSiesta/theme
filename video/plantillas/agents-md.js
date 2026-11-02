/* agents-md · fichero con secciones plegadas y una desplegada. Datos: kicker, title, file, sections[] = { title, note?, open?: [líneas con [[acento]]], lit? }.
   Una sección por paso. Caben ~6 plegadas + una desplegada de 3 líneas. */
TPL['agents-md'] = {
  def: {
    kicker: 'Instrucciones', title: 'Un [[AGENTS.md]] que funcione', file: 'AGENTS.md',
    sections: [
      { title: 'Proyecto', note: 'tienda de ejemplo' },
      { title: 'Comandos', note: 'npm test' },
      { title: 'Al empezar', open: ['1. Lee [[progreso.md]]', '2. Ejecuta [[init.sh]]', '3. Elige el siguiente ticket'], lit: true },
      { title: 'Al terminar', note: 'actualiza traspaso.md' },
      { title: 'Límites', note: 'no tocar la BD' },
    ],
  },
  html(d, H) {
    const hl = s => H.esc(s).replace(/\[\[(.+?)\]\]/g, '<span class="cy">$1</span>');
    const rows = d.sections.map((s, i) => {
      const open = s.open && s.open.length;
      return `<div class="r" data-i="${i + 1}"${s.lit ? ' style="background:rgba(96,165,250,.18);border-radius:10px;padding:6px 12px;margin:6px 0"' : ''}><span class="cy">${open ? '▾' : '▸'}</span> # ${H.esc(s.title)}`
        + (open ? s.open.map(l => `<br>&nbsp;&nbsp;${hl(l)}`).join('') : s.note ? ` <span style="color:var(--pale3)">· ${H.esc(s.note)}</span>` : '') + '</div>';
    }).join('');
    return `${H.HEAD(d)}
<div class="g" style="left:360px;top:330px;width:1200px;height:600px;padding:0"><div class="k" style="padding:16px 30px;border-bottom:1px solid var(--line)">${H.esc(d.file)}</div>
<div class="mono" style="font-size:30px;line-height:1.7;padding:22px 34px;color:var(--pale)">${rows}</div></div>`;
  },
};
