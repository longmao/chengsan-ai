# Layer 2 · Responsive Scenario 6 of 7

**Scenario**: 移动端 font-size ≥ 16px（可读性）

**Given**
- viewport width = 375

**When**
- `scripts/responsive-check.mjs --width=375 --assert-font-min=16`

**Then**
- `window.getComputedStyle(document.body).fontSize` >= 16 (px)
- 所有 `<p>` computed fontSize >= 16

**Reason**
- iOS Safari 在 <16px input 时会自动 zoom 整个页面 — 体验灾难。Apple HIG / MDN 都建议正文 ≥16。

**现状**: global.css `html { font-size: 17px; }` + body 继承 ✓

**Owner**
- Layer 2 runner: `scripts/responsive-check.mjs`
