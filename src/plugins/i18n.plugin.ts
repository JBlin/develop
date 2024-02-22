/**
 * Vue i18n
 * --------------------
 * Internationalization plugin for Vue.js
 *
 * https://github.com/intlify/vue-i18n-next
 * https://vue-i18n.intlify.dev/guide
 *
 */
import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import ko from '../locales/ko';
import en from '../locales/en';

type InstallPlugin = (app: App) => void;

export const i18n = createI18n({
  locale: 'ko',
  fallbackLocale: 'ko',
  legacy: false,
  globalInjection: true,
  messages: { ko, en },
});

export const installI18n: InstallPlugin = (app) => {
  app.use(i18n);
};
