# Plantillas de plano (`type: 'tpl'`)

Las 80 plantillas aprobadas de la galería (`../prototipo-plantillas/`) como módulos reutilizables. Cada una es un fichero
`motor/plantillas/<nombre>.js` que registra `TPL.<nombre> = { def, html(d, H) }`. El **runtime** (`runtime.js`) la monta y la
anima con una función pura del tiempo local, así que `seek(t)` es determinista (sin transiciones CSS ni temporizadores).
`tpl.css` lleva todo el CSS, colgado de `.tpl`. `manifiesto.js` lista las 80 (orden, sección, descripción).

## Cómo se usa en un vídeo (`work/shots.js`)

```js
{ type: 'tpl', tpl: 'matrix', at: 'palabra que abre el plano',
  d: { title: 'Qué hace [[cada herramienta]]', cols: ['Skills', 'MCP'], rows: [{ name: 'Pi', cells: ['ok', 'no'] }] },
  beats: ['Pi', 'Hermes', 'Claude Code'] }      // beats[i-1] = palabra del guion con la que entra el paso i
```
`d` se mezcla en profundidad con `def` (los valores de la galería): solo hay que dar lo que cambia. Los arrays se
sustituyen enteros. Si falta `beats` (o una palabra), el paso entra repartido por la duración del plano. `sync_check.mjs`
avisa de las palabras que no estén en la locución, como con los demás tipos.

## Forma de un módulo

```js
TPL.nombre = {
  def: { kicker: '…', title: 'Texto con [[acento]]', /* TODOS los textos, números y listas visibles */ },
  html(d, H) { return `${H.HEAD(d)} …marcado con coordenadas absolutas en un lienzo de 1920×1080… `; },
};
```
Ayudas en `H`: `esc(s)` (escapa), `A(s)` (escapa y admite `[[acento]]` y `` `código` ``), `ICO('hermes', 96)` (logo real en su ficha;
nombres en `H.LOGOS`), `GLYPH('director', 56)` (glifos: `director sub tool user model file vps`, y `desktop` (un ordenador) y `terminal` para interfaces), `HEAD(d)` (eyebrow
`d.kicker` + titular `d.title`). **Todo texto que venga de `d` se pasa por `esc()` o `A()`** salvo que el campo sea marcado HTML a propósito.

## Pasos y animación (convenciones del marcado)

| Marcado | Efecto |
|---|---|
| `class="r" data-i="N"` | entra con fundido y subida en el paso N (1…) · sin `data-i` = visible desde el inicio |
| `data-off="N"` (junto a `.r`) | se va (fundido hacia arriba) cuando entra el paso N |
| `class="draw" data-i="N"` | trazo SVG (`line`, `path`…) que se dibuja; no hace falta `--len` |
| `class="bx" data-i="N"` | barra que crece desde la izquierda |
| `data-c="N"` | número que cuenta de 0 a N con el paso de su elemento (o de su ancestro con `data-i`) |
| `data-orbit="cx,cy,r,s"` | testigo SVG que gira alrededor de (cx,cy), radio r, una vuelta cada s segundos (en lugar de `animateMotion`) |

Un paso por cosa que la locución nombra (una fila, una tarjeta, un trazo). Que el número de pasos salga de los datos (una
fila por elemento de `d.rows`, etc.). No hace falta declarar `steps`: el runtime toma el mayor `data-i`.

## Reglas de portado (desde `../prototipo-plantillas/origen.html`)

1. **Mismo aspecto por defecto** que el original aprobado: mismas coordenadas, tamaños y colores. `def` = textos de la galería.
2. **Parametriza todo lo visible**: textos, cifras, listas (cada elemento repetido sale de un array) y qué elemento va iluminado
   (`lit`). Si el número de elementos cambia la maquetación, calcula las posiciones en JS (`top = 340 + i * paso`) y anota en el
   comentario de cabecera el rango que admite (p. ej. «3–5 tarjetas»).
3. Comentario de cabecera de una a tres líneas: qué es, parámetros principales y límites. Sin más prosa.
4. `<i class="ico" data-l=…>` del original → `H.ICO(nombre, tamaño)`. SMIL (`animateMotion`) → `data-orbit`. Nada de `<script>`, `document` ni `window` dentro de `html()`.
5. No uses `.chip` ni `.node` con estilos ajenos a `tpl.css`: ya se resetean dentro de `.tpl`.
6. La fuente real de la marca (Space Grotesk) es algo más ancha que la que se usó en la galería: comprueba que nada se sale de su caja.
7. Un fichero por plantilla; **no toques** `runtime.js`, `tpl.css`, `manifiesto.js` ni módulos ajenos. Si necesitas algo nuevo del
   runtime o del CSS, descríbelo en tu informe en lugar de añadirlo.

## Probar

```bash
cd motor
node plantillas/probar.mjs matrix --ref --out /tmp/p     # el original aprobado → /tmp/p/matrix.ref.png
node plantillas/probar.mjs matrix --out /tmp/p            # tu módulo, con todo ya dentro → /tmp/p/matrix.png
node plantillas/probar.mjs matrix --t 1.2 --out /tmp/p    # congelado en el segundo 1,2 (para ver la animación)
```
`probar.mjs` avisa de errores de consola, logos que no cargan y elementos fuera del lienzo. Compara tu captura con la `.ref.png`
mirando las dos imágenes. También `prototipo-plantillas/index.html?solo=matrix[&fin=1]` en el navegador.
Prueba además con datos distintos de los de `def` (más y menos elementos) para comprobar que la maquetación aguanta.

## Iconos y plantillas de los vídeos 02–19 del curso de Pi
- `iconos.js` añade los Heroicons v2 de contorno (MIT, Tailwind Labs), el juego de iconos de la marca, como glifos de
  `H.GLYPH('magnifying-glass', 56)`. Lo carga `pildora.html` junto al runtime. No incluye los nombres que ya define el sprite
  propio (`user`, etc.), para no cambiar las plantillas que los usan. Un icono solo si nombra el concepto.
- Fuera del titular, el acento `[[…]]` se ve en azul cielo y sin cursiva (`.tpl em` en `tpl.css`).
- Sección G del manifiesto: las 80 plantillas nuevas de las propuestas de los vídeos 02–19 (`curso-pi/videos/_propuestas/`).
- Sección H del manifiesto: las 21 plantillas nuevas de las propuestas de los vídeos 20–26 (mismas reglas, `_propuestas/_comun/REGLAS-20-26.md`).
- Para pasar propuestas a un vídeo: `node ../../../../motor/integrar_propuestas.mjs ../../_propuestas/<vídeo> [id …]` desde
  `work/` (deja `shots.antes-plantillas.js`), y `motor/propuestas.mjs` para probarlas antes sin tocar `shots.js`.
