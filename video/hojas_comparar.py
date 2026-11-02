# Hojas antes/después a partir de comparar/indice.json (lo deja comparar.mjs). Uso, desde work/:
#   /usr/bin/python3 hojas_comparar.py [filas_por_hoja=3]
# Cada fila: el párrafo y su texto, el plano actual a la izquierda y la propuesta a la derecha.
import json, sys, textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
D = Path('comparar'); idx = json.load(open(D / 'indice.json')); per = int(sys.argv[1]) if len(sys.argv) > 1 else 3
W, H, HEAD, PAD = 900, 506, 96, 16
def font(sz, bold=False):
    for f in (['/System/Library/Fonts/Supplemental/Arial Bold.ttf'] if bold else []) + ['/System/Library/Fonts/Supplemental/Arial.ttf', '/System/Library/Fonts/Helvetica.ttc']:
        try: return ImageFont.truetype(f, sz)
        except OSError: pass
    return ImageFont.load_default()
F1, F2, F3 = font(22, True), font(17), font(16, True)
def col(files):   # varios planos en un párrafo: se apilan en vertical dentro de su celda
    ims = [Image.open(D / f['f']).convert('RGB') for f in files]
    h = H // len(ims); out = Image.new('RGB', (W, H), 'white')
    for i, im in enumerate(ims): out.paste(im.resize((int(h * 16 / 9), h)), ((W - int(h * 16 / 9)) // 2, i * h))
    return out
n = 0
for k in range(0, len(idx), per):
    rows = idx[k:k + per]
    sheet = Image.new('RGB', (W * 2 + PAD * 3, len(rows) * (H + HEAD + PAD) + PAD), 'white'); d = ImageDraw.Draw(sheet)
    for r, e in enumerate(rows):
        y = PAD + r * (H + HEAD + PAD)
        d.text((PAD, y), e['seg'], fill='#1e3a8a', font=F1)
        d.text((PAD + 90, y + 2), 'AHORA: ' + ' + '.join(x['type'] for x in e['antes']) + '   →   PROPUESTA: ' + ' + '.join(x['type'] for x in e['despues']), fill='#64748b', font=F3)
        for j, line in enumerate(textwrap.wrap(e['txt'] or '', 205)[:3]): d.text((PAD, y + 28 + j * 20), line, fill='#111', font=F2)
        sheet.paste(col(e['antes']), (PAD, y + HEAD)); sheet.paste(col(e['despues']), (PAD * 2 + W, y + HEAD))
    n += 1; sheet.save(D / f'hoja-{n:02d}.png')
print(n, 'hojas en', D)
