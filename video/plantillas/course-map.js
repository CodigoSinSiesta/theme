/* course-map · mapa del curso en bloques de cuadrados numerados con el vídeo actual iluminado. Un paso por bloque y el último la etiqueta «estás aquí».
   Datos: kicker, title, blocks[] = { label, from, to } (1–5 bloques, hasta 13 cuadrados por bloque), current (número iluminado), now (texto final; vacío = no se muestra). */
TPL['course-map'] = {
  def: {
    kicker: 'Mapa', title: '26 vídeos, [[cuatro bloques]]',
    blocks: [
      { label: 'A · marco común', from: 1, to: 1 },
      { label: 'B · Pi', from: 2, to: 10 },
      { label: 'C · oh my pi', from: 11, to: 21 },
      { label: 'D · tu harness', from: 22, to: 26 },
    ],
    current: 7,
    now: 'estás aquí · 07 · MCP y codemode',
  },
  html(d, H) {
    const pad = n => String(n).padStart(2, '0');
    let out = H.HEAD(d);
    d.blocks.forEach((b, i) => {
      let sq = '';
      for (let n = b.from; n <= b.to; n++) sq += `<span class="sq${n === d.current ? ' lit' : ''}">${pad(n)}</span>`;
      out += `<div class="abs k" style="left:120px;top:${395 + i * 125}px;width:360px">${H.esc(b.label)}</div>`
        + `<div class="abs r" data-i="${i + 1}" style="left:520px;top:${360 + i * 125}px;white-space:nowrap">${sq}</div>`;
    });
    if (d.now) out += `<div class="abs k cy r" data-i="${d.blocks.length + 1}" style="left:520px;top:${380 + d.blocks.length * 125}px">${H.esc(d.now)}</div>`;
    return out;
  },
};
