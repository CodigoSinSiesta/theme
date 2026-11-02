/* pattern-dodge · vídeo 19 · un patrón compara texto, no intenciones: el comando que hace lo mismo con otra forma no encaja
   con el deny y acaba en el diálogo o, con un allow amplio, pasa. Datos: kicker, title, is, isNot, shell = { label, text }, compare,
   rule = { match, approval }, cmd, miss, ask = { label, policy, text }, wide = { label, text }. El prefijo común se calcula.
   Pasos: 1 política, 2 no confinamiento, 3 acceso de la shell, 4 comparan texto, 5 no encaja, 6 preguntaría, 7 allow amplio. */
TPL['pattern-dodge'] = {
  def: {
    kicker: 'Vídeo 08', title: 'Aprobar no es [[aislar]]',
    is: 'una política de aprobación', isNot: 'un confinamiento',
    shell: { label: 'comando aprobado', text: 'todo el acceso de tu shell' },
    compare: 'los patrones comparan texto', rule: { match: 'git push*', approval: 'deny' }, cmd: 'git -C . push',
    miss: 'no empieza por git push',
    ask: { label: 'con nuestra configuración', policy: 'bash: prompt', text: 'preguntaría' },
    wide: { label: 'con un allow amplio', text: 'pasaría' },
  },
  html(d, H) {
    const pat = d.rule.match.replace(/\*$/, ''), cmd = d.cmd;
    let k = 0; while (k < pat.length && k < cmd.length && pat[k] === cmd[k]) k++;
    const row = (label, text, y, extra) => `<div class="abs flex" style="left:160px;top:${y}px;gap:28px"><span class="k" style="width:150px">${H.esc(label)}</span>
<span class="mono" style="position:relative;font-size:40px;line-height:56px;white-space:pre;color:var(--ink)"><i class="r" data-i="5" style="position:absolute;left:0;top:50px;width:${k - 0.4}ch;height:5px;border-radius:3px;background:var(--ok)"></i><i class="r" data-i="5" style="position:absolute;left:${k - 0.25}ch;top:-4px;width:${text.length - k + 0.5}ch;height:64px;border-radius:10px;background:rgba(248,113,113,.18);box-shadow:0 0 0 2px var(--red)"></i>${H.esc(text)}</span>${extra || ''}</div>`;
    const tone = { allow: 'new', prompt: 'chg', deny: 'del' }[d.rule.approval] || 'chg';
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:316px;width:820px;height:200px"><div class="k">${H.esc('los patrones son')}</div>
<div class="flex" style="gap:16px;margin-top:16px">${H.GLYPH('check-circle', 38, 'ok')}<span class="s" style="color:var(--ink)">${H.esc(d.is)}</span></div>
<div class="flex r" data-i="2" style="gap:16px;margin-top:10px">${H.GLYPH('x-circle', 38, 'bad')}<span class="s" style="text-decoration:line-through;text-decoration-color:var(--red)">${H.esc(d.isNot)}</span></div></div>
<div class="g r flex" data-i="3" style="left:980px;top:316px;width:820px;height:200px;gap:30px">${H.GLYPH('command-line', 72)}<div><div class="k">${H.esc(d.shell.label)}</div><div class="s" style="color:var(--ink);margin-top:10px">${H.esc(d.shell.text)}</div></div></div>
<div class="g r" data-i="4" style="left:120px;top:556px;width:980px;height:404px;padding:0"></div>
<div class="abs k cy r" data-i="4" style="left:160px;top:588px">${H.esc(d.compare)}</div>
<div class="r" data-i="4">${row('patrón', pat + (d.rule.match.endsWith('*') ? '*' : ''), 650, `<span class="bdg ${tone}">${H.esc(d.rule.approval)}</span>`)}${row('comando', cmd, 760)}</div>
<div class="abs flex r" data-i="5" style="left:160px;top:870px;gap:14px">${H.GLYPH('x-circle', 38, 'bad')}<span class="s bad">${H.esc(d.miss)}</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="6" d="M1100 720 C1140 720 1140 650 1180 650" stroke="#fbbf24"/>
<path class="draw" data-i="7" d="M1100 800 C1140 800 1140 866 1180 866" stroke="#f87171"/></svg>
<div class="g r" data-i="6" style="left:1180px;top:556px;width:620px;height:190px;border-color:var(--amber)"><div class="k am">${H.esc(d.ask.label)}</div>
<div class="flex" style="gap:14px;margin-top:14px">${H.GLYPH('hand-raised', 36, 'am')}<span class="mono" style="font-size:28px">${H.esc(d.ask.policy)}</span></div>
<div class="s" style="margin-top:6px;color:var(--ink)">${H.esc(d.ask.text)}</div></div>
<div class="g r" data-i="7" style="left:1180px;top:770px;width:620px;height:190px;border-color:var(--red)"><div class="k bad">${H.esc(d.wide.label)}</div>
<div class="flex" style="gap:14px;margin-top:18px">${H.GLYPH('exclamation-triangle', 40, 'bad')}<span class="t" style="font-size:40px">${H.esc(d.wide.text)}</span></div></div>`;
  },
};
