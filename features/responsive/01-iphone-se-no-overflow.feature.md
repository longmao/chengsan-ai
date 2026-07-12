# Layer 2 · Responsive Scenario 1 of 7

**Scenario**: iPhone SE (375px width) 单栏不溢出 / 横向无 scroll

**Given**
- chengsan-ai live URL or local preview server
- viewport width = 375, height = 667 (iPhone SE 1)

**When**
- I run `scripts/responsive-check.mjs --width=375`
- Playwright launches chromium headless, sets viewport, loads page
- page.evaluate() 收集 layout 量化数据

**Then**
- `document.documentElement.scrollWidth <= 375` (no horizontal scroll)
- `window.innerWidth === 375`
- `<main>.getBoundingClientRect().width <= 375` (no element overflows)
- exit code 0

**Reason**
- mobile 用户占国内 70%+；横向滚动 = a11y fail + SEO 降权

**Owner**
- Layer 2 runner: `scripts/responsive-check.mjs`
- Tool: playwright headless chromium
