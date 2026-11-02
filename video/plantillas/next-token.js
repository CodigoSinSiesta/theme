/* next-token · el modelo completa texto pieza a pieza: candidatas con su barra de probabilidad, gana una y se pega al final.
   Datos: kicker, title, prefix, rounds[] = { cands[] = { t, p (0–1) }, pick (índice) }, chip (opcional, entra al final), note.
   Dos pasos por vuelta (candidatas · gana y se pega). 1–3 vueltas, 2–4 candidatas de hasta ~10 caracteres. Sin cifras: solo barras. */
TPL['next-token'] = {
  def: {
    kicker: 'Siguiente pieza', title: 'Completa el texto [[pieza a pieza]]',
    prefix: 'function suma(a, b) { return',
    rounds: [
      { cands: [{ t: ' a', p: 0.72 }, { t: ' (', p: 0.18 }, { t: ' b', p: 0.10 }], pick: 0 },
      { cands: [{ t: ' +', p: 0.86 }, { t: ' *', p: 0.08 }, { t: ';', p: 0.06 }], pick: 0 },
      { cands: [{ t: ' b', p: 0.93 }, { t: ' 1', p: 0.05 }, { t: ' a', p: 0.02 }], pick: 0 },
    ],
    chip: '', note: 'Cada vuelta, el texto entero vuelve a entrar con la pieza nueva',
  },
  html(d, H) {
    const R = d.rounds, n = R.length, X = 460, BAR = 860, nc = Math.max(...R.map(r => r.cands.length));
    // El texto: el prefijo, visible desde el principio, y cada pieza ganadora que entra en el paso par de su vuelta.
    let out = H.HEAD(d) + `<div class="g abs" style="left:120px;top:300px;width:1680px;height:130px;padding:0 44px;display:flex;align-items:center">`
      + `<span class="mono" style="font-size:46px;white-space:pre;color:var(--ink)">${H.esc(d.prefix)}</span>`
      + R.map((r, k) => `<span class="mono r" data-i="${2 * k + 2}" style="font-size:46px;white-space:pre;color:var(--cyan);font-weight:700">${H.esc(r.cands[r.pick].t)}</span>`).join('')
      + `</div>`;
    // Las candidatas de cada vuelta ocupan la misma zona: un bloque por vuelta que entra en el paso impar y se va
    // (data-off) cuando entran las de la vuelta siguiente. Las barras van dentro porque .bx no admite data-off.
    R.forEach((r, k) => {
      const ini = 2 * k + 1, fin = k < n - 1 ? ` data-off="${2 * k + 3}"` : '';
      out += `<div class="abs r" data-i="${ini}"${fin} style="left:0;top:0;width:1920px;height:1080px">`
        + `<div class="abs k" style="left:${X}px;top:480px">Candidatas para la pieza ${k + 1}</div>`;
      r.cands.forEach((c, j) => {
        const y = 540 + j * 100, w = Math.max(40, Math.round(c.p * BAR)), win = j === r.pick;
        out += `<div class="abs mono" style="left:120px;top:${y}px;width:${X - 150}px;text-align:right;overflow:hidden;font-size:40px;line-height:70px;white-space:pre;color:var(--sky)">${H.esc(c.t.trim() || '␣')}</div>`
          + `<i class="bx" data-i="${ini}" style="position:absolute;left:${X}px;top:${y + 8}px;width:${w}px;height:54px;border-radius:10px;background:${win ? 'var(--cyan)' : 'rgba(148,163,184,.45)'}"></i>`;
        if (win) out += `<div class="abs r" data-i="${ini + 1}" style="left:${X - 14}px;top:${y - 6}px;width:${BAR + 300}px;height:82px;border:2px solid var(--cyan);border-radius:16px;box-shadow:0 0 40px rgba(96,165,250,.35)"></div>`
          + `<div class="abs mono r" data-i="${ini + 1}" style="left:${X + w + 30}px;top:${y}px;font-size:28px;line-height:70px;color:var(--cyan);font-weight:700">elegida</div>`;
      });
      out += `</div>`;
    });
    const last = 2 * n, yNote = 540 + nc * 100 + 30;
    if (d.chip) out += `<div class="abs r" data-i="${last + 1}" style="left:${120 + 1680 - 420}px;top:470px;width:420px;text-align:right"><span class="pill">${H.esc(d.chip)}</span></div>`;
    return out + `<div class="abs s r" data-i="${d.chip ? last + 1 : last}" style="left:120px;top:${yNote}px;width:1680px;font-size:28px">${H.esc(d.note)}</div>`;
  },
};
