# Layer 3 · Extension Scenario 7 of 7

**Scenario**: git push → gh-pages deploy → verify cycle

**Given**
- 主分支 main ready
- .github/workflows/deploy.yml + verify.yml 配好

**When**
- 我 `git push origin main`

**Then**
- GitHub Actions workflow deploy 跑（build → Pages deploy）
- GitHub Actions workflow verify 跑（npm ci → build → playwright install chromium → verify-all.mjs → upload report）
- 验证报告 = artifact，可下载 + 可 task summary

**Reason**
- BDD × Loop 全自动：内容 push → 部署 → 验收 → 沉淀 = 一个动作多份证据

**Owner**
- Layer 3 runner: `scripts/extension-check.mjs` + `.github/workflows/`

**当前状态**: deploy.yml 已配 + verify.yml 待写
