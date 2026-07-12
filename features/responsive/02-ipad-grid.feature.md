# Layer 2 · Responsive Scenario 2 of 7

**Scenario**: iPad (768px) 笔记网格自然伸缩

**Given**
- viewport width = 768

**When**
- `scripts/responsive-check.mjs --width=768`

**Then**
- `<ul.note-list> li` 在 ≥768px 时为单列 grid（template 1fr auto）
- 在 <768px 时若 multi-column 应自然 stack
- main column max-width 720 → 居中

**Reason**
- 中屏体验 — 太挤或太空都不好

**Owner**
- Layer 2 runner: `scripts/responsive-check.mjs`

**现状**: Layout.astro `.site-main` 用 max-width 720px + margin 0 auto
