#!/usr/bin/env bash
# Crea la carpeta de un vídeo nuevo con el motor enlazado.  Uso: motor/nuevo_video.sh <curso> <NN-slug>
# Resultado: <curso>/videos/<NN-slug>/{guion.md, work/{pill.js, segments.json, shots.js, capitulos.json, tiempos.json, enlaces al motor}}
set -euo pipefail
M="$(cd "$(dirname "$0")" && pwd)"; R="$(dirname "$M")"
V="$R/$1/videos/$2"; W="$V/work"
[ -e "$V" ] && { echo "Ya existe: $V"; exit 1; }
mkdir -p "$W/voz" "$W/caps" "$W/caps_clean"
for f in pildora.html vertical.html render.mjs sync_check.mjs orden_check.mjs build_timeline.py build_audio.py alinear.py ajustar_resaltados.py gen_voz.py gen_lote.py gen_batch.py recortar_lote.py tts_claves.py sanitize.py sheet.py render_terminal.mjs build_shots.py demo_tmux.py fonts logos plantillas figs node_modules .venv; do
  [ -e "$M/$f" ] && ln -s "../../../../motor/$f" "$W/$f"; done
cp "$M/plantilla/"{pill.js,segments.json,shots.js,capitulos.json,tiempos.json} "$W/"
cp "$M/plantilla/guion.md" "$V/"
sed "s/__SALIDA__/$2/" "$M/plantilla/render_all.sh" > "$W/render_all.sh"
sed "s/__SALIDA__/$2/" "$M/plantilla/render_vertical.sh" > "$W/render_vertical.sh"
chmod +x "$W/"render_*.sh
echo "Creado $V"
