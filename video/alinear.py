# Alinea cada clip de voz con su texto palabra a palabra (whisper.cpp + pausas reales) y guarda voz/<id>.palabras.json.
# build_timeline.py usa esas marcas en lugar de las pausas: cada palabra del guion queda anclada a su instante real.
# Uso, desde work/:  python3 alinear.py [id ...]     (sin ids, todos los clips nuevos o cambiados)
import json, os, re, subprocess, sys, tempfile, unicodedata
from collections import Counter
from difflib import SequenceMatcher
from pathlib import Path

MOTOR = Path(os.path.realpath(__file__)).parent
MODEL = MOTOR / 'modelos' / 'ggml-medium.bin'


def norm(w):
    w = unicodedata.normalize('NFD', w.lower())
    return re.sub(r'[^a-z0-9ñ]', '', ''.join(c for c in w if unicodedata.category(c) != 'Mn'))


def script_words(text):
    """Palabras del guion con su posición de carácter (el mismo texto limpio que usa el motor)."""
    return [(m.start(), m.end(), norm(m.group())) for m in re.finditer(r'\S+', text) if norm(m.group())]


def silences(wav):
    e = subprocess.run(['ffmpeg', '-i', str(wav), '-af', 'silencedetect=n=-35dB:d=0.12', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    return list(zip([float(x) for x in re.findall(r'silence_start: (-?[\d.]+)', e)],
                    [float(x) for x in re.findall(r'silence_end: ([\d.]+)', e)]))


def recognize(wav):
    """Palabras reconocidas con su inicio y fin en segundos. Se agrupan los tokens de whisper en palabras (un token que
    empieza por espacio abre palabra) y, si un inicio cae dentro de una pausa, se lleva al final de la pausa."""
    with tempfile.TemporaryDirectory() as d:
        w16 = Path(d) / 'a.wav'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(wav), '-ar', '16000', '-ac', '1', str(w16)], check=True)
        subprocess.run(['whisper-cli', '-m', str(MODEL), '-l', 'es', '-ojf', '-np', '-f', str(w16), '-of', str(Path(d) / 'r')],
                       check=True, capture_output=True)
        js = json.load(open(Path(d) / 'r.json'))
    words = []
    for seg in js['transcription']:
        for t in seg.get('tokens', []):
            tx = t['text']
            if tx.startswith('[_'): continue
            a, b = t['offsets']['from'] / 1000, t['offsets']['to'] / 1000
            if tx.startswith(' ') or not words: words.append([a, b, tx.strip()])
            else: words[-1][1] = b; words[-1][2] += tx
    sil = silences(wav)
    out = []
    for a, b, w in words:
        if not norm(w): continue
        for s0, s1 in sil:
            if s0 - 0.05 <= a < s1: a = s1; break
        out.append((round(a, 3), round(max(a, b), 3), norm(w)))
    return out


def align(text, rec, dur):
    sw = script_words(text)
    sm = SequenceMatcher(None, [w for *_, w in sw], [w for *_, w in rec], autojunk=False)
    marks, hit = [], 0
    for a, b, n in sm.get_matching_blocks():
        for k in range(n):
            marks.append([sw[a + k][0], round(rec[b + k][0], 3)]); hit += 1
    marks.sort()
    clean = []                                   # tiempos estrictamente crecientes
    for c, t in marks:
        if not clean or (t > clean[-1][1] and c > clean[-1][0]): clean.append([c, t])
    end = rec[-1][1] if rec else dur
    if not clean or clean[0][0] > 0: clean.insert(0, [0, clean[0][1] if clean else 0.0])
    clean.append([len(text), round(min(dur, max(end, clean[-1][1] + 0.05)), 3)])
    return clean, hit, len(sw)


def repetidas(text, rec, n=4):
    """Grupos de n palabras que la voz dice más veces que el guion (la locución a veces repite una frase)."""
    def grupos(ws): return Counter(tuple(ws[i:i + n]) for i in range(len(ws) - n + 1))
    g, r = grupos([w for *_, w in script_words(text)]), grupos([norm(w) for *_, w in rec if norm(w)])
    return [' '.join(k) for k, c in r.items() if c > 1 and c > g.get(k, 0)]


def main():
    segs = {s['id']: s for s in json.load(open('segments.json'))}
    ids = sys.argv[1:] or list(segs)
    for sid in ids:
        wav, out = Path(f'voz/{sid}.wav'), Path(f'voz/{sid}.palabras.json')
        if not wav.exists(): continue
        if not sys.argv[1:] and out.exists() and out.stat().st_mtime > wav.stat().st_mtime: continue
        text = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', segs[sid]['text'])).strip()
        dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(wav)],
                                   capture_output=True, text=True).stdout)
        rec = recognize(wav)
        marks, hit, total = align(text, rec, dur)
        json.dump({'txt': text, 'marks': marks, 'cobertura': round(hit / max(1, total), 3), 'reconocido': rec},
                  open(out, 'w'), ensure_ascii=False)
        rep = repetidas(text, rec)
        aviso = f' · REPETIDO, regenerar: «{rep[0]}…»' if rep else ''
        # Un lote mal partido a veces mete al final la primera frase del clip siguiente: la voz dice palabras de más.
        sobran = sum(1 for *_, w in rec if norm(w)) - total
        if not aviso and sobran > max(6, total * 0.12):
            aviso = f' · SOBRAN {sobran} palabras, regenerar'
        print(f'{sid}: {hit}/{total} palabras ancladas ({100 * hit / max(1, total):.0f} %){aviso}', flush=True)


if __name__ == '__main__':
    main()
