/* quadrant · cuadrante 2×2 con puntos colocados; cada punto entra en un paso.
   Datos: kicker, title, quads[4] (arr-izq, arr-der, abj-izq, abj-der), axis[2] (izq, der),
   points[] = { t, x, y (esquina sup. izq. en px del lienzo; el cuadrante va de 420–1500 × 320–960), dim? (gris en vez de cian) }. 1–6 puntos. */
TPL.quadrant = {
  def: {
    kicker: 'Posición', title: 'Control frente a [[autonomía]]',
    quads: ['Manual · preciso', 'Autónomo · preciso', 'Manual · difuso', 'Autónomo · difuso'],
    axis: ['← más control', 'más autonomía →'],
    points: [
      { t: 'Pi', x: 560, y: 450 }, { t: 'Hermes', x: 1120, y: 420 },
      { t: 'Agente a ciegas', x: 1180, y: 760, dim: true }, { t: 'Prompt suelto', x: 500, y: 780, dim: true },
    ],
  },
  html(d, H) {
    const q = d.quads, pts = d.points.map((p, i) => `<div class="abs t r" data-i="${i + 1}" style="left:${p.x}px;top:${p.y}px;font-size:36px"><span${p.dim ? ' style="color:var(--pale3)"' : ' class="cy"'}>●</span> ${H.A(p.t)}</div>`).join('');
    return `${H.HEAD(d)}
<div class="abs" style="left:420px;top:320px;width:1080px;height:640px;border:1.5px solid var(--line);background:var(--glass);border-radius:18px"></div>
<div class="abs" style="left:960px;top:320px;width:2px;height:640px;background:var(--line)"></div>
<div class="abs" style="left:420px;top:640px;width:1080px;height:2px;background:var(--line)"></div>
<div class="abs k" style="left:440px;top:335px">${H.esc(q[0])}</div><div class="abs k" style="left:980px;top:335px">${H.esc(q[1])}</div>
<div class="abs k" style="left:440px;top:660px">${H.esc(q[2])}</div><div class="abs k" style="left:980px;top:660px">${H.esc(q[3])}</div>
<div class="abs k" style="left:420px;top:980px">${H.esc(d.axis[0])}</div><div class="abs k" style="left:1290px;top:980px">${H.esc(d.axis[1])}</div>
${pts}`;
  },
};
