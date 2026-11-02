#!/usr/bin/env bash
# Versión vertical 1080×1920: maqueta (vertical.html) + vídeo horizontal escalado a 1080×608 en y=560 + mismo audio.
# Requiere haber ejecutado antes render_all.sh (usa su timeline, su audio y su vídeo).
set -euo pipefail
cd "$(dirname "$0")"
H=../__SALIDA__.mp4
PAGE=vertical.html VW=1080 VH=1920 node render.mjs video vertical_base.mp4
ffmpeg -v error -y -i vertical_base.mp4 -i "$H" -filter_complex "[1:v]scale=1080:608:flags=lanczos[h];[0:v][h]overlay=0:560[v]" \
  -map "[v]" -map 1:a -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:a copy -shortest ../__SALIDA__-vertical.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 ../__SALIDA__-vertical.mp4
