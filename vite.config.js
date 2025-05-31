import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'ensure-dist-folder',
      buildStart() {
        const distPath = path.resolve(__dirname, 'dist');
        if (!fs.existsSync(distPath)) {
          fs.mkdirSync(distPath);
        }
      },
    },
    sitemap({
      siteUrl: 'https://zikkdev.vercel.app',
      changefreq: 'daily',
      priority: 0.7,
    }),
  ],
  build: {
    sourcemap: true,
  },
});
