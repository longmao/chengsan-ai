# Layer 3 · Extension Scenario 3 of 7

**Scenario**: frontmatter schema 接受扩展字段（cta / image 等）

**Given**
- src/content/config.ts 已定义 notes 与 landings 的 schema（Zod）

**When**
- 我在 MDX frontmatter 加 cta / hero_image / pricing 等额外字段
- npm run build

**Then**
- Zod 校验通过（字段在 schema 内）
- 字段值可在 .astro / .mdx 模板里 `note.data.cta` 访问

**Reason**
- 后续商业文章需要 struct 富字段（CTA 链接 / hero 图 / 价格表）；schema 缺场 = 内容无法组织

**Owner**
- Layer 3 runner: `scripts/extension-check.mjs`

**当前 src/content/config.ts schema**:
- notes: title / description / pubDate / updatedDate / externalUrl / tags
- 需扩：cta / hero_image / pricing / sections
