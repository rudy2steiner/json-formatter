import {setRequestLocale} from 'next-intl/server';

import PageComponent from './PageComponent';
import {getIndexLanguageText,getFooterLanguageText, getTermsOfServiceLanguageText} from "~/configs/languageText";

export default async function PageContent({params}: {params: Promise<{locale: string}>}) {
  const {locale = ''} = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
    const footerLanguageText = await getFooterLanguageText();

  const termsOfServiceLanguageText = await getTermsOfServiceLanguageText();

  return (
    <PageComponent
      locale={locale}
      termsOfServiceLanguageText={termsOfServiceLanguageText}
      footerLanguageText={footerLanguageText}
      indexLanguageText={indexLanguageText}
    >
    </PageComponent>
  )

}
