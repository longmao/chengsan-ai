# Layer 1 · SEO Scenario 6 of 7

**Scenario**: favicon 链接 + 200 OK

**Given**
- dist HTML files
- public/favicon.svg exists

**When**
- I run `scripts/seo-check.mjs` (verify link tag)
- 对 favicon URL 发 HEAD 请求 check 200

**Then**
- every page has `<link rel="icon" type="image/svg+xml" href="/chengsan-ai/favicon.svg">`
- favicon URL GET 200 + content-type: image/svg+xml
- exit code 0

**Reason**
- favicon 缺失 = 浏览 tab 空白 + 浏览器 favicon console error

**Owner**
- Layer 1 runner: `scripts/seo-check.mjs`

**现状**: Layout.astro 已 link + public/favicon.svg 存在（黑底白 "c"）
