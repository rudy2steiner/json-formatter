import Header from '~/components/Header';
import Footer from '~/components/Footer';
import HeadInfo from "~/components/HeadInfo";
import {localizedPath} from "~/config";

const PageComponent = ({
                         locale = '',
                         termsOfServiceLanguageText,
                         indexLanguageText,
                         footerLanguageText
                       }) => {

  return (
    <>
      <HeadInfo
        title={termsOfServiceLanguageText.title}
        description={termsOfServiceLanguageText.description}
        locale={locale}
        page={"/terms-of-service"}
      />
      <Header
        locale={locale}
        page={'terms-of-service'}
        indexLanguageText={indexLanguageText}
      />
      <main className="mx-auto w-[95%] max-w-3xl px-2 py-10 text-gray-700">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {termsOfServiceLanguageText.h1}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{termsOfServiceLanguageText.date}</p>
        <p className="mt-6 leading-7">{termsOfServiceLanguageText.desc}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{termsOfServiceLanguageText.h4_1}</h2>
        <p className="mt-2 leading-7">{termsOfServiceLanguageText.h4_1_p}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{termsOfServiceLanguageText.h4_2}</h2>
        <p className="mt-2 leading-7">{termsOfServiceLanguageText.h4_2_p}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{termsOfServiceLanguageText.h4_3}</h2>
        <p className="mt-2 leading-7">{termsOfServiceLanguageText.h4_3_p}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{termsOfServiceLanguageText.h4_4}</h2>
        <p className="mt-2 leading-7">{termsOfServiceLanguageText.h4_4_p}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{termsOfServiceLanguageText.h4_5}</h2>
        <p className="mt-2 leading-7">
          {termsOfServiceLanguageText.h4_5_p}{" "}
          <a
            href={localizedPath(locale, '/privacy-policy')}
            className="text-blue-600 hover:underline"
          >
            {termsOfServiceLanguageText.h4_5_link}
          </a>
        </p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{termsOfServiceLanguageText.h4_6}</h2>
        <p className="mt-2 leading-7">{termsOfServiceLanguageText.h4_6_p}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{termsOfServiceLanguageText.h4_7}</h2>
        <p className="mt-2 leading-7">{termsOfServiceLanguageText.h4_7_p}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{termsOfServiceLanguageText.h4_8}</h2>
        <p className="mt-2 leading-7">{termsOfServiceLanguageText.h4_8_p}</p>
      </main>
      <Footer
        locale={locale}
        description={indexLanguageText.description}
        footerText={footerLanguageText}
      />
    </>
  )
}

export default PageComponent
