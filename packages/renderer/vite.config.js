/* eslint-env node */

import {chrome} from '../../.electron-vendors.cache.json';
import vue from '@vitejs/plugin-vue';
import {renderer} from 'unplugin-auto-expose';
import {join} from 'node:path';
import {injectAppVersion} from '../../version/inject-app-version-plugin.mjs';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';

const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, '../..');

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
      '@mock': join(PACKAGE_ROOT, 'src') + '/mocks',
    },
  },
  base: '',
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  test: {
    environment: 'happy-dom',
  },
  plugins: [
    vue(),
    renderer.vite({
      preloadEntry: join(PACKAGE_ROOT, '../preload/src/index.ts'),
    }),
    injectAppVersion(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        // 需要自动导入的插件，自定义导入的API
        'vue',
        'vue-router',
      ],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    WindiCSS(),
  ],
};

export default config;
