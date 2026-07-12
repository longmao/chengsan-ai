# Layer 1 · SEO Scenario 7 of 7

**Scenario**: 每页 h1 唯一（不能多 h1 也不能 h1 = h2）

**Given**
- dist HTML files

**When**
- I run `scripts/seo-check.mjs`

**Then**
- 每个页面**唯一**一个 `<h1>`
- 每个 `<h2>` 都是 h1 的 sub-section（heading 层级正确）
- exit code 0

**Reason**
- 多 h1 = 搜索引擎搞不清页面主题；层级错乱 = a11y + SEO 双输

**Owner**
- Layer 1 runner: `scripts/seo-check.mjs`

**现状**:
- index.astro 含 `<h1>chengsan.ai</h1>` ✓
- notes/[...slug].astro 含 `<h1>{note.data.title}</h1>` ✓
- hero / notes-index / contact sections 都用 `<h2>` ✓ 层级正确
