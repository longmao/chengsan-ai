# Layer 3 · Extension Scenario 6 of 7

**Scenario**: /landings 索引页自动列出所有 landings

**Given**
- src/content/landings/ 含 N 个商业 landing
- 当前 /landings 路由不存在

**When**
- 新建 src/pages/landings/index.astro
- npm run build

**Then**
- /landings 列出所有 landings（含 thumbnail / title / 摘要）

**Owner**
- Layer 3 runner: `scripts/extension-check.mjs`

**Gap to fix**: 当前 /landings 完全不存在（P1 阶段）

**Reference**: 后续商业文章 / 产品页都归在这
