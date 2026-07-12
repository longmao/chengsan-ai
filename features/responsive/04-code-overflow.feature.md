# Layer 2 · Responsive Scenario 4 of 7

**Scenario**: code block 横向滚 / 不破整页

**Given**
- A note page with `<pre>` containing wide code line (e.g., minified URL)

**When**
- `scripts/responsive-check.mjs --width=375 --inject-wide-pre`

**Then**
- `pre.scrollWidth > pre.clientWidth` (横向 scroll 在 pre 内部启用)
- `document.documentElement.scrollWidth === viewport.width` (整页不滚)

**Reason**
- code/table 是 web 设计里的破图王，但 fix 模式标准：pre 用 overflow-x: auto

**现状**: global.css `pre { overflow-x: auto }` ✓
