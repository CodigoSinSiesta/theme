/* stdin-prepend · vídeo 10 · lo que llega por la tubería se antepone a la primera petición: el comando por partes, entrada
   estándar y petición por separado, y el mensaje al modelo con el diff delante. Datos: kicker, title, cmd = { src, run, ask },
   stdin = { label, file, lines[] = { t, kind: 'del'|'add' } } (1–3 líneas), ask = { label }, msg = { label, first, second }.
   Pasos: 1 entrada estándar, 2 orden en la petición, 3 git diff master |, 4 pi -p, 5 la petición, 6 el diff entra delante. */
TPL['stdin-prepend'] = {
  def: {
    kicker: 'Lo que entra', title: 'La tubería va [[delante de tu petición]]',
    cmd: { src: 'git diff master |', run: 'pi -p --no-session --tools read,grep,find,ls', ask: '"Revisa este cambio en tres viñetas cortas."' },
    stdin: { label: 'entrada estándar · tubería', file: 'src/envio.js',
      lines: [{ t: '-const LIMITE_GRATIS = 40;', kind: 'del' }, { t: '+const LIMITE_GRATIS = 50;', kind: 'add' }] },
    ask: { label: 'tu petición · pi -p' },
    msg: { label: 'primera petición al modelo', first: '1 · lo que llega por la tubería', second: '2 · tu petición' },
  },
  html(d, H) {
    const askText = d.cmd.ask.replace(/^"|"$/g, '');
    const diff = (i, extra = '') => `<div class="r" data-i="${i}" style="${extra}"><div class="k">${H.esc(d.stdin.file)}</div>${d.stdin.lines.map(l => `<div class="mono ${l.kind === 'del' ? 'bad' : 'ok'}" style="font-size:26px;margin-top:10px;white-space:pre">${H.esc(l.t)}</div>`).join('')}</div>`;
    const ask = (i, extra = '') => `<div class="r s" data-i="${i}" style="font-size:30px;color:var(--ink);${extra}">«${H.esc(askText)}»</div>`;
    const slot = (y, label, inner) => `<div class="abs" style="left:1030px;top:${y}px;width:740px;height:220px;border-radius:14px;border:2px dashed var(--line);padding:22px 26px"><div class="k cy">${H.esc(label)}</div>${inner}</div>`;
    return `${H.HEAD(d)}
<div class="g r flex" data-i="3" style="left:120px;top:296px;width:1680px;height:84px;padding:0 28px;white-space:pre;font-family:var(--mono);font-size:24px"><span class="am">${H.esc(d.cmd.src)}&nbsp;</span><span class="r" data-i="4">${H.esc(d.cmd.run)}&nbsp;</span><span class="r ok" data-i="5">${H.esc(d.cmd.ask)}</span></div>
<div class="g r" data-i="1" style="left:120px;top:410px;width:760px;height:270px"><div class="k">${H.esc(d.stdin.label)}</div>${diff(3, 'margin-top:22px')}</div>
<div class="g r" data-i="2" style="left:120px;top:710px;width:760px;height:270px"><div class="k">${H.esc(d.ask.label)}</div>${ask(5, 'margin-top:28px')}</div>
<div class="g r" data-i="2" style="left:1000px;top:410px;width:800px;height:570px"><div class="k">${H.esc(d.msg.label)}</div></div>
<div class="r" data-i="2">${slot(484, d.msg.first, diff(6, 'margin-top:20px'))}${slot(734, d.msg.second, ask(6, 'margin-top:26px'))}</div>
<div class="abs r" data-i="6" style="left:1000px;top:410px;width:800px;height:570px;border-radius:22px;border:2px solid var(--cyan);box-shadow:0 0 50px rgba(96,165,250,.35)"></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M882 545 C950 545 960 594 1020 594"/><path class="draw" data-i="2" d="M1008 583 L1022 594 L1008 605"/>
<path class="draw" data-i="2" d="M882 845 C950 845 960 844 1020 844"/><path class="draw" data-i="2" d="M1008 833 L1022 844 L1008 855"/></svg>`;
  },
};
