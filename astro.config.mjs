import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
// Deploy target: GitHub Pages project page at longmao.github.io/chengsan-ai/
// Sitemap integration disabled (project page + base 模式下 reduce undefined 报错)
// 后续可手动用 GitHub Action 生成或换工具
export default defineConfig({
  site: 'https://longmao.github.io',
  base: '/chengsan-ai',
  integrations: [mdx()],
  trailingSlash: 'never',
});
