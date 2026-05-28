// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.lptaxiheraklio.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter(page) {
        return !page.includes('privacy-policy') && !page.includes('tell-us-your-opinion');
      },
      serialize(item) {
        // Use a stable date per page instead of today's date on every build
        // This prevents Google from ignoring lastmod signals
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
    }
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
