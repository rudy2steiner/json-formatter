import {getRequestConfig} from 'next-intl/server';
import {defaultLocale, locales} from '~/config';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (
      await (locale === defaultLocale
        ? // When using Turbopack, this will enable HMR for `default`
          import('../messages/zh.json')
        : import(`../messages/${locale}.json`))
    ).default
  };
});
