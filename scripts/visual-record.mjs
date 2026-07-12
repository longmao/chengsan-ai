#!/usr/bin/env node
// scripts/visual-record.mjs · playwright recordVideo · PC + H5
// Per BDD harness spec: visual verification is qualitative so we record video
// instead of pixel-inspecting. Runs both viewports; outputs .webm files
// to repo-external dir (memory `visual-record-out-of-repo`).
//
// Each viewport recording covers 5 pages (home + notes index + harness-v2 +
// landings index + dataflux) with realistic pauses so scrollbars, hover
// states, and dark-mode areas are visible.

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const VIEWPORTS = [
  { name: 'pc', width: 1280, height: 800 },
  { name: 'h5', width: 375,  height: 667 },
];
// Post-redesign routes
const PAGES = [
  '/index.html',
  '/notes/index.html',
  '/landings/index.html',
  '/notes/harness-v2/index.html',
  '/landings/dataflux/index.html',
];

// Default: store outside the repo (memory `visual-record-out-of-repo`).
// Override with env OUT_DIR.
const OUT_DIR = process.env.OUT_DIR || `${process.env.HOME}/.cache/chengsan-ai/visual-recordings`;

// Static-serve dist so absolute paths like /chengsan-ai/_astro/*.css resolve
// (file:// scheme can't resolve them on bare filesystem).
function makeServer() {
  const mime = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.svg': 'image/svg+xml', '.webm': 'video/webm', '.png': 'image/png',
    '.xml': 'application/xml',
  };
  return createServer((req, res) => {
    let p = req.url.split('?')[0];
    if (p.endsWith('/')) p += 'index.html';
    let abs;
    if (p.startsWith('/chengsan-ai/')) abs = resolve('dist' + p.slice('/chengsan-ai'.length));
    else abs = resolve('dist' + p);
    try {
      const body = readFileSync(abs);
      res.writeHead(200, { 'Content-Type': mime[abs.match(/\.[a-z]+$/)?.[0] || 'application/octet-stream'] });
      res.end(body);
    } catch (e) {
      res.writeHead(404); res.end('404');
    }
  });
}
const server = makeServer().listen(0);
const BASE = `http://localhost:${server.address().port}/chengsan-ai`;

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
const results = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    recordVideo: { dir: `${OUT_DIR}/${vp.name}`, size: { width: vp.width, height: vp.height } },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const path of PAGES) {
    await page.goto(BASE + path);
    await page.waitForTimeout(1800);
  }

  // Dark mode toggle (PC only)
  if (vp.name === 'pc') {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto(BASE + '/index.html');
    await page.waitForTimeout(1200);
    await page.emulateMedia({ colorScheme: 'light' });
  }

  await page.close();
  const videoPath = await page.video()?.path();
  results.push({ viewport: vp.name, video: videoPath });
  await context.close();
  console.log(`[${vp.name}] ${vp.width}x${vp.height} -> ${videoPath}`);
}
await browser.close();
server.close();

console.log('\n# video paths');
for (const r of results) console.log(`- ${r.viewport}: ${r.video}`);
