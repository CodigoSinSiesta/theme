/* import-redirect · vídeo 20 · antes de ejecutar un módulo de Pi, oh my pi reescribe sus imports hacia sus propias
   copias y acepta el manifiesto del paquete. Datos: kicker, title, module = { k, lines[] (texto con [[paquete]] en ámbar) },
   targets[2] = { k, name } (copia del paquete de Pi y TypeBox), verb, pkg = { k, line, ok }. Pasos: 1 módulo, 2 primer import
   reescrito, 3 TypeBox redirigido, 4 package.json aceptado. */
TPL['import-redirect'] = {
  def: {
    kicker: 'Por qué pueden funcionar', title: 'Los imports de Pi, [[hacia sus copias]]',
    module: { k: 'tests.ts · vídeo 08 · antes de ejecutarlo', lines: ['import type { ExtensionAPI }', '  from "[[@earendil-works/pi-coding-agent]]";', 'import { Type } from "[[typebox]]";'] },
    targets: [{ k: 'su propia copia', name: '@oh-my-pi/pi-coding-agent' }, { k: 'una versión compatible', name: 'typebox' }],
    verb: 'reescribe',
    pkg: { k: 'package.json · vídeo 09', line: '"pi": { "extensions": ["./hola.ts", "./tests.ts", "./permisos.ts"] }', ok: 'acepta el manifiesto pi.extensions' },
  },
  html(d, H) {
    const amb = s => H.esc(s).replace(/\[\[(.+?)\]\]/g, '<span class="am">$1</span>');
    const code = d.module.lines.map(l => `<div style="white-space:pre;height:46px">${amb(l)}</div>`).join('');
    const T = d.targets, ty = [330, 480], th = 124;
    const box = (t, i) => `<div class="g${i ? '' : ' lit'} r" data-i="${i + 2}" style="left:1140px;top:${ty[i]}px;width:660px;height:${th}px;padding:24px 32px"><div class="k">${H.A(t.k)}</div><div class="mono cy" style="font-size:28px;margin-top:12px">${H.esc(t.name)}</div></div>`;
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:330px;width:780px;height:274px"><div class="k">${H.A(d.module.k)}</div><div class="mono" style="font-size:26px;margin-top:22px;color:var(--pale)">${code}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<path class="draw" data-i="2" d="M900 475 C1010 475 1030 ${ty[0] + th / 2} 1140 ${ty[0] + th / 2}"/><path class="draw" data-i="3" d="M900 521 C1010 521 1030 ${ty[1] + th / 2} 1140 ${ty[1] + th / 2}"/></svg>
<div class="abs r" data-i="2" style="left:940px;top:330px;width:180px;text-align:center"><span class="pill">${H.esc(d.verb)}</span></div>
${T.map(box).join('')}
<div class="g r" data-i="4" style="left:120px;top:680px;width:1680px;height:230px"><div class="k">${H.A(d.pkg.k)}</div><div class="mono" style="font-size:28px;margin-top:22px;white-space:pre">${H.esc(d.pkg.line)}</div>
<div class="flex" style="margin-top:22px;gap:14px">${H.GLYPH('check-circle', 34, 'ok')}<span class="s" style="color:var(--ink)">${H.A(d.pkg.ok)}</span></div></div>`;
  },
};
