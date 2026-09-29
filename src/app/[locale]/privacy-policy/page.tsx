import {setRequestLocale} from 'next-intl/server';

import PageComponent from './PageComponent';
import {getIndexLanguageText, getFooterLanguageText, getPrivacyPolicyLanguageText} from "~/configs/languageText";

export default async function PageContent({params}: {params: Promise<{locale: string}>}) {
  const {locale = ''} = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const privacyPolicyLanguageText = await getPrivacyPolicyLanguageText();
  const footerLanguageText = await getFooterLanguageText();
  return (
    <PageComponent
      locale={locale}
      privacyPolicyLanguageText={privacyPolicyLanguageText}
      footerLanguageText={footerLanguageText}
      indexLanguageText={indexLanguageText}
    >
    </PageComponent>
  )
}
