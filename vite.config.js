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
    
        const robotsPath = path.join(distPath, 'robots.txt');
        if (!fs.existsSync(robotsPath)) {
          // Jika kamu punya versi asli di public/, salin dari sana
          const publicRobotsPath = path.resolve(__dirname, 'public', 'robots.txt');
          if (fs.existsSync(publicRobotsPath)) {
            const content = fs.readFileSync(publicRobotsPath);
            fs.writeFileSync(robotsPath, content);
          } else {
            // Atau tulis default
            fs.writeFileSync(robotsPath, 'User-agent: *\nDisallow:');
          }
        }
      },
    },
    
    sitemap({
      siteUrl: 'https://zikkdev.vercel.app',
      changefreq: 'daily',
      generateRobotsTxt: false,
      priority: 0.7,
      dynamicRoutes: [
        '/',
        '/our-services',
        '/experience'
      ]
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    historyApiFallback: true
  }
});
