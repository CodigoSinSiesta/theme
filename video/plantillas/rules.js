/* rules · reglas allow/deny y qué comandos casan. Pasos: 1 panel de reglas, luego una fila por ejemplo y la nota.
   Datos: kicker, title, allow[], deny[], rows[] = { cmd, kind: 'new'|'del'|'chg', label }, note (admite `código`). 1–5 reglas por lista, 2–4 filas. */
TPL.rules = {
  def: {
    kicker: 'Permisos', title: 'Qué deja pasar [[cada regla]]',
    allow: ['git status*', 'npm test*', 'ls *'], deny: ['git push*', 'rm -rf *'],
    rows: [
      { cmd: 'git status', kind: 'new', label: 'permitido' },
      { cmd: 'git push origin', kind: 'del', label: 'denegado' },
      { cmd: 'git status && ls', kind: 'chg', label: 'pregunta' },
    ],
    note: 'Una línea compuesta pide diálogo aunque cada trozo esté en `allow`.',
  },
  html(d, H) {
    const list = a => a.map(H.esc).join('<br>');
    const rows = d.rows.map((r, i) => `<tr class="r" data-i="${i + 2}"><td style="padding:24px 14px">${H.esc(r.cmd)}</td><td align="right"><span class="bdg ${H.esc(r.kind)}">${H.esc(r.label)}</span></td></tr>`).join('');
    const note = d.note ? `<tr class="r" data-i="${d.rows.length + 2}"><td colspan="2" style="padding:20px 14px;font:500 26px var(--body);color:var(--pale3)">${H.A(d.note)}</td></tr>` : '';
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:340px;width:640px;height:560px"><div class="k ok">allow</div><div class="mono" style="font-size:30px;line-height:2;margin-top:8px;color:var(--pale)">${list(d.allow)}</div><div class="k bad" style="margin-top:30px">deny</div><div class="mono" style="font-size:30px;line-height:2;margin-top:8px;color:var(--pale)">${list(d.deny)}</div></div>
<div class="g" style="left:820px;top:340px;width:980px;height:560px;padding:14px 20px"><table style="width:100%;border-collapse:collapse;font:500 30px var(--mono)">${rows}${note}</table></div>`;
  },
};
