# Construye timeline.json (y timeline.js) a partir de segments.json y las duraciones reales de voz/*.wav.
# Si falta algún WAV, estima su duración (2.6 palabras/s) para poder maquetar antes de tener la voz.
import json, os, re, subprocess, sys
CFG = json.load(open('tiempos.json')) if os.path.exists('tiempos.json') else {}   # duraciones de cabecera, tarjeta y cierre
from pathlib import Path

TITLE = float(CFG.get("titulo", 7.0))          # cabecera de la píldora (voz de c0-01 empieza en VOICE_IN)
VOICE_IN = float(CFG.get("voz", 3.2))   # segundo de la portada en que entra la voz de c0-01 (tras la intro con música, ~1 s)
CHAPTER = float(CFG.get("capitulo", 4.0))        # tarjeta de capítulo
LEAD = 0.5           # respiro entre la tarjeta y la primera frase
END = float(CFG.get("cierre", 8.0))            # cierre con rótulo final
GAP_SCALE = float(sys.argv[1]) if len(sys.argv) > 1 else 1.0

CHAPTERS = {int(k): v for k, v in json.load(open('capitulos.json')).items()}   # títulos de capítulo del vídeo


def marks(path, text, d):
    """Puntos de anclaje [carácter, segundo] de la frase: arranque, pausas de la voz junto a la puntuación y final.
    Entre dos anclas, el tiempo de cada palabra se interpola por caracteres (precisión ~±0,5 s)."""
    if not path.exists(): return [[0, 0], [len(text), round(d, 3)]]
    e = subprocess.run(['ffmpeg', '-i', str(path), '-af', 'silencedetect=n=-35dB:d=0.18', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    sil = list(zip([float(x) for x in re.findall(r'silence_start: (-?[\d.]+)', e)],
                   [float(x) for x in re.findall(r'silence_end: ([\d.]+)', e)]))
    on = next((b for a, b in sil if a <= 0.05), 0.0)
    off = next((a for a, b in sil if b >= d - 0.05 and a > on), d)
    inner = [(a, b) for a, b in sil if a > on + 0.05 and b < off - 0.05]
    out, c0, t0 = [[0, round(on, 3)]], 0, on
    for m in re.finditer(r'[,.;:?!»]+\s', text):
        p = m.end()
        est = t0 + (off - t0) * (p - c0) / max(1, len(text) - c0)
        tol = 0.6 if m.group().strip() in (',', '»') else 1.4
        cand = [z for z in inner if z[0] > t0 and abs((z[0] + z[1]) / 2 - est) < tol]
        if not cand: continue
        a, b = min(cand, key=lambda z: abs((z[0] + z[1]) / 2 - est))
        out += [[m.start() + 1, round(a, 3)], [p, round(b, 3)]]
        c0, t0 = p, b
    out.append([len(text), round(off, 3)])
    return out


def dur(path, text):
    if path.exists():
        out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(path)],
                             capture_output=True, text=True).stdout
        return float(out), True
    words = len(re.sub(r'<[^>]+>', '', text).split())
    return words / 2.6, False


segs = json.load(open('segments.json'))
t, out, chapters, missing, aligned = 0.0, [], [], 0, 0
cur = None
for s in segs:
    src = Path(f"voz/{s['id']}.wav")
    for alt in ("voz_mia", "voz_sub"):
        if not src.exists(): src = Path(f"{alt}/{s['id']}.wav")
    d, real = dur(src, s['text'])
    missing += not real
    txt = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', s['text'])).strip()
    pal = src.with_suffix('.palabras.json')          # alineación palabra a palabra (alinear.py), si la hay
    pj = json.load(open(pal)) if src.exists() and pal.exists() and pal.stat().st_mtime >= src.stat().st_mtime else None
    mk = {'txt': txt, 'marks': pj['marks'] if pj and pj['txt'] == txt else marks(src, txt, d)}
    aligned += bool(pj and pj['txt'] == txt)
    if s['ch'] == 0:
        start = VOICE_IN
        out.append({**{k: s[k] for k in ('id', 'ch')}, 'start': round(start, 3), 'dur': round(d, 3), 'real': real, 'src': str(src), **mk})
        t = max(TITLE, start + d + 1.0)
        continue
    if s['ch'] != cur:
        cur = s['ch']
        chapters.append({'n': cur, 'title': CHAPTERS[cur], 'start': round(t, 3), 'dur': CHAPTER})
        t += CHAPTER + LEAD
    out.append({'id': s['id'], 'ch': s['ch'], 'start': round(t, 3), 'dur': round(d, 3), 'real': real, 'src': str(src), **mk})
    t += d + s['gap'] * GAP_SCALE

tl = {'title': TITLE, 'chapters': chapters, 'segments': out, 'end': {'start': round(t, 3), 'dur': END},
      'total': round(t + END, 3)}
json.dump(tl, open('timeline.json', 'w'), indent=1, ensure_ascii=False)
open('timeline.js', 'w').write('window.TL = ' + json.dumps(tl, ensure_ascii=False) + ';\n')
print(f"total {tl['total']:.1f}s = {tl['total']/60:.2f} min · estimados {missing}/{len(segs)} · alineados palabra a palabra {aligned}/{len(segs)}")
