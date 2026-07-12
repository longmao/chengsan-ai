# Layer 2 · Responsive Scenario 5 of 7

**Scenario**: dark mode auto 跟随系统

**Given**
- viewport + OS set to dark mode

**When**
- `scripts/responsive-check.mjs --emulate-media=dark`

**Then**
- `document.documentElement` 上 data-color-mode = dark (or computed `--color-bg` 近黑)
- exit code 0

**Reason**
- 暗色读者人数日益增长，prefers-color-scheme 是基础

**现状**: global.css `@media (prefers-color-scheme: dark)` 重定义颜色变量 ✓
