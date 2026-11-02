# ⚠ SOLO para regenerar clips sueltos de un vídeo que ya se generó párrafo a párrafo. Un vídeo entero va con
# `gen_lote.py 2`: un párrafo por petición hace que el locutor cambie entre párrafos (lección del 21-10-2026 en
# skills/voz-codigo-sin-siesta/SKILL.md).
# Genera por Batch API (generateContent) los clips de voz que faltan en voz/, en una sola tarea: mitad de precio y sin
# gastar el cupo diario de peticiones interactivas (ese cupo agotado no impide el batch). Misma voz, estilo y modelo que
# gen_voz.py. Uso, desde work/:  ../../../../skills/locucion-tts/.venv/bin/python gen_batch.py [ids…]
# Necesita GEMINI_API_KEY (la de pago: el nivel gratuito no admite batch). La tarea queda anotada en voz/batch_job.txt y,
# si el script se corta, al volver a lanzarlo recoge esa misma tarea en lugar de crear otra.
import json, os, sys, time
from google import genai
VOZ = "es-es-training-9"
MODELO = os.environ.get("TTS_MODELO") or (open("tts_modelo").read().strip() if os.path.exists("tts_modelo") else "gemini-3.8-flash-tts")
ESTILO = ("Friendly, clear Castilian Spanish instructional video host for an internal tech training series. "
          "Warm, close and practical, confident but calm; natural conversational pace, not rushed, not dramatic.")

ESPERA = 20
client = genai.Client()
segs = json.load(open("segments.json"))
only = set(sys.argv[1:])
pend = [s for s in segs if (s["id"] in only if only else not os.path.exists(f"voz/{s['id']}.wav"))]
anot = "voz/batch_job.txt"

if os.path.exists(anot):
    nombre, ids = open(anot).read().split("\n", 1)
    ids = ids.split()
    print("retomo", nombre, len(ids), "clips", flush=True)
else:
    if not pend: print("no falta ningún clip"); sys.exit(0)
    ids = [s["id"] for s in pend]
    reqs = [{"contents": [{"role": "user", "parts": [{"text": s["text"], "speech_metadata": {"style": ESTILO}}]}],
             "config": {"response_modalities": ["AUDIO"], "speech_config": {"voice_config": {"voice": VOZ}}}} for s in pend]
    job = client.batches.create(model=MODELO, src=reqs, config={"display_name": f"csn-{os.path.basename(os.path.dirname(os.getcwd()))}"})
    nombre = job.name
    open(anot, "w").write(nombre + "\n" + " ".join(ids))
    print("creado", nombre, len(ids), "clips", flush=True)

t0 = time.time()
while True:
    job = client.batches.get(name=nombre)
    estado = str(job.state)
    if any(x in estado for x in ("SUCCEEDED", "FAILED", "CANCELLED", "EXPIRED")): break
    time.sleep(ESPERA)
print("estado", estado, f"{time.time() - t0:.0f} s", flush=True)
if "SUCCEEDED" not in estado:
    print(getattr(job, "error", None)); os.remove(anot); sys.exit(1)

fallos = []
for sid, r in zip(ids, job.dest.inlined_responses):
    try:
        datos = r.response.candidates[0].content.parts[0].inline_data.data
        open(f"voz/{sid}.wav", "wb").write(datos)          # ya viene como WAV completo (audio/wav)
        print("ok", sid, "batch", flush=True)
    except Exception as e:
        fallos.append(sid); print("FAIL", sid, getattr(r, "error", None) or e, flush=True)
os.remove(anot)
print(f"{len(ids) - len(fallos)} clips, {len(fallos)} fallos", flush=True)
