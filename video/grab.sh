#!/usr/bin/env bash
# Copia la captura más reciente a caps/<nombre>.<ext>.  Uso: ./grab.sh 01-main
# CAPS_ORIGEN: patrón de las capturas de origen (por defecto, las capturas de pantalla del Escritorio de macOS).
set -euo pipefail
cd "$(dirname "$0")"; mkdir -p caps
f=$(ls -t ${CAPS_ORIGEN:-$HOME/Desktop/Captura*.png} 2>/dev/null | head -1)
[ -n "$f" ] || { echo "No hay capturas en ${CAPS_ORIGEN:-$HOME/Desktop/Captura*.png}"; exit 1; }
cp "$f" "caps/$1.${f##*.}" && echo "caps/$1.${f##*.} ← $f"
