#!/usr/bin/env node
// scripts/seo-check.mjs · Layer 1 SEO runner
// Reads dist/**/*.html, asserts 7 SEO invariants, outputs JSON to stdout
// Companion docs: features/seo/01-..07-*.feature.md

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { glob } from 'node:fs/promises';

const DIST = 'dist';
const failed = [];
const passed = [];

const CHECKS = [
  {
    id: 'viewport-meta',
    test: html => /<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=\d+(?:\.\d+)?">/.test(html),
    message: 'viewport meta required',
  },
  {
    id: 'meta-description',
    test: html => /<meta\s+name="description"\s+content="[^"]+">/.test(html),
    message: 'meta description 50-160 chars',
  },
  {
    id: 'og-tags',
    test: html => /og:title.*og:description/s.test(html),
    message: 'og:title + og:description present',
  },
  {
    id: 'canonical',
    test: html => /<link\s+rel="canonical"\s+href="https:\/\/longmao\.github\.io\/chengsan-ai/.test(html),
    message: 'canonical URL points to longmao.github.io/chengsan-ai',
  },
  {
    id: 'lang-zh-CN',
    test: html => /<html[^>]+lang="zh-CN"/.test(html),
    message: 'html lang="zh-CN"',
  },
  {
    id: 'favicon-link',
    test: html => /<link[^>]+rel="icon"[^>]+href="\/chengsan-ai\/favicon\.svg"/.test(html),
    message: 'favicon link points to /chengsan-ai/favicon.svg',
  },
  {
    id: 'h1-unique',
    test: html => (html.match(/<h1\b/g) || []).length === 1,
    message: 'exactly one h1 per page',
  },
];

async function main() {
  const files = [];
  for await (const f of glob('**/*.html', { cwd: DIST })) {
    // Skip deck/asset HTML rendered without Layout head (harness-v2 deck etc).
    if (f.startsWith('decks/')) continue;
    const html = await readFile(join(DIST, f), 'utf8');
    files.push({ path: f, html });
  }
  for (const { path, html } of files) {
    for (const c of CHECKS) {
      (c.test(html) ? passed : failed).push({
        page: path, id: c.id, message: c.message,
      });
    }
  }
  const result = {
    layer: 'seo',
    timestamp: new Date().toISOString(),
    pages: files.length,
    passed: passed.length,
    failed: failed.length,
    details: { passed, failed },
  };
  console.log(JSON.stringify(result, null, 2));
  process.exit(failed.length ? 1 : 0);
}

main().catch(err => { console.error(err); process.exit(2); });
