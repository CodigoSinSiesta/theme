/* redaction · secreto local → redactor → marcador que va al modelo y vuelve con el valor restaurado. 5 pasos fijos.
   Datos: kicker, title, zone, secret = { name, value }, redactor, icon (Heroicon del redactor), marker, reply, model = { name, text, icon? }, restore. */
TPL.redaction = {
  def: { kicker: 'Secretos', title: 'El modelo [[nunca ve la clave]]', zone: 'tu máquina', secret: { name: 'DEEPSEEK_API_KEY=', value: 'sk-live-8f2c…' },
    redactor: 'Redactor local', icon: 'eye-slash', marker: '$$KEY_1$$', reply: 'usa $$KEY_1$$', model: { name: 'Modelo', text: 'Solo ve el marcador, nunca el valor.', icon: 'cpu-chip' },
    restore: 'Al volver, restaura el valor real en el comando.' },
  html(d, H) {
    return `${H.HEAD(d)}
<div class="r" data-i="1" style="position:absolute;left:120px;top:340px;width:800px;height:600px;border:3px dashed var(--cyan);border-radius:28px;background:rgba(96,165,250,.05)"></div>
<div class="abs k r" data-i="1" style="left:150px;top:355px">${H.A(d.zone)}</div>
<div class="g r" data-i="1" style="left:160px;top:410px;width:720px;height:120px;padding:0 36px;display:flex;align-items:center"><span class="mono" style="font-size:34px">${H.esc(d.secret.name)}<span class="bad">${H.esc(d.secret.value)}</span></span></div>
<div class="abs mono cy r" data-i="2" style="left:500px;top:556px;font-size:44px">↓</div>
<div class="g lit r flex" data-i="2" style="left:160px;top:640px;width:720px;height:120px;padding:0 36px;gap:24px">${H.GLYPH(d.icon || 'eye-slash', 52)}<span class="t" style="font-size:36px">${H.A(d.redactor)}</span></div>
<div class="abs s r" data-i="5" style="left:160px;top:800px;width:720px;font-size:26px">${H.A(d.restore)}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="4"><line class="draw" data-i="3" x1="880" y1="650" x2="1300" y2="650"/><line class="draw" data-i="4" x1="1300" y1="740" x2="880" y2="740" stroke="#34d399"/></svg>
<div class="abs mono cy r" data-i="3" style="left:960px;top:600px;font-size:26px">${H.esc(d.marker)}</div><div class="abs mono ok r" data-i="4" style="left:930px;top:756px;font-size:26px">${H.esc(d.reply)}</div>
<div class="g r" data-i="3" style="left:1300px;top:480px;width:500px;height:300px"><div class="flex" style="gap:18px">${H.GLYPH(d.model.icon || 'cpu-chip', 52)}<span class="t" style="font-size:38px">${H.A(d.model.name)}</span></div><div class="s" style="font-size:26px;margin-top:22px;line-height:1.5">${H.A(d.model.text)}</div></div>`;
  },
};
