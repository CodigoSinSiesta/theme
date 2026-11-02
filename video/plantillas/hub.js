/* hub · núcleo central con nodos conectados por trazos. Datos: kicker, title, core = { name, logo }, nodes[] (1–5) = { name, glyph | logo }.
   Orden de las casillas: arriba-izq., abajo-izq., arriba-der., abajo-der., superior central. */
TPL.hub = {
  def: {
    kicker: 'Conexiones', title: 'Un harness, [[muchas puertas]]',
    core: { name: 'Harness', logo: 'hermes' },
    nodes: [{ name: 'MCP', logo: 'mcp' }, { name: 'Skills', glyph: 'file' }, { name: 'Modelo', glyph: 'model' }, { name: 'Subagentes', glyph: 'sub' }, { name: 'Tú', glyph: 'user' }],
  },
  html(d, H) {
    // [left, top, w, h, x2, y2, fuente, icono]
    const S = [[300, 395, 330, 150, 620, 470, 32, 56], [300, 760, 330, 150, 620, 835, 32, 56], [1290, 395, 330, 150, 1300, 470, 32, 56], [1290, 760, 330, 150, 1300, 835, 32, 56], [800, 270, 320, 90, 960, 360, 30, 44]];
    const nodes = d.nodes.slice(0, 5);
    const lines = nodes.map((n, i) => `<line class="draw" data-i="${i + 1}" x1="960" y1="640" x2="${S[i][4]}" y2="${S[i][5]}"/>`).join('');
    const cards = nodes.map((n, i) => { const s = S[i]; return `<div class="g node r" data-i="${i + 1}" style="left:${s[0]}px;top:${s[1]}px;width:${s[2]}px;height:${s[3]}px">${n.logo ? H.ICO(n.logo, s[7]) : H.GLYPH(n.glyph, s[7])}<span class="t" style="font-size:${s[6]}px">${H.esc(n.name)}</span></div>`; }).join('');
    const c = d.core;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3" stroke-opacity=".7">${lines}</svg>
<div class="g lit" style="left:810px;top:540px;width:300px;height:200px;text-align:center;padding:20px">${c.logo ? H.ICO(c.logo, 64) : H.GLYPH(c.glyph, 64)}<div class="t" style="font-size:34px">${H.esc(c.name)}</div></div>
${cards}`;
  },
};
