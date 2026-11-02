import sys
from PIL import Image, ImageDraw
files = sys.argv[2:]; out = sys.argv[1]
W, H, C = 640, 360, 3
rows = (len(files) + C - 1) // C
s = Image.new('RGB', (W * C, H * rows), 'black')
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB').resize((W, H))
    ImageDraw.Draw(im).text((8, 6), f.split('/')[-1], fill='yellow')
    s.paste(im, ((i % C) * W, (i // C) * H))
s.save(out)
