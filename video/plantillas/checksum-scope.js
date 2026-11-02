/* checksum-scope · vídeo 20 · lo que garantiza la huella de un paquete y lo que no: el paquete publicado y el instalado
   son idénticos, pero nadie ha revisado lo que llevan dentro. Datos: kicker, title, from, to, items[2] = { name, icon }, hash,
   yes, no, risks[2] = { icon, text } (uno por item, en el mismo orden), read. Pasos: 1 huella que coincide, 2 lo que no garantiza,
   3 primer item (texto que sigue el modelo), 4 segundo item (scripts con tus permisos), 5 léelo antes. */
TPL['checksum-scope'] = {
  def: {
    kicker: 'Lo que no hace', title: 'La huella no [[revisa el contenido]]',
    from: 'publicado · skills.omp.sh', to: 'instalado · tu proyecto',
    items: [{ name: 'SKILL.md', icon: 'document-text' }, { name: 'scripts/', icon: 'folder' }],
    hash: 'huella sha512', yes: 'recibes lo que se publicó', no: 'no dice si es inofensivo',
    risks: [{ icon: 'cpu-chip', text: 'texto de otra persona que [[tu modelo va a seguir]]' }, { icon: 'command-line', text: 'scripts que puede ejecutar [[con tus permisos]]' }],
    read: 'Léelo antes, como leerías un script de instalación.',
  },
  html(d, H) {
    const pkg = (x, k, lit) => `<div class="g${lit ? ' lit' : ''}" style="left:${x}px;top:330px;width:500px;height:290px"><div class="k">${H.A(k)}</div>${d.items.map(it => `<div class="abs flex" style="left:30px;width:436px;top:${it === d.items[0] ? 96 : 182}px;height:72px;border-radius:12px;background:rgba(15,23,42,.6);border:1.5px solid var(--line);padding:0 24px;gap:16px">${H.GLYPH(it.icon, 32)}<span class="mono" style="font-size:28px">${H.esc(it.name)}</span></div>`).join('')}</div>`;
    const risk = (r, i) => { const x = 120 + i * 860, it = d.items[i];
      return `<div class="g r" data-i="${i + 3}" style="left:${x}px;top:680px;width:820px;height:150px;padding:0 32px;display:flex;align-items:center;gap:20px">${H.GLYPH(it.icon, 36)}<span class="mono" style="font-size:26px;width:170px">${H.esc(it.name)}</span><span class="t cy" style="font-size:34px">→</span>${H.GLYPH(r.icon, 40)}<span class="s" style="font-size:27px;color:var(--ink);line-height:1.3">${H.A(r.text)}</span></div>`; };
    return `${H.HEAD(d)}
<div class="r" data-i="1">${pkg(120, d.from)}${pkg(1300, d.to, true)}</div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3"><line class="draw" data-i="1" x1="620" y1="440" x2="1300" y2="440"/></svg>
<div class="abs r flex" data-i="1" style="left:700px;top:350px;width:520px;justify-content:center;gap:14px">${H.GLYPH('finger-print', 40)}<span class="k cy">${H.esc(d.hash)}</span></div>
<div class="abs r flex" data-i="1" style="left:700px;top:470px;width:520px;justify-content:center;gap:14px">${H.GLYPH('check-circle', 34, 'ok')}<span class="s" style="font-size:28px;color:var(--ink)">${H.A(d.yes)}</span></div>
<div class="abs r flex" data-i="2" style="left:700px;top:540px;width:520px;justify-content:center;gap:14px">${H.GLYPH('exclamation-triangle', 34, 'am')}<span class="s am" style="font-size:28px">${H.A(d.no)}</span></div>
${d.risks.map(risk).join('')}
<div class="g lit r flex" data-i="5" style="left:120px;top:870px;width:1680px;height:96px;padding:0 34px;gap:18px">${H.GLYPH('eye', 38)}<span class="s" style="font-size:30px;color:var(--ink)">${H.A(d.read)}</span></div>`;
  },
};
