import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import serveStatic from 'serve-static';

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-portfolio-media',
      configureServer(server) {
        server.middlewares.use('/previews', serveStatic(resolve('videos/.previews'), { fallthrough: false, index: false }));
        // Stream originals directly from the requested videos folder, including byte ranges.
        server.middlewares.use('/videos', serveStatic(resolve('videos'), {
          fallthrough: false,
          index: false,
        }));
      },
      configurePreviewServer(server) {
        server.middlewares.use('/previews', serveStatic(resolve(server.config.build.outDir, 'previews'), { fallthrough: false, index: false }));
        server.middlewares.use('/videos', serveStatic(resolve(server.config.build.outDir, 'videos'), {
          fallthrough: false,
          index: false,
        }));
      },
      transformIndexHtml(html) {
        const config = JSON.parse(readFileSync(resolve('src/data/portfolio.json'), 'utf8'));
        const title = escapeAttribute(config.seo.title);
        const description = escapeAttribute(config.seo.description);
        const tags = config.seo.url ? [
          { tag: 'link', attrs: { rel: 'canonical', href: config.seo.url }, injectTo: 'head' as const },
          { tag: 'meta', attrs: { property: 'og:url', content: config.seo.url }, injectTo: 'head' as const },
          { tag: 'meta', attrs: { property: 'og:image', content: new URL('social-cover.webp', config.seo.url).href }, injectTo: 'head' as const },
        ] : [];
        return {
          html: html
            .replace(/<title>.*?<\/title>/, '<title>' + title + '</title>')
            .replaceAll('__PORTFOLIO_TITLE__', title)
            .replaceAll('__PORTFOLIO_DESCRIPTION__', description),
          tags,
        };
      },
    },
  ],
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
});
