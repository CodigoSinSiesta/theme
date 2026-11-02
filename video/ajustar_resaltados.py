# Ajusta los resaltados (hl) de las capturas al texto que cubren de verdad. Lee cada captura con el OCR de macOS
# (ocr/ocr, Vision) y corrige solo los bordes que cortan palabras: los saca para incluirlas enteras o los mete para
# dejarlas fuera. Así ninguna línea queda cortada ni medio fuera, y los bordes que no tocan texto no se mueven.
# Uso, desde work/:  python3 ajustar_resaltados.py [--escribir]   (sin --escribir solo informa y genera la hoja)
# Hoja de revisión: resaltados.jpg (rojo, antes; verde, después).
import json, os, re, subprocess, sys
import numpy as np
from pathlib import Path
from PIL import Image, ImageDraw

MOTOR = Path(os.path.realpath(__file__)).parent
OCR = MOTOR / 'ocr' / 'ocr'
PAD_X, PAD_Y, MIN_SOLAPE, G = 4, 3, 0.5, 2   # G: holgura del trazo de las letras sobre la caja del OCR
_cache = {}


def palabras(img):
    if img not in _cache:
        _cache[img] = json.loads(subprocess.run([str(OCR), f'caps_clean/{img}.png'], capture_output=True, text=True).stdout)
    return _cache[img]


def ajustar(img, r):
    """Corrige solo los bordes que cortan palabras. Lo que entra se decide una vez, con el recuadro original: una
    palabra que queda dentro en buena parte entra entera, con margen; las demás quedan fuera, con el borde a medio
    camino entre ellas y lo incluido. Los bordes que no tocan texto no se mueven (un panel enmarcado sigue igual)."""
    x0, y0, x1, y1 = r[0], r[1], r[0] + r[2], r[1] + r[3]
    def caja(w): return w[0] - G, w[1] - G, w[0] + w[2] + G, w[1] + w[3] + G
    def dentro(b, X0, Y0, X1, Y1):
        return max(0, min(b[2], X1) - max(b[0], X0)) * max(0, min(b[3], Y1) - max(b[1], Y0)) / max(1e-9, (b[2] - b[0]) * (b[3] - b[1]))  # el OCR a veces da cajas de área cero
    ws = palabras(img)
    inc = [w for w in ws if dentro((w[0], w[1], w[0] + w[2], w[1] + w[3]), x0, y0, x1, y1) >= MIN_SOLAPE]
    for w in inc:
        b = caja(w); x0, y0, x1, y1 = min(x0, b[0] - PAD_X), min(y0, b[1] - PAD_Y), max(x1, b[2] + PAD_X), max(y1, b[3] + PAD_Y)
    # Las cajas del OCR de filas vecinas se solapan (el interlineado es justo): para separar filas se usa el centro
    # de cada palabra y el borde va a medio camino entre la fila incluida y la excluida.
    cy = lambda w: w[1] + w[3] / 2
    if inc:
        c0, c1 = min(cy(w) for w in inc), max(cy(w) for w in inc)
        ix0 = min(caja(w)[0] for w in inc); ix1 = max(caja(w)[2] for w in inc)
    for w in ws:
        if w in inc: continue
        b = caja(w)
        if dentro(b, x0, y0, x1, y1) == 0: continue
        if inc and cy(w) > c1 + 4: y1 = min(y1, int((c1 + cy(w)) / 2))
        elif inc and cy(w) < c0 - 4: y0 = max(y0, int((c0 + cy(w)) / 2) + 1)
        elif inc and b[0] >= ix1 - 2: x1 = min(x1, max(ix1 + 1, (ix1 + b[0]) // 2))
        elif inc and b[2] <= ix0 + 2: x0 = max(x0, min(ix0 - 1, (ix0 + b[2]) // 2))
        elif not inc:
            if b[1] < y0 < b[3]: y0 = b[3] + 1
            elif b[1] < y1 < b[3]: y1 = b[1] - 1
            elif b[0] < x0 < b[2]: x0 = b[2] + 1
            elif b[0] < x1 < b[2]: x1 = b[0] - 1
    x0, y0, x1, y1 = max(0, x0), max(0, y0), min(1383, x1), min(868, y1)
    x0, y0, x1, y1 = a_hueco(img, x0, y0, x1, y1)
    return [x0, y0, x1 - x0, y1 - y0], inc


_tinta = {}
def tinta(img):
    """Máscara de «tinta»: píxeles que se apartan del color dominante de su fila (el fondo, sea del panel que sea)."""
    if img not in _tinta:
        a = np.asarray(Image.open(f'caps_clean/{img}.png').convert('RGB')).astype(int)
        m = np.zeros(a.shape[:2], bool)
        for y in range(a.shape[0]):
            fila = a[y]; c = fila[:, 0] * 65536 + fila[:, 1] * 256 + fila[:, 2]
            v, n = np.unique(c, return_counts=True); bg = v[n.argmax()]
            m[y] = np.abs(fila - np.array([bg >> 16, (bg >> 8) & 255, bg & 255])).sum(1) > 60
        _tinta[img] = m
    return _tinta[img]


def a_hueco(img, x0, y0, x1, y1, R=6):
    """Lleva cada borde al centro de la franja sin texto más cercana (a ±R px), para que la línea del resaltado
    caiga entre dos líneas de texto y no sobre las letras."""
    m = tinta(img)
    def centra(perfil, e, lo, hi):
        vacio = [i for i in range(max(lo, e - R), min(hi, e + R + 1)) if perfil[i] == 0]
        if not vacio: return e
        bandas, b = [], [vacio[0]]
        for i in vacio[1:]:
            if i == b[-1] + 1: b.append(i)
            else: bandas.append(b); b = [i]
        bandas.append(b)
        mejor = min(bandas, key=lambda b: min(abs(e - b[0]), abs(e - b[-1])) - len(b) * 0.01)
        return (mejor[0] + mejor[-1] + 1) // 2
    fil = m[:, x0:x1].sum(1); col = m[y0:y1, :].sum(0)
    ny0, ny1 = centra(fil, y0, 0, m.shape[0] - 1), centra(fil, y1, 0, m.shape[0] - 1)
    nx0, nx1 = centra(col, x0, 0, m.shape[1] - 1), centra(col, x1, 0, m.shape[1] - 1)
    return nx0, ny0, nx1, ny1


def main():
    escribir = '--escribir' in sys.argv
    src = open('shots.js').read()
    filas, out, last = [], [], 0
    for m in re.finditer(r"img: '([^']+)'((?:(?!img: ').)*?)hl: (\[\[.*?\]\])", src, re.S):
        img, rects = m.group(1), json.loads(m.group(3))
        sid = re.findall(r"'(c\d+-\d+)'", src[:m.start()])[-1]
        nuevos = []
        for r in rects:
            n, ws = ajustar(img, r)
            nuevos.append(n); filas.append((sid, img, r, n, ' '.join(w[4] for w in ws)))
        out.append(src[last:m.start(3)] + json.dumps(nuevos))
        last = m.end(3)
    out.append(src[last:])
    for sid, img, r, n, txt in filas:
        print(f'{sid} {img:22} {r} -> {n}  «{txt[:70]}»' + ('' if txt else '  (sin texto: sin cambios)'))
    hoja(filas)
    if escribir: open('shots.js', 'w').write(''.join(out)); print('shots.js actualizado')


def hoja(filas):
    tiles = []
    for sid, img, r, n, txt in filas:
        im = Image.open(f'caps_clean/{img}.png').convert('RGB'); d = ImageDraw.Draw(im)
        d.rectangle([r[0], r[1], r[0] + r[2], r[1] + r[3]], outline=(255, 60, 60), width=2)
        d.rectangle([n[0], n[1], n[0] + n[2], n[1] + n[3]], outline=(60, 255, 90), width=2)
        x0, y0 = max(0, min(r[0], n[0]) - 30), max(0, min(r[1], n[1]) - 30)
        x1, y1 = min(1383, max(r[0] + r[2], n[0] + n[2]) + 30), min(868, max(r[1] + r[3], n[1] + n[3]) + 30)
        t = im.crop((x0, y0, x1, y1))
        c = Image.new('RGB', (1383, t.height + 22), (20, 20, 20)); c.paste(t, (0, 22))
        ImageDraw.Draw(c).text((4, 4), f'{sid} {img}', fill=(255, 255, 255)); tiles.append(c)
    if not tiles: return
    H = sum(t.height + 6 for t in tiles); sheet = Image.new('RGB', (1383, H), (0, 0, 0)); y = 0
    for t in tiles: sheet.paste(t, (0, y)); y += t.height + 6
    sheet.save('resaltados.jpg', quality=88)


if __name__ == '__main__':
    main()
