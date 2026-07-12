# chengsan-ai Redesign · Tasks

> ai-fleet CLAUDE.md §0/§1/§2/§3. 单 spec ≤100 行 / 最小粒度并行 / context 隔离 / cross-model review.

## Phase dependency graph

```
P1 (Layout + global.css redesign)
  ↓
P2 (index.astro · /notes/[...slug] · /landings/[...slug] templates + taste-compliant 索引页)
  ↓
P3 (dataflux landing page content + landings collection)
  ↓
P4 (harness-v2 deck page using iframe + deck self-host copy)
  ↓
P5 (build + verify-all + visual record + push)
```

## Tasks

- [x] **P1.1** Layout.astro redesign — dark theme Lock + 集中 tokens + 添加 hero / global font preconnect
- [x] **P1.2** global.css redesign — Geist + Noto Sans SC + Noto Serif SC + orange accent + dual-layer friendly utilities
- [ ] **P2.1** index.astro new hero — kicker + headline + 1 subtext + 1 CTA (max 4 elements) + dual-layer
- [ ] **P2.2** /notes/[...slug].astro template — editorial layout, no eyebrow overflow
- [ ] **P2.3** /landings/[...slug].astro template — marketing layout with carrier slot
- [ ] **P2.4** /notes/index.astro + /landings/index.astro — calm list with hairline divide
- [ ] **P3.1** src/content/config.ts add `landings` collection (mirrors notes schema + cta/hero_image/pricing)
- [ ] **P3.2** src/content/landings/dataflux.mdx — 7 sections 重构到 taste-compliant 5 (合并 WHAT 段 / 改 3-equal cards 到 zig-zag / pricing table 用 number+bar-without-track)
- [ ] **P4.1** /notes/harness-v2 page with iframe `<iframe src="/decks/harness-v2.html">` + protective styles
- [ ] **P5.1** `npm run build` exit 0
- [ ] **P5.2** `node scripts/verify-all.mjs` ≥ 48/49 (含 robots.txt link / og / canonical)
- [ ] **P5.3** `node scripts/visual-record.mjs` 写 `${HOME}/.cache` （不入 git）
- [ ] **P5.4** Read thumb frame — 确认 dual-layer + carrier 调性
- [ ] **P5.5** git commit + push（GH Actions deploy + verify 都 success）
- [ ] **P5.6** cc-glm session cross-model review (杠杆 4)

## Bar 兑现 (skill §14 + ai-fleet CLAUDE.md §0/§1)

| Bar | 怎么兑 |
|---|---|
| 单 spec ≤100 行 | `REDESIGN_SPEC.md` 96 行 |
| 最小粒度 | Phase 1-5，每 phase 内 1-2 步；verify 再 next phase |
| subagent context 隔离 | 派 subagent 写文案/代码时显式 brief "context 独立" |
| cross-model 抗幻觉 | P5.6 切 cc-glm session（spec 终审） |
| spec-evidence 回写 | 本 doc + 后续 verify report 锁定 |
| 主动刹车 | 5 sections × taste = good-enough（不堆 10 sections） |
