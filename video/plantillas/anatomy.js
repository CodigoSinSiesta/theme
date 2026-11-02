/* anatomy · fichero central con bloques resaltados y llamadas numeradas a los lados; un paso por bloque.
   Datos: kicker, title, file (cabecera del fichero), blocks[] = { lines[], hl? (fondo azul), side: 'l'|'r', top (px de la llamada), t, s }. 1–4 bloques (el fichero mide 620px de alto). */
TPL.anatomy = {
  def: {
    kicker: 'Anatomía', title: 'Por dentro de un [[SKILL.md]]', file: 'SKILL.md',
    blocks: [
      { lines: ['---', 'name: informe', 'description: Genera…', '---'], hl: true, side: 'l', top: 370, t: 'Frontmatter', s: 'Lo único que se carga siempre' },
      { lines: ['# Cuándo usarla', '…'], side: 'r', top: 520, t: 'Instrucciones', s: 'Se leen solo si se activa' },
      { lines: ['scripts/render.py'], hl: true, side: 'l', top: 760, t: 'Recursos', s: 'Scripts y plantillas a demanda' },
    ],
  },
  html(d, H) {
    const NUM = '①②③④⑤⑥⑦⑧⑨';
    const blocks = d.blocks.map((b, i) => `<div class="r" data-i="${i + 1}" style="${i ? 'margin-top:14px;' : ''}padding:4px 10px${b.hl ? ';background:rgba(96,165,250,.16);border-radius:8px' : ''}">${b.lines.map(H.esc).join('<br>')}</div>`).join('');
    const calls = d.blocks.map((b, i) => `<div class="abs r" data-i="${i + 1}" style="left:${b.side === 'r' ? 1360 : 120}px;top:${b.top}px;width:440px${b.side === 'r' ? '' : ';text-align:right'}"><span class="cy mono" style="font-size:40px;font-weight:700">${NUM[i] || i + 1}</span><div class="t" style="font-size:34px">${H.A(b.t)}</div><div class="s" style="font-size:26px">${H.A(b.s)}</div></div>`).join('');
    return `${H.HEAD(d)}
<div class="g" style="left:620px;top:330px;width:680px;height:620px;padding:0"><div class="k" style="padding:16px 28px;border-bottom:1px solid var(--line)">${H.esc(d.file)}</div>
<div class="mono" style="font-size:27px;line-height:1.75;padding:22px 28px;color:var(--pale)">${blocks}</div></div>
${calls}`;
  },
};
