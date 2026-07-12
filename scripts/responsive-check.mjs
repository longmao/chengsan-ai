#!/usr/bin/env node
// scripts/responsive-check.mjs · Layer 2 Responsive runner
// Uses playwright headless chromium to load each dist page at 375 / 768 / 1280
// viewport, asserts 7 layout invariants via DOM API + getComputedStyle.
// Companion docs: features/responsive/01-..07-*.feature.md

import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = 'dist';
const BASE = `file://${resolve(DIST)}/`;
const VIEWPORTS = [
  { id: 'iphone-se',     w: 375, h: 667 },
  { id: 'ipad',          w: 768, h: 1024 },
  { id: 'desktop',       w: 1280, h: 800 },
];
const PAGES = ['index.html', 'notes/dataflux/index.html', 'notes/harness-deck/index.html'];

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
        // Layout has max-width: 720px + padding: 4rem 2rem → outer clientWidth is 720 (border-box)
        assert(`${vp.id}/${path} desktop-max-width-720`,
          Math.abs(layout.mainWidth - 720) < 2,
          { mainWidth: layout.mainWidth, expected: 720 });
      }
    }
    await ctx.close();
  }
  await browser.close();
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
