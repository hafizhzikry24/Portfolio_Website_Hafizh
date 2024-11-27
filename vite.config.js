import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap'; // Import plugin sitemap

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      // URL situs Anda (ganti dengan URL asli)
      siteUrl: 'https://zikkdev.vercel.app',
      // Menentukan apakah sitemap harus diperbarui setiap kali situs dibangun
      changefreq: 'daily',
      priority: 0.7,
    }),
  ],
});
