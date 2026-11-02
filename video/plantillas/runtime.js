/* Runtime de las plantillas de plano (tipo `tpl`). Lo usan pildora.html y la galería (motor/prototipo-plantillas).
   Una plantilla es un módulo `TPL.<nombre> = { def, steps, html(d, H) }` (ver LEEME.md de esta carpeta).
   El runtime la monta y la anima con una función pura del tiempo local `lt`, así que seek(t) es determinista.

   Convenciones del marcado (las mismas que la galería):
     .r            entra con fundido y subida (opacity + translateY); el paso lo da data-i
     data-i="N"    paso N (1…steps). Sin data-i = paso 0 = visible desde el principio del plano
     data-off="N"  el elemento se va (fundido hacia arriba) cuando entra el paso N
     .draw         trazo SVG que se dibuja (usa getTotalLength; --len ya no hace falta)
     .bx           barra que crece desde la izquierda (scaleX 0→1)
     data-c="N"    número que cuenta de 0 a N cuando entra el paso del elemento (o su ancestro con data-i)
     data-orbit="cx,cy,r,s"  testigo que gira alrededor de (cx,cy) con radio r y una vuelta cada s segundos
   Paso N entra en la palabra beats[N-1] del guion (si falta, se reparte por la duración del plano). */
(function () {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, p) => a + (b - a) * p;
  const P = (t, a, d) => clamp((t - a) / d);
  const eOut = p => 1 - Math.pow(1 - p, 3);
  const eIn = p => p * p;

  const TPLRT = window.TPLRT = { base: 'logos/herramientas/' };   // la galería pone '../logos/herramientas/'
  window.TPL = window.TPL || {};

  /* ---- ayudas para las plantillas ---- */
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // texto de usuario: escapa y admite [[acento]] (degradado) y `código` (mono)
  const A = s => esc(s == null ? '' : s).replace(/\[\[(.+?)\]\]/g, '<em>$1</em>').replace(/`(.+?)`/g, '<span class="mono">$1</span>');
  // [carpeta, fichero, self]: self = el SVG ya trae su propia ficha (sin fondo hueso)
  const LOGOS = {
    hermes: ['hermes', 'hermes.svg'], claude: ['claude', 'claude.svg'], 'claude-code': ['claude-code', 'claude-code.svg'],
    codex: ['codex', 'codex.svg', 1], pi: ['pi', 'pi.svg'], opencode: ['opencode', 'opencode.svg'], 'gemini-cli': ['gemini-cli', 'gemini-cli.svg'],
    mcp: ['mcp', 'mcp.svg'], omp: ['oh-my-pi', 'oh-my-pi.svg', 1], cursor: ['cursor', 'cursor.svg'],
  };
  ['anthropic', 'openai', 'google', 'openrouter', 'ollama', 'telegram', 'discord', 'slack', 'whatsapp', 'signal', 'docker', 'modal', 'vercel',
   'github', 'notion', 'linear', 'deepseek', 'npm', 'bun', 'rust', 'git'].forEach(n => LOGOS[n] = [n, n + '.svg']);
  // logo real en su ficha: ICO('hermes', 96). Un nombre que no esté en LOGOS lanza error (así se ve en la galería).
  const ICO = (name, size = 96, extra = '') => {
    const L = LOGOS[name]; if (!L) throw new Error('logo desconocido: ' + name);
    return `<i class="ico${L[2] ? ' self' : ''}" style="--s:${size}px;${extra}"><img src="${TPLRT.base}${L[0]}/${L[1]}" alt="${name}"></i>`;
  };
  // glifo de agente del sprite: GLYPH('director', 56) · nombres: director sub tool user model file vps desktop (ordenador) terminal
  const GLYPH = (name, size = 56, cls = 'cy') => `<svg width="${size}" height="${size}" class="${cls}"><use href="#${name === 'vps' ? 'l-vps' : 'g-' + name}"/></svg>`;
  // cabecera común: eyebrow + titular (con [[acento]])
  const HEAD = d => (d.kicker ? `<div class="eb">${A(d.kicker)}</div>` : '') + (d.title ? `<div class="h">${A(d.title)}</div>` : '');
  TPLRT.H = { esc, A, ICO, GLYPH, HEAD, LOGOS };

  const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
 <symbol id="g-director" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M8 34 L12 14 L24 24 L36 14 L40 34 Z"/><path d="M8 40 H40"/></g></symbol>
 <symbol id="g-sub" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3"><circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="4" fill="currentColor"/></g></symbol>
 <symbol id="g-tool" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M24 6 L39 15 V33 L24 42 L9 33 V15 Z"/><path d="M17 24 H31"/></g></symbol>
 <symbol id="g-user" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="24" cy="16" r="8"/><path d="M8 42 C8 30 40 30 40 42"/></g></symbol>
 <symbol id="g-model" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M24 5 L43 24 L24 43 L5 24 Z"/><path d="M24 15 L33 24 L24 33 L15 24 Z"/></g></symbol>
 <symbol id="g-file" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M12 5 H28 L38 15 V43 H12 Z"/><path d="M28 5 V15 H38"/></g></symbol>
 <symbol id="g-desktop" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><rect x="6" y="8" width="36" height="24" rx="3"/><path d="M24 32 V39"/><path d="M15 40 H33"/></g></symbol>
<symbol id="g-terminal" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><rect x="5" y="8" width="38" height="32" rx="4"/><path d="M13 19 L19 24 L13 29"/><path d="M23 30 H33"/></g></symbol>
<symbol id="l-vps" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"><rect x="6" y="8" width="36" height="12" rx="3"/><rect x="6" y="28" width="36" height="12" rx="3"/><circle cx="13" cy="14" r="1.5" fill="currentColor"/><circle cx="13" cy="34" r="1.5" fill="currentColor"/></g></symbol>
</defs></svg>`;
  let spriteIn = false;
  const ensureSprite = () => { if (spriteIn) return; spriteIn = true; const d = document.createElement('div'); d.innerHTML = SPRITE; document.body.appendChild(d.firstChild); };

  const merge = (a, b) => {
    if (b === undefined) return a;
    if (Array.isArray(b) || b === null || typeof b !== 'object') return b;
    const o = { ...(a && typeof a === 'object' && !Array.isArray(a) ? a : {}) };
    for (const k in b) o[k] = merge(o[k], b[k]);
    return o;
  };

  /* ---- montaje ---- */
  // mount(root, nombre, datos) → { steps, update(lt, D, at) }
  //   at(i) → segundo local en que entra el paso i (1…steps) o undefined (= reparto por defecto)
  TPLRT.mount = function (root, name, data) {
    const T = window.TPL[name]; if (!T) throw new Error('plantilla desconocida: ' + name);
    ensureSprite();
    const d = merge(T.def || {}, data || {});
    const box = document.createElement('div'); box.className = 'tpl'; box.innerHTML = T.html(d, TPLRT.H); root.appendChild(box);
    const q = sel => [...box.querySelectorAll(sel)];
    const stepOf = e => { const a = e.closest('[data-i]'); return a ? +a.dataset.i : 0; };
    const steps = Math.max(T.steps || 0, ...q('[data-i]').map(e => +e.dataset.i), ...q('[data-off]').map(e => +e.dataset.off), 0);
    const R = q('.r'), DR = q('.draw'), BX = q('.bx'), CT = q('[data-c]'), OR = q('[data-orbit]');
    // la longitud de cada trazo se mide en el primer fotograma: al montar, el plano puede no estar aún en el documento
    const measure = e => { let L = 0; try { L = e.getTotalLength(); } catch (_) {} e._len = L || 600; e.style.strokeDasharray = e._len; };
    OR.forEach(e => { e._o = e.dataset.orbit.split(',').map(Number); });
    CT.forEach(e => { e._to = +e.dataset.c; });

    function update(lt, D, at) {
      const gap = Math.max(0.5, (D - 2.2) / Math.max(1, steps));
      const A0 = i => { if (i <= 0) return 0.25; const v = at ? at(i) : undefined; return v !== undefined ? v : 0.9 + (i - 1) * gap; };
      R.forEach(e => {
        const a = A0(+e.dataset.i || 0), pin = P(lt, a, 0.35), pos = P(lt, a, 0.6);
        let op = pin, dy = lerp(34, 0, eOut(pos));
        if (e.dataset.off) { const po = P(lt, A0(+e.dataset.off), 0.45); op *= 1 - po; dy -= 24 * eIn(po); }
        e.style.opacity = op;
        if (!(e instanceof SVGElement)) e.style.transform = dy ? `translateY(${dy}px)` : 'none';
      });
      DR.forEach(e => { if (e._len === undefined) measure(e); const a = A0(stepOf(e)) - 0.1; e.style.strokeDashoffset = e._len * (1 - eOut(P(lt, a, 1.0))); });
      BX.forEach(e => { const a = A0(stepOf(e)); e.style.opacity = P(lt, a, 0.3); e.style.transform = `scaleX(${eOut(P(lt, a, 0.8))})`; });
      CT.forEach(e => { e.textContent = Math.round(e._to * eOut(P(lt, A0(stepOf(e)), 1.2))); });
      OR.forEach(e => { const [cx, cy, r, s] = e._o, w = 2 * Math.PI * lt / s; e.setAttribute('transform', `translate(${cx + r * Math.sin(w)} ${cy - r * Math.cos(w)})`); });
    }
    return { steps, update, el: box };
  };
})();
