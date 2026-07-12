# Layer 3 · Extension Scenario 4 of 7

**Scenario**: MDX 组件（Hero / Pricing / FAQ / CTA）可复用

**Given**
- src/components/ 含 `<Hero />` / `<Pricing />` / `<FAQ />` / `<CTA />` 等可复用 MDX 嵌入组件

**When**
- 在 `src/content/landings/foo.mdx` 引用 `<Hero />` / `<Pricing />`
- npm run build

**Then**
- 组件正确 import 并渲染
- props 传参正确（hero.title / pricing.plans / faq.q+a）
- exit code 0

**Reason**
- 商业文章 landing 高度组件化：hero / features / pricing / testimonial / FAQ / CTA 都是标配
- 组件化 = 跨 landing 复用 + 视觉一致 + 易维护

**Owner**
- Layer 3 runner: `scripts/extension-check.mjs` (检查 components dir + 引用 demo MDX 跑 build)

**Gap to fix**:
- 当前 src/components/ 空
- 需要先建 4 个 landing 必备组件（Hero / Pricing / FAQ / CTA）+ 1 个 Astro integration 声明
