# Hoja de revisión de propuestas: una fila por propuesta con «antes» (último plano original del párrafo), «a mitad» y
# «después» (estado final). uso: python3 motor/hoja_propuestas.py <carpeta de la propuesta> [salida.jpg]
import json, sys, os, glob
from PIL import Image, ImageDraw, ImageFont
d = sys.argv[1]; out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(d, 'hoja.jpg')
inf = json.load(open(os.path.join(d, 'informe.json')))
W, H, PAD, TOP = 800, 450, 16, 64
def font(sz):
    for f in ('/System/Library/Fonts/Supplemental/Arial Unicode.ttf', '/System/Library/Fonts/Helvetica.ttc'):
        if os.path.exists(f): return ImageFont.truetype(f, sz)
    return ImageFont.load_default()
F, Fs = font(26), font(20)
rows = [p for p in inf if 'error' not in p]
sheet = Image.new('RGB', (PAD + 3 * (W + PAD), PAD + len(rows) * (H + TOP + PAD)), (10, 16, 32))
dr = ImageDraw.Draw(sheet)
for r, p in enumerate(rows):
    y = PAD + r * (H + TOP + PAD)
    tag = 'NUEVA · ' if p.get('tipo') == 'nueva' else ''
    dr.text((PAD, y), f"{p['id']} · {p['seg']} · {tag}{p['plantilla']}   (antes: {', '.join(p['antes'])})", fill=(147, 197, 253), font=F)
    dr.text((PAD, y + 32), (p.get('nota') or '')[:150], fill=(203, 213, 225), font=Fs)
    antes = sorted(glob.glob(os.path.join(d, f"{p['id']}.antes-*.jpg")))[-1:]
    k = next((i + 1 for i, s in enumerate(p.get('despues', [])) if s.startswith('tpl:')), 1)   # el plano nuevo, no la captura
    cols = antes + [os.path.join(d, f"{p['id']}.medio-{k}.jpg"), os.path.join(d, f"{p['id']}.fin-{k}.jpg")]
    for c, f in enumerate(cols):
        if os.path.exists(f): sheet.paste(Image.open(f).convert('RGB').resize((W, H)), (PAD + c * (W + PAD), y + TOP))
    if p.get('avisos'): dr.text((PAD + 2 * (W + PAD) + 10, y + TOP + 10), '⚠ ' + ' · '.join(p['avisos'])[:90], fill=(251, 191, 36), font=Fs)
sheet.save(out, quality=85); print(out)
