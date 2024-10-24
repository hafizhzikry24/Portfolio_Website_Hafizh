import { defineConfig } from 'vite';
import imagePresets from 'vite-plugin-image-presets';

export default defineConfig({
  plugins: [
    imagePresets({
      microlink: {
        domains: ["api.microlink.io"]
      },
    }),
  ],
});
