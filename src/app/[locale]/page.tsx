import PageComponent from "./json-formatter/PageComponent";
import {setRequestLocale} from 'next-intl/server';
import {getIndexLanguageText, getFooterLanguageText, getJsonEditorPageLanguageText} from "~/configs/languageText";

export default async function IndexPage({params}: {params: Promise<{locale: string}>}) {
  const {locale = ''} = await params;
  setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const jsonEditorText = await getJsonEditorPageLanguageText();
  const footerLanguageText = await getFooterLanguageText();

  return (
    <PageComponent
      locale={locale}
      indexLanguageText={indexLanguageText}
      footerLanguageText={footerLanguageText}
      jsonEditorText={jsonEditorText}
      showSeoSections
    />
  )
}
