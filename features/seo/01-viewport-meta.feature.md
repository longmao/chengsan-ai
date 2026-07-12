# Layer 1 · SEO Scenario 1 of 7

**Scenario**: Every page has viewport meta

**Given**
- dist HTML files (3 pages: index, notes/dataflux, notes/harness-deck)

**When**
- I run `scripts/seo-check.mjs`

**Then**
- every dist/*.html contains `<meta name="viewport" content="width=device-width,initial-scale=1">`
- exit code 0
- report.json shows each page with pass: [viewport_meta]

**Reason**
- viewport 是 mobile responsive + 百度 SEO 基础（没 tag 移动端会被降权）

**Owner**
- Layer 1 runner: `scripts/seo-check.mjs`
- Asset: `dist/**/*.html`

**Reference**
- BDD × Loop × Harness cycle: hypothesis → assertion → evidence → judgement
