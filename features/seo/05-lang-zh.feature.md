# Layer 1 · SEO Scenario 5 of 7

**Scenario**: html lang="zh-CN"

**Given**
- dist HTML files

**When**
- I run `scripts/seo-check.mjs`

**Then**
- every `<html>` has lang="zh-CN"
- exit code 0

**Reason**
- 百度 / Bing 港股 IP 入口判 lang;zh-CN 利于中文搜索权重

**Owner**
- Layer 1 runner: `scripts/seo-check.mjs`

**现状**: Layout.astro 已硬编 `lang="zh-CN"` ✓
