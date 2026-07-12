# Layer 3 · Extension Scenario 1 of 7

**Scenario**: 加 blog note 不改代码 → /notes/<slug>/ 自动出现

**Given**
- 我 add a new MDX file `src/content/notes/<slug>.mdx`
- frontmatter 含 title / description / pubDate / tags

**When**
- `git add . && git commit -m "..." && git push origin main`

**Then**
- GitHub Actions 跑 astro build
- `dist/notes/<slug>/index.html` 生成
- homepage `/` note 列表自动多一行（含 title + description + date）
- /notes 索引页（待 P1 增）自动列出

**Reason**
- BDD × Loop 验证："加一篇 = 5 行 MDX + git push"；零代码改动 = 真扩展性

**Owner**
- Layer 3 runner: `scripts/extension-check.mjs`
- 验证方式：模拟加 src/content/notes/test-ext.mdx + 跑 build + 检查 dist
