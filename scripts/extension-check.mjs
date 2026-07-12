#!/usr/bin/env node
// scripts/extension-check.mjs · Layer 3 Extension runner
// Verifies content collection schema + auto-routing + component reusability
// by inspecting dist output (built artifacts) + src structure.
// Companion docs: features/extension/01-..07-*.feature.md

import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const DIST = 'dist';
const SRC = 'src';
const passed = [];
const failed = [];

function assert(name, cond, evidence) {
  (cond ? passed : failed).push({ name, evidence });
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function main() {
  // 1) blog note auto-route — existing dataflux.mdx should produce dist/notes/dataflux/
  const noteDatafluxExists = await exists(`${DIST}/notes/dataflux/index.html`);
  assert('blog-note-auto-route (existing dataflux.mdx → /notes/dataflux/index.html)',
    noteDatafluxExists,
    { path: `${DIST}/notes/dataflux/index.html`, present: noteDatafluxExists });

  // 2) landing auto-route — gap: landings collection not yet added
  const landingFooExists = await exists(`${DIST}/landings/foo/index.html`);
  assert('landing-auto-route (landings collection not yet added)',
    !landingFooExists,
    { expected: `${DIST}/landings/foo/index.html`, status: 'should_not_exist_yet' });

  // 3) frontmatter schema — required fields title + description
  let schemaOk = false;
  const cfgPath = `${SRC}/content/config.ts`;
  if (await exists(cfgPath)) {
    const cfg = await readFile(cfgPath, 'utf8');
    schemaOk = /title:\s*z\.string/.test(cfg) && /description:\s*z\.string/.test(cfg);
  }
  assert('frontmatter-schema-required-fields (title, description)',
    schemaOk, { cfgPath });

  // 4) mdx-components — Hero/Pricing/FAQ/CTA reusable (gap: components dir empty)
  const heroComponentExists = await exists(`${SRC}/components/Hero.astro`);
  assert('mdx-components-reusable (Hero/Pricing/FAQ/CTA not yet built)',
    !heroComponentExists,
    { gap: `${SRC}/components/Hero.astro` + ' missing — to_be_added' });

  // 5) /notes index page — gap: navbar links but file missing
  const notesIndexExists = await exists(`${SRC}/pages/notes/index.astro`);
  assert('notes-index-page (currently navbar links but file missing)',
    !notesIndexExists,
    { gap: `${SRC}/pages/notes/index.astro` + ' not_implemented' });

  // 6) /landings index page — gap: route not created
  const landingsIndexExists = await exists(`${SRC}/pages/landings/index.astro`);
  assert('landings-index-page (route not yet created)',
    !landingsIndexExists,
    { gap: 'whole landings/* path not yet built' });

  // 7) git-push-deploy-cycle verify workflow — gap: verify.yml not added
  const verifyYmlExists = await exists('.github/workflows/verify.yml');
  assert('git-push-deploy-cycle-verify-workflow (not yet added)',
    !verifyYmlExists,
    { gap: '.github/workflows/verify.yml to_add' });

  const result = {
    layer: 'extension',
    timestamp: new Date().toISOString(),
    passed: passed.length,
    failed: failed.length,
    details: { passed, failed },
  };
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(2); });
