# chengsan-ai · 杨总个人 AI Native 站

> **URL**: <https://longmao.github.io/chengsan-ai/>
> **Tech**: Astro + MDX + GitHub Actions → GitHub Pages (gh-pages)
> **Author**: 杨总（longmao）

## 内容架构

```
/                          首页 · 内容索引
/notes/dataflux            DataFlux landing page（AI 获客验证项目）
/notes/harness-deck        Harness 工程实践 deck（海信 Qoder 实证）
/notes/...                 后续笔记（小红书 / 7x24 / 雪球 / Figma）
/sitemap-index.xml         自动 sitemap
```

## 本地开发

```bash
npm install
npm run dev          # http://localhost:4321/chengsan-ai/
```

## 部署

```bash
git push origin main  # GitHub Actions 自动 build → 发到 gh-pages branch
```

## 仓库

- 主仓：<https://github.com/longmao/chengsan-ai>
- 站点 type：**project page**（URL = `longmao.github.io/chengsan-ai/`）
- 临时不要买自定义域名（杨总计划）

## 关联仓库

- `ai-fleet`：本地知识库 / 7x24 系统 / 投资 / 内容源头
- 关联内容从 `~/work/ai-fleet/docs/...` 引用
