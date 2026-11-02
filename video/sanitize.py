# Píldora 2: limpia las capturas de Orca (proyectos reales de la barra lateral, barra de estado, avisos).
from pathlib import Path
from PIL import Image, ImageDraw
import numpy as np

SRC, DST = Path('caps'), Path('caps_clean')
DST.mkdir(exist_ok=True)


def status_bar(im):
    ImageDraw.Draw(im).rectangle([0, 846, im.width, im.height], fill=im.getpixel((1000, 866)))


def app_sidebar(im, top=230, demo=598, bottom=812, w=256):
    # Proyectos reales entre `top` y `demo`: subimos el bloque de demo-app y rellenamos el resto.
    bg = im.getpixel((5, 225))
    block = im.crop((0, demo, w, bottom))
    d = ImageDraw.Draw(im)
    d.rectangle([0, top, w - 1, bottom], fill=bg)
    im.paste(block, (0, top))


def remove_pet(im):
    a = np.asarray(im).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = (r > 170) & (g > 70) & (g < 175) & (b < 90) & (r - b > 110)
    m[:, :150] = False; m[:, 260:] = False; m[:600] = False
    ys, xs = np.where(m)
    if len(xs) < 100: return
    x0, y0, x1, y1 = xs.min() - 9, ys.min() - 9, xs.max() + 10, ys.max() + 9
    strip = im.crop((x0 - 10, y0, x0, y1))
    for x in range(x0, x1, 10):
        im.paste(strip, (x, y0))


def old_sidebar(im):  # captura de la píldora 1 (sin «Artifacts» en el menú)
    bg = im.getpixel((240, 300))
    block = im.crop((0, 508, 256, 812))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 198, 255, 812], fill=bg)
    im.paste(block, (0, 198))


def fill(box, at):
    return lambda im: ImageDraw.Draw(im).rectangle(box, fill=im.getpixel(at))


def blur(box, r=16):
    from PIL import ImageFilter
    def f(im):
        im.paste(im.crop(box).filter(ImageFilter.GaussianBlur(r)), box[:2])
    return f


sb = lambda demo: (lambda im: app_sidebar(im, demo=demo))
RULES = {n: [] for n in ['01-orquestacion', '02-orquestacion-usos', '03-computer-use', '04-linear', '06-artifacts',
                         '07-share-skills', '08-session-search', '09-comando-rapido-nuevo', '10-integraciones']}
RULES['05-movil'] = [blur((466, 760, 1170, 846))]
RULES['11-cuentas'] = [blur((466, 372, 1168, 494)), blur((466, 676, 1168, 796))]
RULES['12-agente-issue4-resumen'] = [sb(598)]
for n in ['13-sidebar-paralelo', '14-coordinador-worker-done']: RULES[n] = [sb(348)]
for n in ['15-agente-issue3-resumen', '16-coordinador-resumen-b', '17-coordinador-resumen-ab', '18-navegador-integrado', '19-buscar-rapido']: RULES[n] = [sb(398)]
for n in ['20-busqueda-sesiones', '21-artifacts-desactivado', '22-orca-movil']: RULES[n] = [sb(410)]
RULES['23-ejecutar-en-hosts'] = [sb(410), blur((515, 422, 830, 648), 10)]

for name, fns in RULES.items():
    im = Image.open(SRC / f'{name}.jpg').convert('RGB')
    status_bar(im)
    for f in fns:
        f(im)
    im.save(DST / f'{name}.png')
print('ok', len(RULES))
