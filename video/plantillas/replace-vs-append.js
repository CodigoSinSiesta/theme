/* replace-vs-append · vídeo 06 · el mismo prompt de base, sustituido por tu fichero (izquierda) o con tu fichero añadido al final (derecha).
   Datos: kicker, title, base = { label, rows[] (1–3; `lit` = la fila que se pierde al sustituir) }, replace = { file, verb, lost }, append = { file, verb, keep, pick }.
   Pasos: 1 sustituir, 2 fila que se pierde, 3 aviso, 4 añadir, 5 «sin quitar nada», 6 recomendación. */
TPL['replace-vs-append'] = {
  def: {
    kicker: 'Sustituir o añadir', title: 'Reemplazar el prompt [[o añadir al final]]',
    base: { label: 'Prompt de base de Pi', rows: [{ t: 'cómo trabajar' }, { t: 'cómo usar las herramientas', lit: true }] },
    replace: { file: 'SYSTEM.md', verb: 'lo sustituye', lost: 'Las herramientas, las explicas tú' },
    append: { file: 'APPEND_SYSTEM.md', verb: 'al final', keep: 'sin quitar nada', pick: 'casi siempre, este' },
  },
  html(d, H) {
    const B = d.base, nR = B.rows.length, bh = 96 + nR * 64;
    const block = (x, extra = '') => `<div class="abs" style="left:${x}px;top:420px;width:680px;height:${bh}px;border-radius:16px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:22px 28px;${extra}"><div class="k" style="font-size:22px">${H.A(B.label)}</div>
${B.rows.map(r => `<div class="mono" style="font-size:26px;margin-top:22px;color:var(--pale)">· ${H.A(r.t)}</div>`).join('')}</div>`;
    const litK = B.rows.findIndex(r => r.lit), rowY = k => 420 + 22 + 26 + 22 + k * (26 * 1.3 + 22) - 6;
    const yourY = 420 + bh + 40;
    const your = (x, f, verb, col, i) => `<div class="abs r" data-i="${i}" style="left:${x}px;top:${yourY}px;width:680px;height:110px;border-radius:16px;background:rgba(30,58,138,.38);border:2px solid ${col};box-shadow:0 0 40px rgba(96,165,250,.25);display:flex;align-items:center;justify-content:space-between;padding:0 28px"><span class="mono t" style="font-size:32px">${H.esc(f)}</span><span class="k" style="font-size:22px;color:${col}">${H.A(verb)}</span></div>`;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:330px;width:800px;height:650px"><div class="k">${H.esc(d.replace.file)}</div></div>
<div class="r" data-i="1">${block(180, 'opacity:.55')}</div>
<svg class="abs r" data-i="1" style="left:0;top:0" width="1920" height="1080" fill="none"><path d="M200 ${420 + bh - 12} L840 432" stroke="#f87171" stroke-width="5" stroke-linecap="round"/></svg>
${your(180, d.replace.file, d.replace.verb, 'var(--cyan)', 1)}
${litK >= 0 ? `<div class="abs r" data-i="2" style="left:200px;top:${rowY(litK)}px;width:640px;height:48px;border:2.5px solid var(--amber);border-radius:10px"></div>` : ''}
<div class="abs r" data-i="3" style="left:180px;top:${yourY + 140}px;width:680px"><span class="t bad" style="font-size:32px">✕ ${H.A(d.replace.lost)}</span></div>
<div class="g r" data-i="4" style="left:1000px;top:330px;width:800px;height:650px"><div class="k">${H.esc(d.append.file)}</div></div>
<div class="r" data-i="4">${block(1060)}</div>
${your(1060, d.append.file, d.append.verb, 'var(--ok)', 4)}
<div class="abs r" data-i="5" style="left:1060px;top:${yourY + 140}px;width:680px"><span class="t ok" style="font-size:32px">✓ ${H.A(d.append.keep)}</span></div>
<div class="abs r" data-i="6" style="left:1060px;top:${yourY + 210}px;width:680px"><span class="pill" style="color:var(--cyan);border-color:var(--cyan)">${H.A(d.append.pick)}</span></div>`;
  },
};
