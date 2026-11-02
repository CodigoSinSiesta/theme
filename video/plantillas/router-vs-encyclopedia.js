/* router-vs-encyclopedia · vídeo 06 · un fichero de entrada corto que enlaza al detalle frente a uno que solo crece.
   Datos: kicker, title, router = { name, size, rulesLabel, rules (2–5 líneas), links[] (2–3) }, docs = { label, note }, encyclopedia = { label, lines (12–20), why, whyAt[] (1–3 índices) }.
   Pasos: 1 fichero, 2 tamaño, 3 reglas, 4 enlaces y documentos, 5 enciclopedia, 6 «¿por qué?». */
TPL['router-vs-encyclopedia'] = {
  def: {
    kicker: 'El fichero de entrada', title: 'Un router, [[no una enciclopedia]]',
    router: { name: 'AGENTS.md', size: '50–200 líneas', rulesLabel: '≤ 15 reglas duras', rules: 4, links: ['→ docs/', '→ docs/', '→ docs/'] },
    docs: { label: 'docs/', note: 'el detalle, fuera' },
    encyclopedia: { label: 'una enciclopedia', lines: 18, why: '¿por qué?', whyAt: [2, 7, 12] },
  },
  html(d, H) {
    const R = d.router, E = d.encyclopedia, nL = R.links.length;
    const ruleY = k => 490 + k * 40, linkY = k => 708 + k * 60;
    const W = [86, 70, 92, 64, 78];
    const rules = Array.from({ length: R.rules }, (_, k) => `<div class="abs" style="left:300px;top:${ruleY(k)}px;width:${W[k % 5] * 3.1}px;height:18px;border-radius:6px;background:rgba(96,165,250,.55)"></div><div class="abs" style="left:272px;top:${ruleY(k) + 3}px;width:12px;height:12px;border-radius:50%;background:var(--cyan)"></div>`).join('');
    const links = R.links.map((l, k) => `<div class="abs mono cy" style="left:272px;top:${linkY(k)}px;font-size:26px">${H.esc(l)}</div>`).join('');
    const docY = k => 340 + k * (nL > 2 ? 190 : 260);
    const docs = R.links.map((_, k) => `<div class="g r" data-i="4" style="left:770px;top:${docY(k)}px;width:300px;height:160px;padding:24px 28px"><div class="mono" style="font-size:24px;color:var(--pale)">${H.esc(d.docs.label)}</div>
${[90, 76, 60].map(w => `<i style="display:block;height:12px;border-radius:5px;background:rgba(148,163,184,.35);margin-top:11px;width:${w}%"></i>`).join('')}</div>`).join('');
    const paths = R.links.map((_, k) => { const y0 = linkY(k) + 16, y1 = docY(k) + 80; return `<path class="draw" data-i="4" d="M460 ${y0} C620 ${y0} 610 ${y1} 770 ${y1}"/>`; }).join('');
    const lineW = k => [88, 72, 95, 64, 80, 91, 58, 84, 76, 93, 68, 87][k % 12];
    const encl = Array.from({ length: E.lines }, (_, k) => `<i style="display:block;height:12px;border-radius:5px;background:rgba(148,163,184,${(0.42 - k * 0.012).toFixed(3)});margin-top:${k ? 14 : 22}px;width:${lineW(k) * 0.64}%"></i>`).join('');
    const whys = E.whyAt.map(k => `<div class="abs r" data-i="6" style="left:1600px;top:${418 + k * 26 - 26}px"><span class="chip" style="font-size:22px;color:var(--amber);border-color:var(--amber);background:rgba(15,23,42,.9)">${H.esc(E.why)}</span></div>`).join('');
    return `${H.HEAD(d)}
<div class="g lit r" data-i="1" style="left:230px;top:340px;width:420px;height:560px;padding:24px 30px"><div class="mono cy" style="font-size:28px;font-weight:700">${H.esc(R.name)}</div></div>
<div class="r" data-i="3"><div class="abs k" style="left:272px;top:440px;font-size:22px">${H.A(R.rulesLabel)}</div>${rules}</div>
<div class="r" data-i="4"><div class="abs k" style="left:272px;top:660px;font-size:22px">enlaces</div>${links}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${paths}
<path class="draw" data-i="2" d="M200 340 V900 M188 340 H212 M188 900 H212" stroke-width="3"/></svg>
<div class="abs r" data-i="2" style="left:230px;top:920px;width:420px;text-align:center"><span class="pill">${H.A(R.size)}</span></div>
${docs}
<div class="abs s r" data-i="4" style="left:770px;top:${docY(nL - 1) + 176}px;width:300px;font-size:24px;text-align:center">${H.A(d.docs.note)}</div>
<div class="abs r" data-i="5" style="left:1180px;top:300px;width:1px;height:680px;background:var(--line)"></div>
<div class="g r" data-i="5" style="left:1240px;top:340px;width:560px;height:640px;padding:24px 30px;overflow:hidden;-webkit-mask-image:linear-gradient(#000 70%,transparent);mask-image:linear-gradient(#000 70%,transparent)"><div class="k">${H.A(E.label)}</div>${encl}</div>
${whys}`;
  },
};
