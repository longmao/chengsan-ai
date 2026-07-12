# Layer 1 · SEO Scenario 2 of 7

**Scenario**: Every page has meta description

**Given**
- dist HTML files (3 pages)

**When**
- I run `scripts/seo-check.mjs`

**Then**
- every dist/*.html contains `<meta name="description" content="...">`
- description length 50-160 chars
- exit code 0

**Reason**
- meta description 是搜索引擎摘要主要来源

**Owner**
- Layer 1 runner: `scripts/seo-check.mjs`

**Linked frontmatter**
- every MDX/Frontmatter 必须有 `description` 字段
