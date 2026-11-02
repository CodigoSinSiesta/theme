/* mode-lock · vídeo 15 · modos excluyentes: al activar uno, los demás quedan con candado; para cambiar, se cierra el activo.
   Datos: kicker, title, modes[] = { cmd, name, caption, note? } (2–4), active (rótulo del activo), locked (rótulo del bloqueado), end.
   Pasos: uno por modo (1…n: ese modo activo y el resto bloqueado), n+1 todos libres y la regla para cambiar. Icono: lock-closed (bloqueado). */
TPL['mode-lock'] = {
  def: {
    kicker: 'Por qué son excluyentes', title: 'Uno activo, [[los demás bloqueados]]',
    modes: [
      { cmd: '/plan', name: 'modo plan', caption: 'Bloquea goal y vibe' },
      { cmd: '/goal', name: 'modo goal', caption: 'Bloquea plan y vibe', note: 'activo o en pausa' },
      { cmd: '/vibe', name: 'modo vibe', caption: 'Bloquea a los otros dos' },
    ],
    active: 'activo', locked: 'bloqueado', end: 'Para pasar de uno a otro, [[cierras el que tienes]].',
  },
  html(d, H) {
    const n = d.modes.length, gap = n > 3 ? 50 : 90, w = Math.round((1680 - gap * (n - 1)) / n), x = k => 120 + k * (w + gap), top = 340, h = 380;
    const face = m => `<div class="mono cy" style="font-size:64px;font-weight:700;margin-top:70px;text-align:center">${H.esc(m.cmd)}</div><div class="k" style="text-align:center;margin-top:14px">${H.esc(m.name)}</div>`;
    const lock = H.GLYPH('lock-closed', 48, 'bad');
    let out = d.modes.map((m, k) => `<div class="g r" data-i="1" style="left:${x(k)}px;top:${top}px;width:${w}px;height:${h}px">${face(m)}</div>`).join('\n');
    d.modes.forEach((m, k) => {
      const on = k + 1, off = k + 2;
      out += `\n<div class="g lit r" data-i="${on}" data-off="${off}" style="left:${x(k)}px;top:${top}px;width:${w}px;height:${h}px">${face(m)}<div style="text-align:center;margin-top:30px"><span class="pill ok" style="border-color:var(--ok);font-size:24px;padding:8px 20px">● ${H.esc(d.active)}</span></div>${m.note ? `<div class="s" style="text-align:center;font-size:24px;margin-top:14px">${H.A(m.note)}</div>` : ''}</div>`;
      d.modes.forEach((_, j) => { if (j !== k) out += `\n<div class="abs r" data-i="${on}" data-off="${off}" style="left:${x(j)}px;top:${top}px;width:${w}px;height:${h}px;border-radius:22px;background:#0b1224;border:2px solid var(--red)"><div class="mono" style="font-size:64px;font-weight:700;margin-top:98px;text-align:center;color:var(--pale3);opacity:.45">${H.esc(d.modes[j].cmd)}</div><div class="flex" style="justify-content:center;gap:16px;margin-top:40px">${lock}<span class="k bad">${H.esc(d.locked)}</span></div></div>`; });
      out += `\n<div class="abs r" data-i="${on}" data-off="${off}" style="left:120px;top:${top + h + 60}px;width:1680px;text-align:center"><span class="t" style="font-size:44px"><span class="cy mono">${H.esc(m.cmd)}</span> · ${H.A(m.caption)}</span></div>`;
    });
    return `${H.HEAD(d)}
${out}
<div class="g lit r" data-i="${n + 1}" style="left:120px;top:${top + h + 50}px;width:1680px;height:110px;padding:0 36px;display:flex;align-items:center"><span class="s" style="font-size:32px;color:var(--ink)">${H.A(d.end)}</span></div>`;
  },
};
