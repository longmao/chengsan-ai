# Layer 3 · Extension Scenario 5 of 7

**Scenario**: /notes 索引页自动列出所有 notes

**Given**
- src/content/notes/ 含 N 篇笔记
- 当前 navbar 链 `/notes` 但 src/pages/notes/index.astro 不存在 → 404

**When**
- 我新建 src/pages/notes/index.astro（getCollection）
- npm run build

**Then**
- /notes 自动列出所有 notes（含 title / description / date / 链接）
- 分页 / tag filter 可后续加

**Reason**
- 加笔记 = 自动出现在索引；零代码改动

**Owner**
- Layer 3 runner: `scripts/extension-check.mjs`

**Gap to fix**: 当前 /notes 索引页不存在（navbar 链了但 file 没建）— P0 必修
