import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  root: './',
  build: {
      outDir: 'dist',
      // rollupOptions: {
      //   output: {
      //     assetFileNames: (assetInfo) => {
      //       let extType = assetInfo.name.split('.').at(1);
      //       if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
      //         extType = 'img';
      //       }
      //       return `assets/${extType}/[name]-[hash][extname]`;
      //     },
      //   },
      // },
  },
  publicDir: 'public'
})
