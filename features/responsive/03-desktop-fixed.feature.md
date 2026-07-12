# Layer 2 · Responsive Scenario 3 of 7

**Scenario**: Desktop (1280px) max-width 720 主栏 + 居中

**Given**
- viewport width = 1280

**When**
- `scripts/responsive-check.mjs --width=1280`

**Then**
- `<main>.getBoundingClientRect().width` 等于 min(viewport-4rem, 720)
- `<main>.offsetLeft === <main>.offsetParent.clientWidth / 2 - <main>.width / 2` (居中)

**Reason**
- 阅读体验：过宽的 column 阅读时眼睛回扫距离长 = 易疲劳。720px = 65-75 字宽，optimal。

**Owner**
- Layer 2 runner: `scripts/responsive-check.mjs`
