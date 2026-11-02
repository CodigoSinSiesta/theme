/* handover-note · dos notas que una sesión deja a la siguiente (lista de progreso + traspaso). Pasos: 1 izquierda, 2 derecha (iluminada).
   Datos: kicker, title, left = { title, items[] = { mark: 'ok'|'am'|'', text } }, right = { title, lines[] = { k?, v } (sin k = línea de continuación sangrada) }. Hasta 6 líneas por nota. */
TPL['handover-note'] = {
  def: {
    kicker: 'Traspaso', title: 'Lo que [[no se olvida]] entre sesiones',
    left: { title: 'progreso.md', items: [
      { mark: 'ok', text: 'ticket-001 · modelo de cupón' },
      { mark: 'am', text: 'ticket-002 · validación' },
      { mark: '', text: 'ticket-003 · aplicar al total' },
    ] },
    right: { title: 'traspaso.md', lines: [
      { k: 'Siguiente:', v: 'ticket-002' },
      { k: 'Estado:', v: 'tests en verde,' },
      { v: 'salvo el caso de caducidad' },
      { k: 'No tocar:', v: 'init.sh' },
    ] },
  },
  html(d, H) {
    const sym = { ok: '<span class="ok">☑</span>', am: '<span class="am">◐</span>', '': '<span style="color:var(--pale3)">☐</span>' };
    const left = d.left.items.map(i => `${sym[i.mark || ''] || sym['']} ${H.esc(i.text)}`).join('<br>');
    const right = d.right.lines.map(l => l.k ? `<span class="cy">${H.esc(l.k)}</span> ${H.esc(l.v)}` : `&nbsp;&nbsp;${H.esc(l.v)}`).join('<br>');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:340px;width:800px;height:560px;padding:0"><div class="k" style="padding:16px 30px;border-bottom:1px solid var(--line)">${H.esc(d.left.title)}</div><div class="mono" style="font-size:28px;line-height:2.1;padding:22px 34px;color:var(--pale)">${left}</div></div>
<div class="g lit r" data-i="2" style="left:980px;top:340px;width:820px;height:560px;padding:0"><div class="k" style="padding:16px 30px;border-bottom:1px solid var(--line)">${H.esc(d.right.title)}</div><div class="mono" style="font-size:28px;line-height:1.95;padding:22px 34px;color:var(--pale)">${right}</div></div>`;
  },
};
