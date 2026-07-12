# chengsan-ai Redesign with design-taste-frontend skill

> Single-spec, ≤100 lines. Per ai-fleet CLAUDE.md §0/§2. Living artifact (verify-evidence 回写 lock-in).

## Design Read (skill §0.B)

> "Reading this as: solo founder IP portfolio (中文 editorial · 国内主战场), with **editorial calm / founder-energy** language, leaning toward **dual-layer dark calm chrome + Geist + Geist Mono + Noto Sans SC + Noto Serif SC + single orange accent (`#ff6b35` from landing.html)**."

**Dials**: VARIANCE `7` / MOTION `3` / DENSITY `4` (editorial portfolio, calm motion, medium density).

## Inventory (源 / 拷贝目标)

| Source | 路径 | 用途 | Spec |
|---|---|---|---|
| DataFlux landing | `/Users/vincent/work/ai-fleet/sources/crawler-biz/landing.html` (339 行, 7 sections) | `/landings/dataflux` (taste 重构) | body 移植 + 排除 AI tells |
| Harness v2 deck | `/Users/vincent/work/ai-fleet/verticals/crawler-biz/docs/10-harness-engineering-slides-v2.html` (540 行 deck) | `/notes/harness-v2` (用 iframe 嵌 deck self-hosted) | HTML copy + minor CSS dep audit |

## Apply 内容（行为层）

| # | 内容 | 行为 |
|---|---|---|
| 1 | `/landings/dataflux` | 7-section landing 重构 → taste-compliant 5-section (合并 WHAT→HERO 锚, 排除 3-equal cards / generic pricing table / per-row border) |
| 2 | `/notes/harness-v2` | deck 用 iframe `<iframe src="/decks/harness-v2.html">` 嵌 (deck 视觉独立 = single carrier, chrome 不冲突) |
| 3 | `/` index | editorial hero (kicker + headline + subtext + CTA) 严格 max 4 text 元素 + 暗 calm chrome |
| 4 | `/landings` / `/notes` 索引 | list all, calm hairline `divide-y`, no pill overlay |

## 设计 token (Layout 集中)

```css
--accent: #ff6b35;       /* warm orange (locked) */
--surface: #080808;     /* deep dark */
--surface-2: #111111;
--border: #1f1f1f;
--text: #e5e5e5;
--text-dim: #888;
--font-sans: 'Geist', 'Noto Sans SC', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'Noto Sans SC', monospace;
--font-serif: 'Source Serif Pro', 'Source Han Serif SC', 'Noto Serif CJK SC', Georgia, serif;
```

**Theme Lock**: dark only (skill §4.11 — ONE theme), no light mode.

## Gates (skill §14 + §14.A · mechanical)

- **em-dash ZERO** (§9.G 全页面 grep `—` 和 `–`); replace with `·` 或 `<br>` 或 line break。
- **eyebrow ≤ ceil(sections/3)** — 5 sections → 最多 1 eyebrow (hero 默认有 1)。
- **hero stack ≤ 4 text** + subtext ≤ 20 words + 无底部 tagline strip (§4.7)。
- **accent-spread ≤ 1 / section** (§14.A GATE-accent-spread)。
- **calm-ratio ≥ 50% sections** (§14.A GATE-calm-ratio): at least 2-3 sections run plain surface, no per-element glass。
- **carrier ≥ 1** (§14.A GATE-carrier): at least one section has a single visual carrier (image / data tile / quote panel) holding the energy。

## Acceptance (pre-flight)

1. `npm run build` exit 0
2. `node scripts/verify-all.mjs` ≥ 48/49 pass（1 expected self-ref fail on Scenario 7 verify.yml-already-added）
3. `node scripts/visual-record.mjs` produces 2 videos（PC + H5），读 frame 至少能识别 dual-layer 调性 (calm chrome + 单一 carrier)
4. GitHub Actions on-push: deploy + verify 均 success
5. eyemergence grep `—` returns 0 hits

## Plan / Tasks 见 `REDESIGN_TASKS.md`

跨模型 review bar (§1.3)：最后 Phase 5 切 cc-glm session 过一遍。
