// uso: node render.mjs stills 10 25.5 ...  |  node render.mjs video out.mp4 [t0] [t1]
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

// Se ejecuta desde la carpeta work/ del vídeo (los ficheros del motor están enlazados allí).
const here = process.cwd();
// Chromium de Playwright: `npx playwright-core install chromium` lo descarga; CHROME permite indicar otro ejecutable.
const exe = process.env.CHROME || `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const [mode, ...rest] = process.argv.slice(2);
const FPS = 30;

const browser = await chromium.launch({ executablePath: exe, args: ['--allow-file-access-from-files'] });
// PAGE/VW/VH permiten renderizar la maqueta vertical (vertical.html, 1080×1920) con el mismo bucle
const PAGE = process.env.PAGE || 'pildora.html', VW = +(process.env.VW || 1920), VH = +(process.env.VH || 1080);
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('PAGEERROR', e.message));
await page.goto('file://' + path.join(here, PAGE) + (process.env.SHOTS ? '?shots=' + encodeURIComponent(process.env.SHOTS) : ''));
await page.evaluate(() => window.ready);

// Si Chromium se cuelga en una captura (timeout), reintenta; a partir del segundo fallo recarga la página.
async function frame(t, type = 'jpeg') {
  for (let k = 0; ; k++) {
    try {
      await page.evaluate(t => window.seek(t), t);
      return await page.screenshot(type === 'png' ? { type: 'png' } : { type: 'jpeg', quality: 93 });
    } catch (e) {
      if (k >= 4) throw e;
      console.error(`reintento ${k + 1} en t=${t.toFixed(2)}: ${e.message.split('\n')[0]}`);
      await new Promise(r => setTimeout(r, 5000));
      if (k >= 1) { await page.reload(); await page.evaluate(() => window.ready); }
    }
  }
}

if (mode === 'stills') {
  fs.mkdirSync(path.join(here, 'stills'), { recursive: true });
  for (const s of rest) fs.writeFileSync(path.join(here, 'stills', `t${Number(s).toFixed(2)}.png`), await frame(Number(s), 'png'));
} else {
  const out = rest[0];
  const dur = await page.evaluate(() => window.DUR);
  const f0 = Math.round((rest[1] ? Number(rest[1]) : 0) * FPS);
  const f1 = Math.round((rest[2] ? Number(rest[2]) : dur) * FPS);
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-vf', 'scale=out_color_matrix=bt709', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let i = f0; i < f1; i++) {
    const buf = await frame(i / FPS);
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((i - f0) % 300 === 0) console.log(`${out}: frame ${i - f0}/${f1 - f0} · ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
}
await browser.close();
