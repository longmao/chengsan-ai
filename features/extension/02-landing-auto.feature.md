# Layer 3 · Extension Scenario 2 of 7

**Scenario**: 加商业 landing 不改代码 → /landings/<slug>/ 自动出现

**Given**
- 我 add a new MDX file `src/content/landings/<slug>.mdx`
- frontmatter 含 title / description / pubDate / tags / **cta / hero_image / pricing**

**When**
- `git push origin main`

**Then**
- `dist/landings/<slug>/index.html` 生成
- /landings 索引页（待 P1 增）自动列出
- landing 页面使用 marketing 模板（区别于 editorial template）

**Reason**
- 商业文章 / 产品 landing 是后续主要 content 类型；硬编路由 = 重复劳动

**Owner**
- Layer 3 runner: `scripts/extension-check.mjs`

**Gap to fix**:
- 当前 Astro config 没 landings collection
- 需要在 src/content/config.ts 加 landings schema
- 需要 src/pages/landings/[...slug].astro 用 marketing 模板
- 需要 src/pages/landings/index.astro
