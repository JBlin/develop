import { ConfigEnv, defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';

import { baseConfig } from './build/base.config';
import { testConfig } from './build/test.config';

import * as path from 'path';

export default (env: ConfigEnv): UserConfigExport =>
  defineConfig({
    ...baseConfig,
    ...testConfig,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'vitest'],
        dts: true // generate TypeScript declaration
      })
    ],
    //build 시에 모든 console.log를 제거
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
    // SCSS 전역 사용
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@import "~/assets/css/";'
    //     }
    //   }
    // }
  });
