/* model-rotation · vídeo 04 · rotar entre unos pocos modelos (anillo con testigos adelante y atrás) frente a la rejilla de todos.
   Datos: kicker, title, ringLabel, models[] (2–4), next = { keys[], t }, prev = { keys[], t }, allLabel, all (nº de puntos, ≤ 408), lit[] (puntos
   iluminados), allText. Pasos: 1 anillo, 2 siguiente, 3 anterior, 4 rejilla, 5 cifra. */
TPL['model-rotation'] = {
  def: {
    kicker: 'Rotar entre modelos', title: 'Rotar entre tres, [[no entre todos]]',
    ringLabel: 'dos o tres modelos', models: ['deepseek-flash', 'deepseek-v4-pro', 'llama3.2:latest'],
    next: { keys: ['Ctrl', 'P'], t: 'siguiente' }, prev: { keys: ['Shift', 'Ctrl', 'P'], t: 'anterior' },
    allLabel: 'todos los disponibles', all: 408, lit: [37, 210, 333], allText: 'modelos en nuestra instalación',
  },
  html(d, H) {
    const n = d.models.length, cx = 520, cy = 622, R = 180;
    const pos = i => { const a = (-90 + i * 360 / n) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; };
    const chips = d.models.map((m, i) => { const [x, y] = pos(i); return `<div class="g lit" style="left:${Math.round(x - 135)}px;top:${Math.round(y - 36)}px;width:270px;height:72px;padding:0;display:grid;place-items:center"><span class="mono" style="font-size:24px">${H.esc(m)}</span></div>`; }).join('');
    const kc = k => `<span class="kc" style="font-size:24px;padding:17px 22px;border-bottom-width:6px">${H.esc(k)}</span>`;
    const cols = 24, pitch = 26, gx = 1000 + (800 - cols * pitch) / 2 + 5;
    const dots = Array.from({ length: d.all }, (_, i) => `<i style="position:absolute;left:${gx + (i % cols) * pitch}px;top:${392 + Math.floor(i / cols) * pitch}px;width:16px;height:16px;border-radius:50%;${d.lit.includes(i) ? 'background:var(--cyan);box-shadow:0 0 12px var(--cyan)' : 'background:rgba(148,163,184,.28)'}"></i>`).join('');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:320px;width:800px;height:660px"><div class="k">${H.A(d.ringLabel)}</div></div>
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">
<circle class="draw" data-i="2" cx="${cx}" cy="${cy}" r="${R}"/>
<circle class="r" data-i="2" r="13" fill="#60a5fa" stroke="none" data-orbit="${cx},${cy},${R},5"/>
<circle class="r" data-i="3" r="13" fill="#fbbf24" stroke="none" data-orbit="${cx},${cy},${R},-5"/></svg>
<div class="r" data-i="1">${chips}</div>
<div class="abs flex r" data-i="2" style="left:160px;top:812px;gap:10px">${d.next.keys.map(kc).join('')}<span class="s" style="font-size:26px;margin-left:8px">${H.A(d.next.t)}</span></div>
<div class="abs flex r" data-i="3" style="left:160px;top:892px;gap:10px">${d.prev.keys.map(kc).join('')}<span class="s am" style="font-size:26px;margin-left:8px">${H.A(d.prev.t)}</span></div>
<div class="g r" data-i="4" style="left:1000px;top:320px;width:800px;height:660px"><div class="k">${H.A(d.allLabel)}</div></div>
<div class="r" data-i="4">${dots}</div>
<div class="abs flex r" data-i="5" style="left:1088px;top:868px;gap:22px"><span class="t cy" style="font-size:72px" data-c="${+d.all}">0</span><span class="s" style="font-size:28px">${H.A(d.allText)}</span></div>`;
  },
};
