/* tool-payload · vídeo 07 · una herramienta declarada (nombre, descripción, esquema) y la misma declaración repetida en cada petición.
   Datos: kicker, title, card = { label, name, descLabel, schemaLabel }, turns (2–4), turnLabel, note.
   Pasos: 1 tarjeta y nombre, 2 peticiones con su copia, 3 descripción, 4 esquema, 5 la copia se paga en cada turno. */
TPL['tool-payload'] = {
  def: {
    kicker: 'El problema', title: 'La misma declaración, [[en cada petición]]',
    card: { label: 'una herramienta declarada', name: 'read_file', descLabel: 'descripción', schemaLabel: 'esquema de parámetros' },
    turns: 4, turnLabel: 'turno', note: 'se paga en tokens en cada turno',
  },
  html(d, H) {
    const C = d.card, n = d.turns, gap = 26, x0 = 860, w = (1800 - x0 - (n - 1) * gap) / n, top = 330, h = 540;
    const bar = (wd, mt = 12, a = .35) => `<i style="display:block;height:14px;border-radius:5px;background:rgba(148,163,184,${a});margin-top:${mt}px;width:${wd}%"></i>`;
    const cols = Array.from({ length: n }, (_, k) => {
      const x = x0 + k * (w + gap);
      const msgs = Array.from({ length: k + 1 }, (_, j) => `<i style="display:block;height:30px;border-radius:8px;background:${j % 2 ? 'rgba(96,165,250,.30)' : 'rgba(148,163,184,.30)'};margin-top:16px;width:${[88, 70, 80, 64, 76][j % 5]}%"></i>`).join('');
      return `<div class="g r" data-i="2" style="left:${x}px;top:${top}px;width:${w}px;height:${h}px;padding:24px 24px">
<div style="border:2px solid var(--cyan);border-radius:12px;padding:16px 18px;background:rgba(30,58,138,.38)"><div class="mono cy" style="font-size:22px">${H.esc(C.name)}</div>${bar(90, 12)}${bar(70)}</div>${msgs}</div>
<div class="abs r" data-i="5" style="left:${x}px;top:${top}px;width:${w}px;height:${h}px;border:3px solid var(--amber);border-radius:22px;box-shadow:0 0 40px rgba(251,191,36,.25)"></div>
<div class="abs k r" data-i="2" style="left:${x}px;top:${top + h + 18}px;width:${w}px;text-align:center">${H.esc(d.turnLabel)} ${k + 1}</div>`;
    }).join('');
    return `${H.HEAD(d)}
<div class="g lit r" data-i="1" style="left:120px;top:330px;width:640px;height:540px;padding:30px 36px">
<div class="flex" style="gap:16px">${H.GLYPH('wrench', 40)}<span class="k">${H.A(C.label)}</span></div>
<div class="k" style="font-size:22px;margin-top:34px">nombre</div><div class="mono cy t" style="font-size:40px;margin-top:10px">${H.esc(C.name)}</div>
<div class="r" data-i="3" style="margin-top:36px"><div class="k" style="font-size:22px">${H.A(C.descLabel)}</div>${bar(92, 18, .45)}${bar(80, 14, .45)}${bar(56, 14, .45)}</div>
<div class="r" data-i="4" style="margin-top:36px"><div class="k" style="font-size:22px">${H.A(C.schemaLabel)}</div><div class="mono" style="font-size:28px;margin-top:12px;color:var(--pale)">{ … }</div>${bar(64, 10, .45)}${bar(48, 14, .45)}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3"><path class="draw" data-i="2" d="M762 480 C800 480 815 420 856 420"/></svg>
${cols}
<div class="abs r" data-i="5" style="left:${x0}px;top:${top + h + 62}px;width:${1800 - x0}px;text-align:center"><span class="t am" style="font-size:32px">${H.A(d.note)}</span></div>`;
  },
};
