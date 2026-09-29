import PageComponent from "./PageComponent";
import {setRequestLocale} from 'next-intl/server';
import {getIndexLanguageText,getFooterLanguageText, getTimestampPageLanguageText} from "~/configs/languageText";

export default async function Videos({params}: {params: Promise<{locale: string}>}) {
  const {locale = ''} = await params;
  // Enable static rendering
  setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const timestampLanguageText = await getTimestampPageLanguageText();
  const footerLanguageText = await getFooterLanguageText();
  return (
    <PageComponent
      locale={locale}
      timestampLanguageText={timestampLanguageText}
      indexLanguageText={indexLanguageText}
      footerLanguageText={footerLanguageText}
    />
  )
}
