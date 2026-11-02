# Motor de vídeo · `video/`

El motor con el que se hacen los **vídeos de formación** de Código Sin Siesta (el curso de Pi y oh my pi, el de Hermes y el
de skills). Cada vídeo es una página HTML animada que se fotografía fotograma a fotograma y se monta con la voz.

## Dónde aplica (y dónde no)

| Apartado del repo | Para qué | Cómo se consume |
|---|---|---|
| `src/` | Presentaciones, webs y el sitio de documentación: tokens CSS, chrome de slide, preset de Tailwind, componentes y slide-shells Svelte. | Paquete npm `@codigosinsiesta/theme`. |
| **`video/`** | **Vídeos**: píldoras animadas a 1920×1080, con planos que entran cuando la locución dice la palabra que los nombra. | **No va en el paquete npm** (`files` solo publica `src/`). Cada vídeo enlaza `video/` desde su carpeta `work/`. |

La identidad es la misma (sistema V4 «dark blueprint»: pizarra con rejilla, texto hueso, acento cielo, búho, Space Grotesk
e IBM Plex Sans y JetBrains Mono). Ojo: el motor lleva **sus propios tokens** en `pildora.html`, `plantillas/tpl.css` y
`figs/tema-csn.css`. No importa `src/tokens.css`, así que un cambio de paleta hay que hacerlo en los dos sitios.

## Qué hay

- `pildora.html` + `render.mjs`: la página animada (`seek(t)`) y el render con Playwright a 30 fps; ffmpeg monta la voz.
- `plantillas/`: **183 plantillas** de plano (`TPL['nombre'] = { def, html(d, H) }`) con su runtime, su CSS, el sprite de
  Heroicons y el manifiesto. Galería en `prototipo-plantillas/index.html`; guía en `plantillas/LEEME.md`.
- `figs/`: figuras isométricas construidas con un kit propio (`figs/kit/`, basado en Anatomy, MIT).
- `logos/herramientas/`: logos reales de las herramientas de las que hablan los vídeos (procedencia en su `LEEME.md`).
- `plantilla/`: esqueleto de un vídeo nuevo (`nuevo_video.sh` lo copia).
- Cadena de montaje: `alinear.py` (Whisper, palabra a palabra) → `build_timeline.py` → `build_audio.py` → `render.mjs`.
  Comprobaciones: `sync_check.mjs`, `orden_check.mjs`, `pasos_check.mjs`, `propuestas.mjs` (márgenes de 16 px, textos
  fuera de su caja, anclas desordenadas).
- `LEEME.md`: el manual completo del motor (cómo se escribe `shots.js`, tipos de plano, capturas, voz).

## Puesta en marcha

```bash
cd video
npm ci                                    # playwright-core
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node plantillas/probar.mjs timeline matrix
```

Para alinear la voz hace falta un modelo de Whisper en `modelos/` (no se versiona: pesa más de 1 GB). La locución con
Gemini TTS lee `GEMINI_API_KEY` / `GEMINI_API_KEY_FREE` **del entorno**; ninguna clave vive en el repo. La generación de
voz depende además de la skill `locucion-tts` (variable `LOCUCION_TTS`), que no forma parte de este apartado.

## Lo que no está aquí

Los guiones, capturas, voces y vídeos renderizados de cada curso viven en el repositorio de las formaciones, igual que
las utilidades personales de grabación. Este apartado es solo el motor y sus plantillas.

## Licencias de terceros

- Fuentes (`fonts/`): Space Grotesk, IBM Plex Sans y JetBrains Mono, SIL Open Font License 1.1 (textos en `fonts/OFL-*.txt`).
- Iconos (`plantillas/iconos.js`): Heroicons v2, MIT, © Tailwind Labs.
- Kit de figuras (`figs/kit/`): MIT (`figs/kit/LICENSE-anatomy`).
- Logos (`logos/herramientas/`): son marcas de sus dueños y se usan solo para identificar la herramienta de la que se
  habla. Procedencia y licencia de cada uno en `logos/herramientas/LEEME.md`.
