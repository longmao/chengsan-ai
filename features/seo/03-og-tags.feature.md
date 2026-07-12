# Layer 1 · SEO Scenario 3 of 7

**Scenario**: og:title / og:description / og:image 配置齐全

**Given**
- dist HTML files

**When**
- I run `scripts/seo-check.mjs`

**Then**
- 至少首页含 `<meta property="og:title">` / `og:description` / `og:image` / `og:url` / `og:type`
- 笔记页含同类 og 标签
- og:image 引用 favicon.svg 即可（MVP）

**Reason**
- 微信 / Twitter / LinkedIn 分享卡片依赖 og 标签；国内 H5 营销场景必须

**Owner**
- Layer 1 runner: `scripts/seo-check.mjs`

**Gap to fix**
- 当前 Layout.astro 未注入 og 标签
- 修复路径：Layout 加 og meta + twitter card
