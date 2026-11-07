---
version: alpha
name: Código Sin Siesta — Frame (capa de vídeo)
description: >
  La marca traducida al fotograma. La fuente es src/BRAND.md y src/tokens.css: los átomos son los mismos
  (pizarra con rejilla, texto hueso, acento cielo, cristal, búho, Space Grotesk + IBM Plex Sans + JetBrains
  Mono). Aquí se reescribe solo la escala y la composición para 1920×1080. Vale para el motor de cursos
  (video/pildora.html) y para las piezas cortas con Hyperframes (intros, tráilers, redes, Videonoticias).
unit: el fotograma — 1920×1080 principal; 1080×1920 para redes
principle: los átomos son sagrados · la composición es libre · las cifras salen del guion

colors:
  bg: "#0f172a"
  bg-elev: "#152033"
  ink: "#FAF9F6"
  ink-2: "#cbd5e1"
  ink-3: "#94a3b8"
  accent: "#60a5fa"
  accent-2: "#93c5fd"
  electrico: "#3b82f6"
  cobalto: "#1e3a8a"
  glass: "rgba(30,58,138,0.18)"
  glass-lit: "rgba(30,58,138,0.38)"
  line: "rgba(96,165,250,0.22)"
  ok: "#34d399"
  warn: "#fbbf24"
  err: "#f87171"
  gradient-text: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)"

radii:
  panel: "22px"
  chip: "12px"
  pill: "999px"

typography:
  display:  { fontFamily: "Space Grotesk", px: 78, weight: 800, lineHeight: 1.05, tracking: "-0.02em", color: "ink" }
  title:    { fontFamily: "Space Grotesk", px: 44, weight: 700, lineHeight: 1.15, color: "ink" }
  body:     { fontFamily: "IBM Plex Sans", px: 30, min: 24, weight: 400, lineHeight: 1.35, color: "ink-2" }
  eyebrow:  { fontFamily: "JetBrains Mono", px: 24, weight: 600, tracking: "0.14em", upper: true, color: "accent" }
  label:    { fontFamily: "JetBrains Mono", px: 22, min: 22, weight: 600, tracking: "0.14em", upper: true, color: "ink-3" }
  code:     { fontFamily: "JetBrains Mono", px: 28, min: 22, weight: 500, color: "ink" }

spacing:
  margin-x: "120px"
  content-y: "300px a 1000px"
  panel-padding: "24px o más"
  text-to-border: "16px o más"

components:
  panel:
    backgroundColor: "{colors.glass}"
    border: "1.5px solid {colors.line}"
    rounded: "{radii.panel}"
    backdropFilter: "blur(10px)"
    description: "Superficie universal. Nunca opaca."
  panel-lit:
    backgroundColor: "{colors.glass-lit}"
    border: "1.5px solid {colors.accent}"
    glow: "0 0 50px rgba(96,165,250,.35)"
    description: "La parte que importa en ese momento. Una o dos por plano."
  eyebrow:
    description: "Barra horizontal + texto mono en mayúsculas + punto luminoso, encima del titular."
  highlight:
    description: "Una sola parte del titular con gradient-text. Fuera del titular, el acento es accent, sin cursiva."
---

# Código Sin Siesta — Frame (capa de vídeo)

## Overview

Vídeos didácticos para gente que programa. La imagen es técnica y sobria, con un solo gesto de color: el azul sobre
la pizarra. Si hay conflicto entre estética y comprensión, gana la comprensión.

La fuente de la marca es `src/BRAND.md`. Este fichero no la sustituye: la baja a escala de fotograma. Los valores de
`colors` los vigila `comprobar_marca.mjs`, que falla si se separan de `src/tokens.css`.

## The Frame

- Lienzo de 1920×1080, fondo pizarra con rejilla y un halo azul. Nunca blanco, nunca negro puro.
- El búho va siempre arriba a la izquierda, con el nombre de la marca y la cabecera del curso.
- Cada plano explica una sola cosa, y entra cuando la locución dice la palabra que la nombra.
- El contenido vive entre y=300 e y=1000. Por encima, eyebrow y titular.

## Colors

`ink` para lo que se lee primero, `ink-2` para el cuerpo y `ink-3` para rótulos. `accent` es el único color de énfasis.
`ok`, `warn` y `err` solo significan eso: bien, cuidado, mal. El degradado solo va en el texto destacado del titular.
El violeta nunca como relleno.

## Typography

Space Grotesk para titulares y cifras, IBM Plex Sans para el cuerpo, JetBrains Mono para eyebrows, rótulos y código.
No se mezclan los papeles. El cuerpo no baja de 24 px y las etiquetas cortas no bajan de 22 px.

## Depth & Surface

Cristal: fondo azul translúcido, borde cielo y desenfoque. Nunca paneles opacos. Las sombras van tintadas de marino,
nunca negras. Un panel encendido (`panel-lit`) es la única forma de jerarquía por luz.

## Motion

Funcional, nunca decorativa.

| Gesto | Valores |
|---|---|
| Entrada | Opacidad 0→1 en 0,35 s y subida de 34 px en 0,6 s con rebote (`eBack`, equivalente a `cubic-bezier(0.34, 1.56, 0.64, 1)`) |
| Trazo | Se dibuja en 1 s con salida suave |
| Barra | Crece en 0,8 s con salida suave |
| Contador | 1,2 s con salida suave |

La última animación de un plano termina al menos 1,5 s antes del corte. En el motor, cada paso va anclado a una
palabra de la locución.

## 3D

Solo 3D propio de la marca: el búho y figuras técnicas que expliquen un concepto, con Blender o three.js. Misma paleta,
sin materiales realistas ni entornos fotográficos. Sin imágenes generadas por IA, fotografía ni recursos descargados.

## Composition Rules

### Do

- Un concepto por plano, dibujado como mecanismo, flujo, estado o antes/después.
- Iconos Heroicons de contorno, y solo si nombran el concepto.
- Logos reales de cada herramienta, nunca dibujados.
- Dejar aire: 16 px como mínimo entre un texto y el borde de su caja.

### Don't

- Emoji decorativo, fotos, grano o texturas.
- Texto que se sale de su caja o que pisa a otro.
- Más de un degradado por titular.
- Animación que compita con la lectura.

## Numerals & Claims

Regla dura: toda cifra, nombre y comando sale de la locución, el guion o una captura. Nada de datos de relleno. Si un
dibujo necesita un ejemplo porque la locución habla en abstracto, se deja constancia junto al plano.

## Pre-Render Self-Audit

- ¿Se lee el plano entero en el tiempo que está en pantalla?
- ¿Cada paso entra con su palabra y termina antes del corte?
- ¿Hay texto a menos de 16 px del borde, que se salga o que se pise?
- ¿Toda cifra tiene origen?
- ¿`node video/comprobar_marca.mjs` sale limpio?

## Known Gaps

- El 3D de marca todavía no existe: falta el búho en 3D.
- `.card-glass` de `src/` usa borde de 1 px y el panel de vídeo 1,5 px: a 1920×1080 el de 1 px se pierde.
