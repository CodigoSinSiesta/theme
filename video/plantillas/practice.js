/* practice · tarjeta de la práctica: objetivo, pasos y criterio de «listo». Pasos: 1 objetivo, 2 pasos, 3 listo.
   Datos: kicker, title, goalLabel, goal, stepsLabel, steps[] (2–4; admiten `código`), doneLabel, done (admite `código`). */
TPL.practice = {
  def: {
    kicker: 'Práctica', title: 'Ahora te toca [[a ti]]',
    goalLabel: 'objetivo', goal: 'Haz que Pi corrija un test que falla',
    stepsLabel: 'pasos',
    steps: ['Abre Pi en el repo de prueba', 'Pídele que ejecute `npm test`', 'Corrige con Enter mientras trabaja'],
    doneLabel: 'listo cuando', done: 'el test pasa y el cambio cabe en un commit',
  },
  html(d, H) {
    const steps = d.steps.map((s, i) => `<span class="cy mono">${i + 1}</span> ${H.A(s)}`).join('<br>');
    return `${H.HEAD(d)}
<div class="g r" data-i="1" style="left:120px;top:340px;width:560px;height:560px"><div class="k cy">${H.esc(d.goalLabel)}</div><div class="t" style="font-size:40px;margin-top:20px;line-height:1.3">${H.A(d.goal)}</div></div>
<div class="g r" data-i="2" style="left:720px;top:340px;width:1080px;height:340px"><div class="k">${H.esc(d.stepsLabel)}</div><div class="s" style="line-height:2;margin-top:12px">${steps}</div></div>
<div class="g lit r" data-i="3" style="left:720px;top:710px;width:1080px;height:190px"><div class="k ok">${H.esc(d.doneLabel)}</div><div class="s" style="margin-top:12px"><span class="ok">☑</span> ${H.A(d.done)}</div></div>`;
  },
};
