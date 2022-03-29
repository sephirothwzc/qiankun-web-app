import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // css模块化 文件以.module.[css|less|scss]结尾
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: join(__dirname, 'src/'),
      },
      { find: /^~/, replacement: '' },
    ],
  },
  server: {
    port: 8099,
    open: true,
    proxy: {
      // 字符串简写方式
      '/admin-web': 'http://10.199.209.111:8088/admin-web',
    },
  },
});
