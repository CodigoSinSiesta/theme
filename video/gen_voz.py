# ⚠ SOLO para regenerar clips sueltos de un vídeo que ya se generó párrafo a párrafo. Un vídeo entero va con
# `gen_lote.py 2`: un párrafo por petición hace que el locutor cambie entre párrafos (lección del 21-10-2026 en
# skills/voz-codigo-sin-siesta/SKILL.md).
import json, subprocess, sys, os
sys.path.insert(0, os.path.dirname(os.path.realpath(__file__)))
from tts_claves import generar   # primero la clave gratuita, después la de pago
from concurrent.futures import ThreadPoolExecutor
# Skill de locución: por defecto la del kit (../../skills/locucion-tts); LOCUCION_TTS permite apuntar a otra copia.
SKILL = os.environ.get("LOCUCION_TTS", os.path.join(os.path.dirname(os.path.realpath(__file__)), "../skills/locucion-tts"))
PY = os.path.join(SKILL, ".venv/bin/python")
GEN = os.path.join(SKILL, "scripts/generar_locucion.py")
VOZ = "es-es-training-9"
# Modelo de voz fijado por vídeo en work/tts_modelo (para no mezclar timbres al regenerar un clip suelto); TTS_MODELO lo sustituye.
# La lite (gemini-3.8-flash-lite-tts) tiene otra cuota, pero pronuncia mal los términos en inglés: no usarla en el curso.
MODELO = os.environ.get("TTS_MODELO") or (open("tts_modelo").read().strip() if os.path.exists("tts_modelo") else "gemini-3.8-flash-tts")
ESTILO = ("Friendly, clear Castilian Spanish instructional video host for an internal tech training series. "
          "Warm, close and practical, confident but calm; natural conversational pace, not rushed, not dramatic.")
segs = json.load(open("segments.json"))
only = set(sys.argv[1:])
def run(s):
    out = f"voz/{s['id']}.wav"
    if (only and s['id'] not in only) or (not only and os.path.exists(out)): return
    for attempt in range(1):
        r, clave = generar([PY, GEN, "--texto", s["text"], "--voz", VOZ, "--estilo", ESTILO, "--out", out, "--timeout", "180", "--modelo", MODELO])
        if clave: print("ok", s["id"], clave, flush=True); return
        print("retry", s["id"], r.stderr[-300:], flush=True)
    print("FAIL", s["id"], flush=True)
with ThreadPoolExecutor(4) as ex: list(ex.map(run, segs))
