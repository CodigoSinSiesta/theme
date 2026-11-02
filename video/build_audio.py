# Monta la pista final: voz (clips en su instante del timeline) + música de la cabecera HIMYA
# en título, tarjetas de capítulo y cierre. Salida: audio_final.wav (48 kHz estéreo).
import json, os, subprocess, wave
CFG = json.load(open('tiempos.json')) if os.path.exists('tiempos.json') else {}
import numpy as np

SR = 48000
tl = json.load(open('timeline.json'))
N = int((tl['total'] + 0.5) * SR)
voice = np.zeros(N, np.float32)
music = np.zeros(N, np.float32)


def load(path, t0=None, t1=None):
    args = ['ffmpeg', '-v', 'error']
    if t0 is not None: args += ['-ss', str(t0)]
    if t1 is not None: args += ['-to', str(t1)]
    args += ['-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(args, capture_output=True).stdout, np.float32).copy()


def place(buf, a, t):
    i = int(t * SR); a = a[:max(0, N - i)]; buf[i:i + len(a)] += a


def fade(a, fin, fout):
    a = a.copy(); fi, fo = int(fin * SR), int(fout * SR)
    if fi: a[:fi] *= np.linspace(0, 1, fi)
    if fo: a[-fo:] *= np.linspace(1, 0, fo)
    return a


for s in tl['segments']:
    try: place(voice, load(s["src"]), s["start"])
    except FileNotFoundError: pass

M = 'musica.wav'   # música de cabecera opcional (la identidad de Código Sin Siesta aún no tiene; sin ella, solo voz)
db = lambda x: 10 ** (x / 20)
if os.path.exists(M):
    # título: arranque de la cabecera, baja bajo la voz (3.2–7.9 s)
    tit = fade(load(M, 0, tl['title'] + 0.6), 0.02, 1.4)
    env = np.ones(len(tit), np.float32); a, b = int(2.9 * SR), int(3.3 * SR)
    env[a:b] = np.linspace(1, db(-14), b - a); env[b:] = db(-14)
    place(music, tit * env * db(-4), 0)
    # tarjetas de capítulo: golpe del logo (12.65 s de la cabecera)
    for c in tl['chapters']:
        place(music, fade(load(M, 12.45, 12.45 + c['dur'] + 0.4), 0.15, 1.2) * db(-9), c['start'] - 0.1)
    # cierre: final de la cabecera alineado con el fundido
    e = tl['end']
    place(music, fade(load(M, 23.5 - e['dur'] - 0.3, 23.5), 0.6, 1.5) * db(-5), e['start'])


# Música de fondo continua (tiempos.json → "fondo": {"src": "...wav", "vol": -20, "duck": -10}): suena todo el vídeo y
# baja `duck` dB mientras habla el locutor (envolvente de la voz suavizada).
F = CFG.get('fondo')
if F:
    bed = load(F['src'])
    if len(bed) < N:   # la música dura menos que el vídeo: se repite, con 2 s de fundido cruzado entre vuelta y vuelta
        x = int(2.0 * SR); ramp = np.linspace(0, 1, x).astype(np.float32); out = bed.copy()
        while len(out) < N:
            out = np.concatenate([out[:-x], out[-x:] * (1 - ramp) + bed[:x] * ramp, bed[x:]])
        bed = out
    bed = bed[:N]
    k = int(0.05 * SR); act = np.convolve(np.abs(voice) > 0.01, np.ones(k) / k, 'same') > 0.05
    w = int(0.4 * SR); g = np.convolve(act.astype(np.float32), np.ones(w) / w, 'same')
    gain = db(F.get('vol', -20)) * (1 - g + g * db(F.get('duck', -10)))
    fo = int(2.5 * SR); gain[-fo:] *= np.linspace(1, 0, fo)
    music += bed * gain

mix = voice * db(4) + music
peak = np.abs(mix).max(); mix *= 0.89 / peak if peak > 0.89 else 1
st = np.repeat(mix[:, None], 2, 1)
with wave.open('audio_raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'audio_raw.wav', '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', str(SR), 'audio_final.wav'], check=True)
print('audio_final.wav', tl['total'], 's')
