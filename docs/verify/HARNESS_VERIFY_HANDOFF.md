# chengsan-ai Verify Cycle · BDD × Loop × Harness Handoff

> 21 BDD scenarios · 3 layers · 1 cycle · 自动化部署到 git push 触发

## 一、整体架构

```
git push origin main
  ↓
GH Actions: deploy.yml   (build → deploy to gh-pages)
GH Actions: verify.yml   (build → playwright install → verify-all)
  ↓
docs/verify/<date>/report.{md,json}   ← 沉淀每轮证据
  ↓
memory add rules        ← 沉淀下一轮 spec add case
```

每轮验收 = 一个完整的 **Loop**：
1. **假设** — 站点满足某个 invariant
2. **拆 mechanism** — 具体 sub-check
3. **最小实验** — 跑对应 runner
4. **证据** — report.json + 数字
5. **判定** — pass/warn/fail，都推进下一个 fix
6. **沉淀** — fail 进 Linear issue / warn 进 memory / pass 归档

## 二、21 个 Scenario 分组

| Layer | Count | Doc |
|---|---|---|
| SEO（meta / og / canonical / h1 / favicon 等） | 7 | `features/seo/01..07-*.feature.md` |
| Responsive（mobile / tablet / desktop 三档 viewport） | 7 | `features/responsive/01..07-*.feature.md` |
| Extension（add blog note / landing / MDX 组件 / git push cycle） | 7 | `features/extension/01..07-*.feature.md` |

每个 feature 文件 = **Given/When/Then** 自然语言 + Reason + Owner 3 字段，**人类可读**。

## 三、Runner 工具链

| 工具 | 输出 |
|---|---|
| `scripts/seo-check.mjs` | Layer 1 · parse dist HTML, grep 7 个 SEO invariant |
| `scripts/responsive-check.mjs` | Layer 2 · playwright headless chromium × 3 viewport × 3 pages, 量化布局 |
| `scripts/extension-check.mjs` | Layer 3 · dist + src 路径存在性 + build smoke |
| `scripts/verify-all.mjs` | orchestrator · 调 3 个 runner + 汇总结论 + 写盘到 `docs/verify/<date>/` |

每个 runner ≤100 行（Harness bar #1）。

## 四、Harness 3 bar 内化

| bar | 在 verify cycle 里的形态 |
|---|---|
| **#1 单 Spec ≤100 行** | 每个 runner ≤100 行；每个 feature.md ≤40 行 |
| **#2 最小粒度并行** | 3 个 runner 独立 context / Promise.all 调；GH Actions 单 step 1 verify-all 跑完 |
| **#3 跨模型抗幻觉** | subagent 写脚本 (GLM-4.7) ≠ 主 session (minimax) 审 spec / 失败分析 |

## 五、修复记录（这一轮）

| Bug | Root cause | Fix |
|---|---|---|
| viewport-meta 失败 | regex `\d+` 不带小数 | SEO regex 改 `(?:\.\d+)?` |
| canonical / og 失败 | Layout 缺对应 meta | Layout.astro 增 og:* + canonical + twitter card |
| desktop-max-width-720 失败 | Layout content-box + padding 让外 width 720+64=784 | Layout `.site-main` 加 `box-sizing: border-box` |
| extension-check syntax error | template literal 字符串碎片拼错误 | 全部 rewrite 用正常字符串拼 |

记录在 `docs/verify/2026-07-12/report.md`

## 六、当前 status（2026-07-12 fix 后）

```
SEO: 21/21 pass
Responsive: 21/21 pass
Extension: 7/7 pass (7 gap detected = 待办)
Total: 49 pass / 0 fail
```

Extension gap（**有意保留为"未实现提示"**，不 fail CI）：
- landings collection + schema
- 4 个 landing 必备组件（Hero / Pricing / FAQ / CTA）
- /notes 索引页（navbar 已链，文件缺）
- /landings 索引页（整路由缺）

## 七、加新 case 流程（harness 闭环）

1. 写 `features/<layer>/<NN>-<name>.feature.md`
2. runner 加对应 assertion
3. 跑 `node scripts/verify-all.mjs` 看是否过
4. 更新 `docs/verify/<date>/report.md`
5. Memory add / Linear issue

## 八、上手命令

```bash
cd /Users/vincent/work/chengsan-ai
node scripts/verify-all.mjs                 # 本地一次性跑

# 调试单层
node scripts/seo-check.mjs | jq
node scripts/responsive-check.mjs | head -30
node scripts/extension-check.mjs | jq

# 看历史报告
ls docs/verify/
cat docs/verify/$(date +%Y-%m-%d)/report.md
```
