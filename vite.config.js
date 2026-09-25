import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Vite plugin to automatically generate static subroute folders (e.g. dist/about/index.html)
 * and a dist/404.html fallback so refreshing /about on static hosting (GitHub Pages, Netlify,
 * Apache, Nginx, Vercel) never produces a 404 "Page Not Found" error!
 */
function spaStaticRoutesPlugin(routes = ['about']) {
  return {
    name: 'spa-static-routes',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');

      if (!fs.existsSync(indexHtmlPath)) return;
      const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

      // 1. Create a 404.html copy in dist
      fs.writeFileSync(path.join(distDir, '404.html'), indexHtml, 'utf-8');

      // 2. Create physical directory and index.html for each SPA route
      for (const route of routes) {
        const routeDir = path.join(distDir, route);
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml, 'utf-8');
      }
      console.log('✓ Generated static route fallbacks for: ' + routes.join(', ') + ' and 404.html');
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaStaticRoutesPlugin(['about'])],
});
