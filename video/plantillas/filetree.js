/* filetree · árbol de ficheros con estado (creado/modificado/borrado) y resumen. Cada línea con `st` entra en un paso, en orden.
   Datos: kicker, title, tree[] = { text (con ├─ │ └─), st?: 'new'|'mod'|'del' }, tags, sum (título del resumen) y forms (singular, plural). Hasta ~9 líneas. */
TPL.filetree = {
  def: {
    kicker: 'Cambios', title: 'Lo que [[ha tocado]] el agente', sum: 'Resumen',
    tags: { new: '+ creado', mod: '~ modificado', del: '− borrado' },
    forms: { new: ['creado', 'creados'], mod: ['modificado', 'modificados'], del: ['borrado', 'borrados'] },
    tree: [
      { text: 'proyecto/' }, { text: '├─ src/' },
      { text: '│  ├─ app.py', st: 'mod' }, { text: '│  └─ nuevo.py', st: 'new' },
      { text: '├─ tests/' }, { text: '│  └─ test_app.py', st: 'new' }, { text: '└─ viejo.py', st: 'del' },
    ],
  },
  html(d, H) {
    const cls = { new: 'ok', mod: 'am', del: 'bad' };
    const len = s => [...s].length;
    const col = Math.max(0, ...d.tree.filter(l => l.st).map(l => len(l.text))) + 3;
    let n = 0; const cnt = { new: 0, mod: 0, del: 0 };
    const lines = d.tree.map(l => {
      if (!l.st) return `<div>${H.esc(l.text)}</div>`;
      cnt[l.st]++; n++;
      return `<div class="r" data-i="${n}" style="position:relative">${H.esc(l.text)}<span class="${cls[l.st]}" style="position:absolute;left:${col}ch;white-space:nowrap">${H.esc(d.tags[l.st])}</span></div>`;
    }).join('');
    const sum = ['new', 'mod', 'del'].filter(k => cnt[k]).map(k => `<span class="${cls[k]}">${cnt[k]}</span> ${H.esc(d.forms[k][cnt[k] === 1 ? 0 : 1])}`).join('<br>');
    return `${H.HEAD(d)}
<div class="g" style="left:120px;top:340px;width:1100px;height:590px"><div class="mono" style="font-size:34px;line-height:1.95;color:var(--pale)">${lines}</div></div>
<div class="g lit r" data-i="${n + 1}" style="left:1300px;top:340px;width:500px;height:300px"><div class="k">${H.esc(d.sum)}</div><div class="t" style="margin-top:20px;line-height:1.5">${sum}</div></div>`;
  },
};
