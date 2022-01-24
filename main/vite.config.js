import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import styleImport from 'vite-plugin-style-import';
import styleImport, { VantResolve } from 'vite-plugin-style-import';
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://221.215.97.45:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  plugins: [
    vue(),
    // 按需引入vant
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: 'vant',
    //       esModule: true,
    //       resolveStyle: (name) => `vant/es/${name}/style/index`,
    //     },
    //   ],
    // })
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: 'vant',
    //       esModule: true,
    //       resolveStyle: (name) => `../es/${name}/style/index`,
    //     },
    //   ],
    // })
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
  },
})
