/* token-split · un texto partido en tokens: fichas de colores alternos y su recuento. Datos: kicker, title,
   lines[] = { label, tokens[] } (el texto es la unión de los tokens; un espacio inicial se dibuja como «·»), note.
   Una línea por paso, la nota al final. 1–3 líneas, hasta ~14 fichas por línea. */
TPL['token-split'] = {
  def: {
    kicker: 'Tokens', title: 'El texto se parte [[en piezas]]',
    lines: [
      { label: 'Una frase', tokens: ['Hola', ',', ' ¿', 'qué', ' tal', '?'] },
      { label: 'Una palabra larga', tokens: ['program', 'ación'] },
      { label: 'Una línea de código', tokens: ['if', ' (', 'x', ' >', ' 0', ')', ' {'] },
    ],
    note: 'Cada modelo parte el texto a su manera: la misma frase no mide lo mismo en todos',
  },
  html(d, H) {
    const TONOS = [['rgba(59,130,246,.30)', 'rgba(96,165,250,.70)'], ['rgba(147,197,253,.20)', 'rgba(147,197,253,.60)'], ['rgba(30,58,138,.55)', 'rgba(96,165,250,.45)']];
    const n = d.lines.length, paso = n > 2 ? 190 : 230;
    let out = H.HEAD(d);
    d.lines.forEach((l, i) => {
      const y = 330 + i * paso, i1 = i + 1;
      const fichas = l.tokens.map((t, j) => {
        const [bg, bd] = TONOS[j % TONOS.length], txt = t.replace(/^ /, '·');
        return `<span class="mono" style="display:inline-block;padding:10px 16px;margin:0 8px 8px 0;border-radius:10px;background:${bg};border:1.5px solid ${bd};font-size:40px;line-height:1;white-space:pre;color:var(--ink)">${H.esc(txt)}</span>`;
      }).join('');
      out += `<div class="abs k r" data-i="${i1}" style="left:120px;top:${y}px">${H.esc(l.label)}</div>`
        + `<div class="abs r" data-i="${i1}" style="left:120px;top:${y + 40}px;width:1380px">${fichas}</div>`
        + `<div class="abs r" data-i="${i1}" style="left:1560px;top:${y + 40}px;width:240px;text-align:right"><span class="mono cy" style="font-size:56px;font-weight:700" data-c="${l.tokens.length}">${l.tokens.length}</span><div class="k" style="margin-top:4px">tokens</div></div>`;
    });
    return out + `<div class="abs s r" data-i="${n + 1}" style="left:120px;top:${330 + n * paso + 10}px;width:1680px;font-size:28px">${H.esc(d.note)}</div>`;
  },
};
