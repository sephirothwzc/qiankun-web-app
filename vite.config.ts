import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';
import qiankun from 'vite-plugin-qiankun';

/**
 * useDevMode 开启时与热更新插件冲突,使用变量切换
 * 因为开发环境作为子应用时与热更新插件（可能与其他修改html的插件也会存在冲突）有冲突，
 * 所以需要额外的调试配置
 * useDevMode = true 则不使用热更新插件，useDevMode = false 则能使用热更新，但无法作为子应用加载。
 */
const useDevMode = true;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), qiankun('digital-marketing', { useDevMode })],
  // 生产环境需要指定运行域名作为base
  base: 'http://localhost:8098',
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
    port: 8098,
    open: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许所有域名的脚本访问该资源
    },
    proxy: {
      // 字符串简写方式
      '/admin-web': 'http://10.199.209.111:8088/admin-web',
    },
  },
});
