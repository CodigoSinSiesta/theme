# Logos de herramientas ajenas

Siempre que un vídeo hable de una herramienta o empresa, se usa su **logo real**, no un dibujo nuestro.
Un logo por carpeta; el nombre del fichero es el mismo que el de la carpeta.

| Carpeta | Fichero | Origen |
|---|---|---|
| `hermes/` | `hermes.svg` (la chica de pelo negro) y `banner.png` (título pixelado) | Icono de Hermes Agent en la colección LobeHub Icons (`@lobehub/icons-static-svg`, MIT); el banner es `assets/banner.png` del repo `NousResearch/hermes-agent` |
| `claude/` | `claude.svg` (asterisco coral) | LobeHub Icons |
| `claude-code/` | `claude-code.svg` (mascota pixelada, monocromo negro) | LobeHub Icons |
| `codex/` | `codex.svg` (nube con prompt, ya viene en su propia ficha) | LobeHub Icons |
| `pi/` | `pi.svg` | `https://pi.dev/logo-auto.svg` (la web oficial de Pi) |
| `opencode/` | `opencode.svg` (monocromo negro) | LobeHub Icons |
| `gemini-cli/` | `gemini-cli.svg` (monocromo negro) | LobeHub Icons |
| `cursor/` | `cursor.svg` (el cubo, monocromo negro) | LobeHub Icons |
| `mcp/` | `mcp.svg` (monocromo negro) | LobeHub Icons |
| `anthropic/`, `openai/`, `google/`, `openrouter/`, `ollama/` | `<carpeta>.svg` (monocromos negros) | LobeHub Icons |
| `telegram/`, `discord/`, `slack/`, `whatsapp/`, `signal/`, `docker/`, `modal/`, `vercel/`, `github/`, `notion/`, `linear/` | `<carpeta>.svg` (monocromos negros) | Simple Icons (`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<nombre>.svg`, CC0) |
| `oh-my-pi/` | `oh-my-pi.svg` (ya trae su propia ficha oscura) | `https://omp.sh/favicon.svg` (la web oficial) |
| `deepseek/` | `deepseek.svg` (la ballena azul) | LobeHub Icons |
| `npm/`, `bun/`, `rust/`, `git/` | `<carpeta>.svg` (monocromos negros) | Simple Icons |

Los logos son marcas de sus dueños; aquí solo se usan para identificar la herramienta de la que se habla.
Los monocromos negros no se ven sobre el fondo pizarra: se colocan sobre una ficha hueso (`#FAF9F6`), como hace la
galería en `../../prototipo-plantillas/`. No se recolorean.
Para añadir uno nuevo: buscar primero en la web o el repo oficial; si no hay, en LobeHub Icons
(`https://unpkg.com/@lobehub/icons-static-svg@latest/icons/<nombre>.svg`). Mirar el fichero ya renderizado antes de usarlo.
