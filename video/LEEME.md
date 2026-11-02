# Motor de vídeo · Formaciones Código Sin Siesta

Motor de las píldoras HIMYA con la identidad de Código Sin Siesta (sistema V4: fondo pizarra con rejilla, texto hueso,
acento cielo, degradado solo en el texto destacado, superficies de cristal, búho y tipografías Space Grotesk, IBM Plex
Sans y JetBrains Mono; reglas en `../identidad/BRAND.md`).

Cada vídeo es una página HTML animada (`pildora.html`, función `seek(t)`) que Playwright fotografía a 30 fps y ffmpeg
monta con la voz. Los tiempos salen de la voz real, y cada plano y cada elemento entran cuando la locución dice la
palabra que los nombra.

## Crear un vídeo
```bash
motor/nuevo_video.sh curso-pi 01-que-es-pi        # crea curso-pi/videos/01-que-es-pi/ con el motor enlazado
```
En `videos/<vídeo>/`:
- `guion.md`: guion completo; su locución se copia por párrafos a `work/segments.json` (`id` `cN-MM`, `ch`, `gap`, `text`).
- `work/capitulos.json`: títulos de capítulo (lo que va tras «:» sale en degradado). `work/tiempos.json`: duración de
  portada, tarjeta de capítulo y cierre, y `voz`: segundo de la portada en que entra la locución (3,2 por defecto; 0,9
  deja ~1 s de silencio tras la música de la intro de la serie).
- `work/pill.js`: cabecera (`hud`), comando de la portada (`cmd`), título (`big`), frase destacada (`sub`), lema (`tag`)
  y las tres frases del cierre (`end`).
- `work/shots.js`: planos por párrafo y la palabra que activa cada uno (`at`, `hlAt`, `listAt`, `flagAt`, `at` en tarjetas
  y chips, `beats` en diagramas). Tipos: `statement`, `cards`, `code` (con `window.CODE`), `diagram`, `cap`/`split`
  (capturas en `work/caps_clean/`) y `gif`. Diagramas: `steps` (pasos en fila), `git` (grafo de commits: ramas como
  carriles, etiqueta de rama que sigue a su último commit, HEAD, nodos pendientes sin commitear), `stages` (columnas de
  estado con fichas que se mueven: sin preparar → preparado → commit, o cualquier flujo de tareas), `states` (máquina de
  estados con un testigo que recorre `path`; `layout: 'ring'` para bucles), `context` (medidor de la ventana de contexto:
  tramos que entran uno a uno, umbral y compactación con `after`; `schematic: true` quita las cifras cuando solo se explica la idea) y los heredados. Ejemplos en `curso-pi/videos/00-prueba-estilo/`.
  Las tarjetas (`cards`) miden lo que mide su contenido, se iluminan al nombrarlas y admiten `vs: 'frente a'` (dos tarjetas
  enfrentadas) y `cls: 'ok' | 'bad'` por tarjeta; el `statement` lleva eyebrow con barra y punto, barra de acento y bloque centrado.
  **Plantillas (`type: 'tpl'`)**: 80 plantillas de información, logos, agentes y flujos en `plantillas/<nombre>.js`
  (galería en `prototipo-plantillas/index.html`; guía de uso y de portado en `plantillas/LEEME.md`). Un plano es
  `{ type: 'tpl', tpl: 'matrix', d: {…datos…}, beats: ['palabra del paso 1', …] }`: `d` se mezcla con los valores de la
  galería y cada paso entra en su palabra. Los logos de herramientas ajenas son los reales (`logos/herramientas/`).
  `node plantillas/probar.mjs --todas` comprueba las 80 y deja una captura de cada una.
  Los resaltados (`hl`) de las capturas se ajustan con `python3 ajustar_resaltados.py` (OCR de macOS en `ocr/`,
  se compila con `swiftc -O ocr/ocr.swift -o ocr/ocr`): mueve los bordes que cortan texto al hueco entre líneas y
  deja la hoja `resaltados.jpg` para revisarlos; con `--escribir` actualiza `shots.js`.

## Producir
```bash
cd curso-pi/videos/<vídeo>/work
node sync_check.mjs                       # palabras no encontradas o fuera de su plano
node orden_check.mjs                      # elementos nombrados antes de su plano, desordenados o sin ancla
node render.mjs stills 12 34.5            # fotogramas de prueba en stills/
GEMINI_API_KEY_FREE=… GEMINI_API_KEY=… .venv/bin/python gen_lote.py 2   # voz: primero la clave gratuita, luego la de pago
# (siempre gen_lote.py 2 para un vídeo entero: gen_voz.py y gen_batch.py, un párrafo por petición, cambian el locutor entre párrafos)
# (las claves se cargan antes con: source ~/.dotfiles/cargar-claves.sh)
python3 alinear.py                        # anclas palabra a palabra (whisper.cpp, modelos/ggml-medium.bin)
./render_all.sh                           # vídeo horizontal en ../<vídeo>.mp4 (pausas ×0,6; ya llama a alinear.py)
./render_vertical.sh                      # opcional: versión 1080×1920 con subtítulos
```
Ritmo: el `gap` de `segments.json` (1,0 entre párrafos, 1,6 al cerrar capítulo) se multiplica por 0,6, que con el
silencio propio de cada clip deja ~1,1 s entre párrafos. Sincronía: cada palabra del guion se ancla a su instante real
(`voz/<id>.palabras.json`); sin alineación, se interpola entre las pausas de la voz (±0,5 s, y hasta 4 s en preguntas).
Modelo de voz: se fija por vídeo en `work/tts_modelo` (o con `TTS_MODELO`); por defecto `gemini-3.8-flash-tts`.
`gemini-3.8-flash-lite-tts` tiene otra cuota, pero pronuncia mal los términos en inglés («oh my pi», «agents»): no se usa. Un límite por minuto se espera y reintenta;
uno diario pasa a la clave siguiente. Cuota de `gemini-3.8-flash-tts`: 10 peticiones al día en la clave gratuita y 100 en
la de pago (Tier 1); un vídeo gasta unas 35–45 contando regeneraciones.
Para regenerar clips sin que la voz cambie de timbre (repetir el modo original: lote, batch o suelto) y recortar lotes mal partidos (`recortar_lote.py`), sigue la skill `voz-codigo-sin-siesta` (`skills/voz-codigo-sin-siesta/SKILL.md`, en la raíz del proyecto).
Si la locución repite una frase, `alinear.py` lo marca con «REPETIDO, regenerar»: ese clip se rehace con `gen_voz.py <id>`. También avisa con «SOBRAN n palabras» cuando la voz dice bastantes más palabras que el guion: suele ser un lote mal partido que mete al final la primera frase del clip siguiente, y se arregla igual.
Sin `GEMINI_API_KEY` ni voz, `build_timeline.py` estima la duración de cada párrafo (2,6 palabras/s) para maquetar.

## Demos de terminal reales y capturas medidas (curso de Hermes)
- `work/demo.py` (`from demo_tmux import *`): cada paso de la demo es una función que abre tmux en el VPS (`ssh csn`), teclea,
  espera a un texto (`espera`, `espera_n`) y guarda la pantalla con colores en `caps_raw/<nombre>.ansi` (`guarda`).
  `python3 demo.py <paso>…` o `todo`.
- `render_terminal.mjs` dibuja esas pantallas como ventana de terminal (1383×868 a 2×; cada carácter en su celda, también el
  braille y los símbolos) según `terminales.json` (`from`, `rows`, `hl`, `blur`) y mide los resaltados sobre el texto.
- Documentación y paneles web: `capturar_docs.mjs` (GitHub en la etiqueta de la versión del curso) y
  `capturar_dashboard.mjs`, también con los recuadros medidos (`caps_clean/<n>.hl.json`).
- `shots.fuente.js` usa `HL('captura', 'frase')` y `python3 build_shots.py` genera `shots.js` con los recuadros reales.
  Ejemplo completo: `curso-hermes/videos/02-interfaces-y-modos/work/`.

## Notas
- Música: opcional (`work/musica.wav`). La identidad de Código Sin Siesta aún no define música ni cabecera en vídeo.
- Voz y estilo de locución: `gen_voz.py` (`es-es-training-9`, presentador didáctico). Ver `../voces/`.
- Capturas: `sanitize.py` para tapar datos sensibles antes de usarlas. La marca prohíbe fotografía e ilustración; las
  capturas de terminal o de aplicación se usan como evidencia, dentro de ventanas de cristal.
