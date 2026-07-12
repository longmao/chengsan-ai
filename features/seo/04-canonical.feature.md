# Layer 1 · SEO Scenario 4 of 7

**Scenario**: canonical URL 正确（针对 project page）

**Given**
- dist HTML files

**When**
- I run `scripts/seo-check.mjs`

**Then**
- every page has `<link rel="canonical" href="https://longmao.github.io/chengsan-ai/<page-path>">`
- canonical 与访问 URL 一致

**Reason**
- 防止搜索引擎把 `chengsan-ai/` 和 `chengsan-ai/index.html` 当重复内容

**Owner**
- Layer 1 runner: `scripts/seo-check.mjs`

**Gap to fix**
- 当前 Layout.astro 未注入 canonical（每个页面 hardcode URL 太脆）
- 用 Layout props 传 URL 给 Astro 自动 compute
