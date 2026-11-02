# Genera los clips que faltan agrupando varios párrafos por petición (cuota diaria limitada)
# y los separa después cortando por los silencios más largos.
# Uso: GEMINI_API_KEY_FREE=... GEMINI_API_KEY=... python3 gen_lote.py [parrafos_por_peticion]
import os, json, os, re, subprocess, sys
import numpy as np, wave
sys.path.insert(0, os.path.dirname(os.path.realpath(__file__)))
from tts_claves import generar   # primero la clave gratuita, después la de pago

SKILL = os.environ.get("LOCUCION_TTS", os.path.join(os.path.dirname(os.path.realpath(__file__)), "../skills/locucion-tts"))
PY = os.path.join(SKILL, ".venv/bin/python")
GEN = os.path.join(SKILL, "scripts/generar_locucion.py")
VOZ = "es-es-training-9"
# Modelo de voz fijado por vídeo en work/tts_modelo (para no mezclar timbres al regenerar un clip suelto); TTS_MODELO lo sustituye.
# La lite (gemini-3.8-flash-lite-tts) tiene otra cuota, pero pronuncia mal los términos en inglés: no usarla en el curso.
MODELO = os.environ.get("TTS_MODELO") or (open("tts_modelo").read().strip() if os.path.exists("tts_modelo") else "gemini-3.8-flash-tts")
ESTILO = ("Friendly, clear Castilian Spanish instructional video host for an internal tech training series. "
          "Warm, close and practical, confident but calm; natural conversational pace, not rushed, not dramatic.")
N = int(sys.argv[1]) if len(sys.argv) > 1 else 3

segs = [s for s in json.load(open('segments.json')) if not os.path.exists(f"voz/{s['id']}.wav")]
groups, cur = [], []
for s in segs:  # agrupa consecutivos del mismo capítulo
    if cur and (len(cur) == N or cur[-1]['ch'] != s['ch']):
        groups.append(cur); cur = []
    cur.append(s)
if cur: groups.append(cur)
print(f"{len(segs)} clips en {len(groups)} peticiones")


def read(path):
    with wave.open(path) as w:
        return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16), w.getframerate()


def write(path, a, sr):
    with wave.open(path, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(a.astype(np.int16).tobytes())


def silences(a, sr, win=0.02, thr=0.012):
    n = int(sr * win); frames = len(a) // n
    rms = np.sqrt((a[:frames * n].astype(np.float32).reshape(frames, n) / 32768) ** 2).mean(1)
    quiet = rms < thr; out, st = [], None
    for i, q in enumerate(quiet):
        if q and st is None: st = i
        if not q and st is not None: out.append((st * n, i * n)); st = None
    return [(s, e) for s, e in out if s > 0]  # ignora el silencio inicial


for g in groups:
    ids = [s['id'] for s in g]
    tmp = f"voz/lote_{ids[0]}.wav"
    if not os.path.exists(tmp):
        text = ' <long pause> '.join(s['text'] for s in g)
        r, clave = generar([PY, GEN, '--texto', text, '--voz', VOZ, '--estilo', ESTILO, '--out', tmp, '--timeout', '300', '--modelo', MODELO])
        if not clave:
            print('FAIL', ids, r.stderr[-300:] if r else 'sin claves en el entorno'); break
        print('lote', ids[0], clave, flush=True)
    a, sr = read(tmp)
    if len(g) == 1:
        cuts = []
    else:
        sil = sorted(silences(a, sr), key=lambda x: x[1] - x[0], reverse=True)[:len(g) - 1]
        cuts = sorted((s + e) // 2 for s, e in sil)
    bounds = [0, *cuts, len(a)]
    for s, a0, a1 in zip(g, bounds, bounds[1:]):
        part = a[a0:a1]
        nz = np.where(np.abs(part) > 300)[0]
        if len(nz): part = part[max(0, nz[0] - int(.05 * sr)): nz[-1] + int(.12 * sr)]
        write(f"voz/{s['id']}.wav", part, sr)
        print('ok', s['id'], f"{len(part) / sr:.1f}s")
