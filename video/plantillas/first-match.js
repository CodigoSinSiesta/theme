/* first-match · vídeo 19 · lista ordenada de patrones: un comando baja por las reglas y gana la primera que encaja.
   Datos: kicker, title, rules[] = { match, approval: 'allow'|'prompt'|'deny' } (4–7, en orden), cmd, spaced (cmd con espacios
   repetidos), win, rest, star, spacesLabel. La regla ganadora se calcula (el * es el único comodín). Pasos: 1 lista, 2 decisiones,
   3 comando y regla ganadora, 4 comodín, 5 espacios repetidos. */
TPL['first-match'] = {
  def: {
    kicker: 'bash.patterns', title: 'Gana [[la primera]] que encaja',
    rules: [{ match: 'git push*', approval: 'deny' }, { match: 'git status', approval: 'allow' }, { match: 'git diff*', approval: 'allow' },
      { match: 'git log*', approval: 'allow' }, { match: 'git show*', approval: 'allow' }, { match: 'npm test', approval: 'allow' },
      { match: 'node --test*', approval: 'allow' }],
    cmd: 'git log --oneline -5', spaced: 'git   log --oneline -5',
    win: 'Gana la regla', rest: 'Las de abajo ya no se miran.',
    star: 'El único comodín: encaja con cualquier resto.', spacesLabel: 'espacios repetidos',
  },
  html(d, H) {
    const n = d.rules.length, pitch = n > 6 ? 86 : 96, y = i => 350 + i * pitch, rh = pitch - 10;
    const norm = s => s.trim().replace(/\s+/g, ' ');
    const re = m => new RegExp('^' + norm(m).split('*').map(p => p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*') + '$');
    const hit = d.rules.findIndex(r => re(r.match).test(norm(d.cmd)));
    const tone = { allow: 'new', prompt: 'chg', deny: 'del' };
    const star = `<span style="position:relative">*<i class="r" data-i="4" style="position:absolute;left:-3px;right:-3px;top:-1px;bottom:-1px;border-radius:6px;background:rgba(251,191,36,.18);box-shadow:0 0 0 2px var(--amber)"></i></span>`;
    const rows = d.rules.map((r, i) => `<div class="abs flex" style="left:150px;top:${y(i)}px;width:840px;height:${rh}px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:0 22px;gap:22px"><span class="k" style="width:28px">${i + 1}</span><span class="mono" style="font-size:28px;line-height:1.3;white-space:pre;color:var(--pale)">${r.match.split('*').map(H.esc).join(star)}</span></div>`).join('');
    const badges = d.rules.map((r, i) => `<div class="abs r" data-i="2" style="left:780px;top:${y(i) + (rh - 40) / 2}px;width:190px;text-align:right"><span class="bdg ${tone[r.approval] || 'chg'}">${H.esc(r.approval)}</span></div>`).join('');
    const scan = d.rules.map((r, i) => i < hit ? `<div class="abs mono r" data-i="3" style="left:700px;top:${y(i) + (rh - 36) / 2}px;font-size:28px;color:var(--pale3)">✕</div>`
      : i === hit ? `<div class="abs r" data-i="3" style="left:150px;top:${y(i)}px;width:840px;height:${rh}px;border-radius:12px;border:3px solid var(--cyan);box-shadow:0 0 30px rgba(96,165,250,.45)"></div><div class="abs mono ok r" data-i="3" style="left:700px;top:${y(i) + (rh - 36) / 2}px;font-size:28px">✓</div>`
      : `<div class="abs r" data-i="3" style="left:146px;top:${y(i) - 4}px;width:848px;height:${rh + 8}px;border-radius:14px;background:rgba(11,17,32,.7)"></div>`).join('');
    const yh = hit < 0 ? 470 : y(hit) + rh / 2;
    const spaced = H.esc(d.spaced).replace(/ {2,}/g, m => `<span style="background:rgba(251,191,36,.25);box-shadow:0 2px 0 var(--amber)">${m}</span>`);
    const W = hit < 0 ? null : d.rules[hit];
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:900px;height:${y(n) - 320 + 14}px"></div>
<div class="r" data-i="1">${rows}</div>${badges}${scan}
<div class="abs r flex" data-i="2" style="left:1080px;top:322px;width:720px;gap:16px"><span class="k" style="margin-right:8px">decisión</span><span class="bdg new">allow</span><span class="bdg chg">prompt</span><span class="bdg del">deny</span></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="3" d="M1078 470 C1036 470 1040 ${yh} 998 ${yh}"/><path class="draw" data-i="3" d="M1012 ${yh - 12} L996 ${yh} L1012 ${yh + 12}"/></svg>
<div class="g lit r" data-i="3" style="left:1080px;top:400px;width:720px;height:140px"><div class="k">comando</div><div class="mono" style="font-size:32px;margin-top:16px;white-space:pre">${H.esc(d.cmd)}</div></div>
<div class="abs r" data-i="3" style="left:1080px;top:556px;width:720px">${W ? `<div class="flex" style="gap:18px"><span class="s" style="color:var(--ink)">${H.esc(d.win)} ${hit + 1}</span><span class="bdg ${tone[W.approval] || 'chg'}">${H.esc(W.approval)}</span></div>` : ''}<div class="s" style="font-size:26px;margin-top:6px">${H.A(d.rest)}</div></div>
<div class="g r flex" data-i="4" style="left:1080px;top:668px;width:720px;height:112px;padding:0 30px;gap:26px"><span class="mono am" style="font-size:52px;line-height:1;font-weight:700">*</span><span class="s" style="font-size:26px">${H.A(d.star)}</span></div>
<div class="g r" data-i="5" style="left:1080px;top:798px;width:720px;height:166px;padding:24px 30px"><div class="k">${H.esc(d.spacesLabel)}</div><div class="mono" style="font-size:28px;margin-top:10px;white-space:pre;color:var(--pale)">${spaced}</div><div class="mono ok" style="font-size:28px;white-space:pre">= ${H.esc(norm(d.spaced))}</div></div>`;
  },
};
