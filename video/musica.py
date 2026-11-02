# Música de la serie generada por síntesis (sin muestras ni licencias de terceros).
# Tema electrónico sobrio a 110 BPM en La menor (Am–F–C–G): golpe inicial para la intro y fondo para el tráiler.
# Uso: .venv/bin/python musica.py <salida.wav> [segundos]     (48 kHz, estéreo)
import sys, wave
import numpy as np

SR = 48000
BPM = 110
BEAT = 60 / BPM
DUR = float(sys.argv[2]) if len(sys.argv) > 2 else 96.0
N = int(DUR * SR)
L = np.zeros(N, np.float32); R = np.zeros(N, np.float32)
rng = np.random.default_rng(7)
hz = lambda m: 440.0 * 2 ** ((m - 69) / 12)


def env(n, a, d, s, r, hold):
    """ADSR en muestras (a, d, r en segundos; hold = duración de la nota en segundos)."""
    t = np.arange(n) / SR
    e = np.where(t < a, t / max(a, 1e-4), np.where(t < a + d, 1 - (1 - s) * (t - a) / max(d, 1e-4), s))
    rel = t > hold
    e = np.where(rel, s * np.clip(1 - (t - hold) / max(r, 1e-4), 0, 1), e)
    return e.astype(np.float32)


def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); acc = 0.0
    for i in range(len(x)): acc = (1 - a) * x[i] + a * acc; y[i] = acc
    return y


def saw(f, n, detune=0.0):
    t = np.arange(n) / SR
    return sum(2 * ((t * f * (1 + d)) % 1) - 1 for d in (-detune, 0, detune)) / 3


def add(buf, x, t0, pan=0.0, g=1.0):
    i = int(t0 * SR); x = x[: max(0, N - i)]
    buf[0][i:i + len(x)] += x * g * (1 - max(0, pan)); buf[1][i:i + len(x)] += x * g * (1 + min(0, pan))


B = (L, R)
CH = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]   # Am, F, C, G
ROOT = [45, 41, 36, 43]
bars = int(DUR / (4 * BEAT)) + 1

# golpe inicial: subgrave + ruido filtrado + acorde abierto (logo)
n = int(3.5 * SR); t = np.arange(n) / SR
hit = np.sin(2 * np.pi * 55 * t) * np.exp(-t * 1.6) * 0.9
hit += lowpass(rng.standard_normal(n).astype(np.float32), 900) * np.exp(-t * 3) * 0.8
for m in [57, 64, 69, 72, 76]: hit += saw(hz(m), n, 0.004) * np.exp(-t * 0.9) * 0.10
add(B, lowpass(hit.astype(np.float32), 2600), 0.0, g=0.9)

for b in range(bars):
    t0 = b * 4 * BEAT; c = b % 4
    if t0 > DUR: break
    intro = b < 2                      # los dos primeros compases: solo pad y arpegio (sube la tensión)
    # pad
    n = int(4 * BEAT * SR)
    pad = sum(saw(hz(m), n, 0.006) for m in CH[c]) / 3 * env(n, 0.4, 0.5, 0.7, 0.6, 4 * BEAT - 0.3)
    add(B, lowpass(pad.astype(np.float32), 1400), t0, pan=-0.2, g=0.16)
    # arpegio en semicorcheas
    notes = [m + 12 for m in CH[c]] + [CH[c][1] + 24]
    for k in range(16):
        m = notes[k % 4]; n = int(BEAT / 4 * SR * 1.4)
        a = np.sin(2 * np.pi * hz(m) * np.arange(n) / SR) * env(n, 0.002, 0.08, 0.2, 0.05, BEAT / 4 * 0.6)
        add(B, a.astype(np.float32), t0 + k * BEAT / 4, pan=0.35 if k % 2 else -0.35, g=0.07 if intro else 0.09)
    if intro: continue
    # bajo en corcheas
    for k in range(8):
        n = int(BEAT / 2 * SR); f = hz(ROOT[c] + (12 if k % 4 == 3 else 0))
        bs = saw(f, n) * env(n, 0.005, 0.12, 0.5, 0.05, BEAT / 2 * 0.8)
        add(B, lowpass(bs.astype(np.float32), 500), t0 + k * BEAT / 2, g=0.32)
    # batería: bombo en negras, palmada en 2 y 4, charles en corcheas
    for k in range(4):
        n = int(0.35 * SR); tt = np.arange(n) / SR
        kick = np.sin(2 * np.pi * (45 + 90 * np.exp(-tt * 30)) * tt) * np.exp(-tt * 9)
        add(B, kick.astype(np.float32), t0 + k * BEAT, g=0.75)
        if k in (1, 3):
            n2 = int(0.25 * SR); nz = rng.standard_normal(n2).astype(np.float32) * np.exp(-np.arange(n2) / SR * 22)
            add(B, (nz - lowpass(nz, 1200)), t0 + k * BEAT, g=0.22)
    for k in range(8):
        n = int(0.06 * SR); nz = rng.standard_normal(n).astype(np.float32)
        hh = (nz - lowpass(nz, 6000)) * np.exp(-np.arange(n) / SR * 70)
        add(B, hh, t0 + k * BEAT / 2, pan=0.3, g=0.10 if k % 2 else 0.06)

# eco estéreo suave y salida final con fundido
for d, g in ((int(BEAT * 0.75 * SR), 0.22), (int(BEAT * 1.5 * SR), 0.12)):
    L[d:] += R[:-d] * g; R[d:] += L[:-d] * g
mix = np.stack([L, R], 1)
f = int(3 * SR); mix[-f:] *= np.linspace(1, 0, f)[:, None]
mix *= 0.89 / np.abs(mix).max()
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes())
print(sys.argv[1], DUR, 's')
