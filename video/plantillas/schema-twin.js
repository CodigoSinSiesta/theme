/* schema-twin · vídeo 08 · un esquema de TypeBox da dos cosas a la vez (JSON schema para el modelo y tipo de TypeScript para tu
   código), y Pi valida contra él los argumentos que vuelven del modelo. Datos: kicker, title, schema = { k, lines[] (1–4, ~40 car.) },
   left / right = { k, t, s, mono? }, check = { label, t }. Pasos: 1 esquema, 2 izquierda, 3 derecha, 4 validación. */
TPL['schema-twin'] = {
  def: {
    kicker: 'TypeBox', title: 'Un esquema, [[dos cosas a la vez]]',
    schema: { k: 'parameters', lines: ['Type.Object({', '  fichero: Type.Optional(Type.String())', '})'] },
    left: { k: 'JSON schema', t: 'Viaja al modelo', s: 'con la definición de la herramienta' },
    right: { k: 'tipo de TypeScript', t: 'En tu código', s: 'los parámetros, con su tipo', mono: 'params.fichero' },
    check: { label: 'argumentos', t: 'Pi valida contra el esquema' },
  },
  html(d, H) {
    const L = d.schema.lines.length, sh = 84 + L * 42, sb = 300 + sh;
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M760 ${sb} C760 ${sb + 50} 470 ${600 - 50} 470 600"/>
<path class="draw" data-i="3" d="M1160 ${sb} C1160 ${sb + 50} 1450 ${600 - 50} 1450 600"/>
<path class="draw" data-i="4" d="M470 820 V910 H680"/><path class="draw" data-i="4" d="M1240 910 H1450 V820"/></svg>
<div class="g lit r" data-i="1" style="left:560px;top:300px;width:800px;height:${sh}px;padding:22px 34px"><div class="k cy">${H.A(d.schema.k)}</div>
<div class="mono" style="font-size:30px;line-height:42px;margin-top:10px;white-space:pre">${d.schema.lines.map(H.esc).join('\n')}</div></div>
<div class="g r" data-i="2" style="left:120px;top:600px;width:700px;height:220px;padding:26px 34px"><div class="flex" style="gap:16px">${H.GLYPH('cpu-chip', 44)}<span class="k">${H.A(d.left.k)}</span></div>
<div class="t" style="font-size:40px;margin-top:18px">${H.A(d.left.t)}</div><div class="s" style="font-size:26px;margin-top:6px">${H.A(d.left.s)}</div></div>
<div class="g r" data-i="3" style="left:1100px;top:600px;width:700px;height:220px;padding:26px 34px"><div class="flex" style="gap:16px">${H.GLYPH('code-bracket', 44)}<span class="k">${H.A(d.right.k)}</span></div>
<div class="t" style="font-size:40px;margin-top:18px">${H.A(d.right.t)}</div><div class="s" style="font-size:26px;margin-top:6px">${H.A(d.right.s)}${d.right.mono ? ` · <span class="mono cy">${H.esc(d.right.mono)}</span>` : ''}</div></div>
<div class="abs r" data-i="4" style="left:488px;top:864px;width:190px"><span class="mono" style="font-size:24px;color:var(--pale)">${H.A(d.check.label)} →</span></div>
<div class="g lit r" data-i="4" style="left:680px;top:868px;width:560px;height:84px;padding:0 24px;display:flex;align-items:center;justify-content:center;gap:14px"><span class="ok" style="font:700 30px var(--disp)">✓</span><span class="s" style="font-size:26px;color:var(--ink)">${H.A(d.check.t)}</span></div>`;
  },
};
