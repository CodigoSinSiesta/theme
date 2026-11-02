# recortar_lote.py <lote.wav> id1 id2 …: corta un lote por los silencios más cercanos al reparto de palabras
import json, sys, wave, numpy as np
lote, ids = sys.argv[1], sys.argv[2:]
segs = {s['id']: s for s in json.load(open('segments.json'))}
with wave.open(lote) as w: a = np.frombuffer(w.readframes(w.getnframes()), np.int16); sr = w.getframerate()
n = int(sr * .02); fr = len(a) // n
rms = np.sqrt(((a[:fr * n].astype(np.float32) / 32768) ** 2).reshape(fr, n).mean(1)); q = rms < .012
sil, st = [], None
for i, x in enumerate(q):
    if x and st is None: st = i
    if not x and st is not None:
        if st > 0 and i - st >= 10: sil.append((st * n, i * n))   # silencios de 0,2 s o más
        st = None
words = [len(segs[i]['text'].replace('<short pause>', '').split()) for i in ids]
tot = sum(words); cum = np.cumsum(words)[:-1] / tot
cuts = []
for f in cum:
    target = f * len(a)
    s, e = min((x for x in sil if not cuts or x[0] > cuts[-1]), key=lambda x: abs((x[0] + x[1]) / 2 - target) - .5 * (x[1] - x[0]))
    cuts.append((s + e) // 2)
b = [0, *cuts, len(a)]
for i, a0, a1 in zip(ids, b, b[1:]):
    p = a[a0:a1]; nz = np.where(np.abs(p) > 300)[0]
    if len(nz): p = p[max(0, nz[0] - int(.05 * sr)): nz[-1] + int(.12 * sr)]
    with wave.open(f'voz/{i}.wav', 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(p.tobytes())
    print(i, f'{len(p) / sr:.1f}s', f'{words[ids.index(i)] / (len(p) / sr):.2f} pal/s')
