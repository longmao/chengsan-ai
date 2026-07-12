# Layer 2 · Responsive Scenario 7 of 7

**Scenario**: 图片未越界（natural width 不超过容器）

**Given**
- 任何页面（首页 / 笔记页）有 `<img>` 标签

**When**
- `scripts/responsive-check.mjs --width=375 --assert-img-fit`

**Then**
- for each img:
  - `img.naturalWidth > 0` (loaded)
  - `img.getBoundingClientRect().width <= parent.getBoundingClientRect().width` (不溢出)

**Reason**
- 移动端最大破图源：无 max-width 的图片 100% 拉伸导致水平滚

**Owner**
- Layer 2 runner: `scripts/responsive-check.mjs`

**现状**: MVP 站点无图（icon/text only）— 此场景 type "no images present" 也算 pass
