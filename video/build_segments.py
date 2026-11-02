# guion.md (apartado «## Locución») → segments.json (un segmento por párrafo; pausa larga al cerrar
# capítulo) y capitulos.json con los títulos «### N · Título» del guion. Desde work/:
#   python3 build_segments.py
import re, json, os

loc = open(os.path.join('..', 'guion.md')).read().split('## Locución', 1)[1]
segs, tit = [], {}
ch, n, arrancado = 0, 0, False
for b in (x.strip() for x in re.split(r'\n\s*\n', loc)):
    if not b or b.startswith('## '):
        continue
    if b.startswith('### '):
        arrancado = True          # lo anterior al primer capítulo son notas para quien escribe
    m = re.match(r'### (?:(\d+) · (.+)|Apertura)', b)
    if m:
        ch = int(m.group(1) or 0)
        n = 0
        if m.group(2):
            tit[ch] = m.group(2).strip()
        continue
    # las notas de pantalla («[EN PANTALLA: …]», «[Pantalla: …]») van en línea propia y no se narran: se quitan esas
    # líneas sin perder el párrafo que pueda ir pegado a ellas
    b = '\n'.join(l for l in b.split('\n') if not l.strip().startswith('[')).strip()
    if not arrancado or not b or b.startswith('```') or b.startswith('|'):
        continue          # comandos de terminal y tablas: no se narran
    n += 1
    segs.append({'id': f'c{ch}-{n:02d}', 'ch': ch, 'gap': 1.0, 'text': ' '.join(b.split())})
for i, s in enumerate(segs):
    if i + 1 == len(segs) or segs[i + 1]['ch'] != s['ch']:
        s['gap'] = 1.6    # respiración al cambiar de capítulo

for s in segs:
    w = len(s['text'].split())
    if not 20 <= w <= 130:
        print('longitud', s['id'], w)
print(len(segs), 'segmentos,', sum(len(s['text'].split()) for s in segs), 'palabras')
json.dump(segs, open('segments.json', 'w'), ensure_ascii=False, indent=1)
json.dump({str(k): v for k, v in sorted(tit.items())}, open('capitulos.json', 'w'), ensure_ascii=False, indent=1)