#!/usr/bin/env node
// scripts/visual-record.mjs · playwright recordVideo · PC + H5
// Per BDD harness spec: visual verification is qualitative so we record video
// instead of pixel-inspecting. Runs both viewports; outputs .webm files
// 杨总 can inspect via Preview.app / browser / file directly.
//
// Each viewport recording covers 3 pages (home + 2 notes) with realistic
// pauses so scrollbars, hover states, and dark-mode areas are visible.

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const VIEWPORTS = [
  { name: 'pc', width: 1280, height: 800 },
  { name: 'h5', width: 375,  height: 667 },
];
const PAGES = [
  '/index.html',
  '/notes/dataflux/index.html',
  '/notes/harness-deck/index.html',
];
// Default: store outside the repo so visual recordings never accidentally
// get pushed to git / served on gh-pages. Override with env OUT_DIR.
const OUT_DIR = process.env.OUT_DIR || `${process.env.HOME}/.cache/chengsan-ai/visual-recordings`;

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
const results = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    recordVideo: { dir: `${OUT_DIR}/${vp.name}`, size: { width: vp.width, height: vp.height } },
    deviceScaleFactor: 2, // crisper recording for retina-like display
  });
  const page = await context.newPage();

  // Tour
  for (const path of PAGES) {
    await page.goto('file://' + resolve('dist' + path));
    await page.waitForTimeout(2200);
  }
  // Dark mode test (only PC; toggle via emulateMedia)
  if (vp.name === 'pc') {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('file://' + resolve('dist/index.html'));
    await page.waitForTimeout(1500);
    await page.emulateMedia({ colorScheme: 'light' });
  }

  await page.close();
  const videoPath = await page.video()?.path();
  results.push({ viewport: vp.name, video: videoPath });
  await context.close();
  console.log(`[${vp.name}] ${vp.width}x${vp.height} → ${videoPath}`);
}
await browser.close();

console.log('\n# 视频路径');
for (const r of results) console.log(`- ${r.viewport}: ${r.video}`);
