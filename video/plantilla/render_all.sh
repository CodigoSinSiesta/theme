#!/usr/bin/env bash
# Render final: timeline con la voz real → audio → vídeo → mux.  Uso: ./render_all.sh [gap_scale, 0.6 por defecto]
set -euo pipefail
cd "$(dirname "$0")"
python3 alinear.py          # anclas palabra a palabra de los clips nuevos o cambiados
python3 build_timeline.py "${1:-0.6}"
.venv/bin/python build_audio.py
node render.mjs video video_silent.mp4
ffmpeg -v error -y -i video_silent.mp4 -i audio_final.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest cuerpo.mp4
# La intro de la serie va delante (INTRO=0 para omitirla, p. ej. en el tráiler). Se reencodea para unir sin saltos.
INTRO_MP4="../../../serie/intro-serie.mp4"
if [ "${INTRO:-1}" = "1" ] && [ -f "$INTRO_MP4" ]; then
  ffmpeg -v error -y -i "$INTRO_MP4" -i cuerpo.mp4 -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
    -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 -c:a aac -b:a 192k ../__SALIDA__.mp4
else
  cp cuerpo.mp4 ../__SALIDA__.mp4
fi
ffprobe -v error -show_entries format=duration -of csv=p=0 ../__SALIDA__.mp4
