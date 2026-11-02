"""Genera shots.js a partir de shots.fuente.js: cada HL('captura', 'frase') se cambia por el recuadro [x, y, ancho, alto]
que midieron capturar_docs.mjs, capturar_dashboard.mjs o render_terminal.mjs (caps_clean/<captura>.hl.json).
Así los resaltados salen del texto real de cada captura y no de coordenadas copiadas a mano.
uso: python3 build_shots.py"""
import json, re, sys
from pathlib import Path

here = Path(__file__).parent
src = (here / 'shots.fuente.js').read_text()
falta = []


def caja(m):
    lit = m.group(2) if m.group(2) is not None else m.group(3)   # literal JS entre comillas simples o dobles
    cap, frase = m.group(1), lit.replace("\\'", "'").replace('\\"', '"').replace('\\\\', '\\')
    hl = json.loads((here / 'caps_clean' / f'{cap}.hl.json').read_text())
    for h in hl:
        if h['p'] == frase and not h.get('miss'):
            return json.dumps(h['box'])
    falta.append(f'{cap}: «{frase}»'); return '[0, 0, 10, 10]'


out = re.sub(r"""HL\('([^']+)',\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\)""", caja, src)
if falta:
    sys.exit('Recuadros sin medir (añádelos a la especificación de la captura):\n  ' + '\n  '.join(falta))
(here / 'shots.js').write_text('// GENERADO por build_shots.py desde shots.fuente.js: edita la fuente, no este fichero.\n' + out)
print('shots.js generado')
