import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Deploy target: GitHub Pages project page at longmao.github.io/chengsan-ai/
export default defineConfig({
  site: 'https://longmao.github.io',
  base: '/chengsan-ai',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'never',
});
