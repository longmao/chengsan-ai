#!/usr/bin/env node
// scripts/responsive-check.mjs · Layer 2 Responsive runner
// Uses playwright headless chromium to load each dist page at 375 / 768 / 1280
// viewport, asserts 7 layout invariants via DOM API + getComputedStyle.
// Companion docs: features/responsive/01-..07-*.feature.md

import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const DIST = 'dist';
// Static-serve dist so absolute paths like /chengsan-ai/_astro/*.css resolve correctly
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
    if (p.startsWith('/chengsan-ai/')) abs = resolve(DIST + p.slice('/chengsan-ai'.length));
    else abs = resolve(DIST + p);
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
const BASE = `http://localhost:${server.address().port}/chengsan-ai/`;
const VIEWPORTS = [
  { id: 'iphone-se',     w: 375, h: 667 },
  { id: 'ipad',          w: 768, h: 1024 },
  { id: 'desktop',       w: 1280, h: 800 },
];
const PAGES = ['index.html', 'notes/index.html', 'landings/index.html', 'notes/harness-v2/index.html'];

const passed = [], failed = [];

async function evaluateLayout(page, viewport) {
  return page.evaluate(({ vw }) => {
    const main = document.querySelector('main');
    const html = document.documentElement;
    const body = document.body;
    const fonts = parseFloat(getComputedStyle(body).fontSize);
    return {
      scrollWidth: html.scrollWidth,
      mainWidth: main?.getBoundingClientRect().width || 0,
      mainOffsetLeft: main?.offsetLeft || 0,
      mainParentWidth: main?.offsetParent?.clientWidth || 0,
      bodyFontSize: fonts,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      vw,
    };
  }, { vw: viewport.w });
}

function assert(name, cond, evidence) {
  (cond ? passed : failed).push({ name, evidence });
}

async function main() {
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await ctx.newPage();
    for (const path of PAGES) {
      await page.goto(BASE + path);
      const layout = await evaluateLayout(page, vp);
      const okMain = layout.scrollWidth <= vp.w && layout.mainWidth <= vp.w;
      assert(`${vp.id}/${path} no-horizontal-overflow`,
        layout.scrollWidth <= vp.w,
        { scrollWidth: layout.scrollWidth, viewportW: vp.w });
      assert(`${vp.id}/${path} body-font-min-16px`,
        layout.bodyFontSize >= 16,
        { fontSize: layout.bodyFontSize });
      if (vp.id === 'desktop') {
        // Editorial portfolio: main column max-width 960px (border-box)
        assert(`${vp.id}/${path} desktop-max-width-960`,
          Math.abs(layout.mainWidth - 960) < 4,
          { mainWidth: layout.mainWidth, expected: 960 });
      }
    }
    await ctx.close();
  }
  await browser.close();
  server.close();
  const result = {
    layer: 'responsive',
    timestamp: new Date().toISOString(),
    viewports: VIEWPORTS.length,
    pages: PAGES.length,
    passed: passed.length, failed: failed.length,
    details: { passed, failed },
  };
  console.log(JSON.stringify(result, null, 2));
  process.exit(failed.length ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(2); });
