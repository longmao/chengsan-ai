#!/usr/bin/env node
// scripts/verify-all.mjs · orchestrator · run 3 layers and aggregate report
// Convention: every layer runner prints JSON {passed, failed, details}
// We capture stdout, parse, and emit a final markdown summary.
// Spec: 21 BDD scenarios split across 3 layers (seo 7 / responsive 7 / extension 7)

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const exec = promisify(execFile);
const LAYERS = [
  { name: 'seo',        script: 'scripts/seo-check.mjs'        },
  { name: 'responsive', script: 'scripts/responsive-check.mjs'  },
  { name: 'extension',  script: 'scripts/extension-check.mjs'   },
];

async function runLayer({ name, script }) {
  if (!existsSync(script)) {
    return { layer: name, error: `script missing: ${script}`, passed: 0, failed: 0, details: { passed: [], failed: [] } };
  }
  try {
    const { stdout } = await exec('node', [script], { cwd: process.cwd() });
    return JSON.parse(stdout);
  } catch (e) {
    const out = e.stdout?.toString() || '';
    try { return JSON.parse(out); } catch { return { layer: name, error: e.message, passed: 0, failed: 0, details: { passed: [], failed: [] } }; }
  }
}

function toMd(layers, dateStr) {
  const lines = [];
  lines.push(`# chengsan-ai verify report · ${dateStr}\n`);
  let totalP = 0, totalF = 0;
  for (const l of layers) {
    lines.push(`## Layer · ${l.layer}`);
    lines.push(`- passed: ${l.passed}`);
    lines.push(`- failed: ${l.failed}`);
    totalP += l.passed; totalF += l.failed;
    if (l.error) lines.push(`- error: ${l.error}`);
    if ((l.details?.failed || []).length > 0) {
      lines.push('\n**Failed:**');
      for (const f of l.details.failed) lines.push(`- \`${f.name || f.page + '|' + f.id}\` — ${f.message || ''}`);
    }
    lines.push('');
  }
  lines.push(`---\n**Total**: ${totalP} passed / ${totalF} failed across ${layers.length} layers`);
  return lines.join('\n');
}

async function main() {
  const dateStr = new Date().toISOString().slice(0, 10);
  const outDir = `docs/verify/${dateStr}`;
  await mkdir(outDir, { recursive: true });

  const layers = await Promise.all(LAYERS.map(runLayer));
  const md = toMd(layers, dateStr);
  const json = { date: dateStr, layers };
  const mdPath = `${outDir}/report.md`;
  const jsonPath = `${outDir}/report.json`;
  await writeFile(mdPath, md);
  await writeFile(jsonPath, JSON.stringify(json, null, 2));

  console.log(md);
  console.log(`\n[verify-all] saved: ${mdPath} + ${jsonPath}`);
  // Don't fail the workflow on assert failures — let humans triage via the report.
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(2); });
