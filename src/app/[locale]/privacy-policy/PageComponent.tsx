import Header from '~/components/Header';
import Footer from '~/components/Footer';
import HeadInfo from "~/components/HeadInfo";

const PageComponent = ({
                         locale = '',
                         privacyPolicyLanguageText,
                         footerLanguageText,
                         indexLanguageText,
                       }) => {

  return (
    <>
      <HeadInfo
        title={privacyPolicyLanguageText.title}
        description={privacyPolicyLanguageText.description}
        locale={locale}
        page={"/privacy-policy"}
      />
      <Header
        locale={locale}
        page={'privacy-policy'}
        indexLanguageText={indexLanguageText}
      />
      <main className="mx-auto w-[95%] max-w-3xl px-2 py-10 text-gray-700">
        <h1 className="text-3xl font-extrabold text-gray-900">
          {privacyPolicyLanguageText.h1}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{privacyPolicyLanguageText.date}</p>
        <p className="mt-6 leading-7">{privacyPolicyLanguageText.desc}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{privacyPolicyLanguageText.h4_1}</h2>
        <p className="mt-2 leading-7">{privacyPolicyLanguageText.h4_1_pa}</p>
        <p className="mt-2 leading-7">{privacyPolicyLanguageText.h4_1_pb}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{privacyPolicyLanguageText.h4_2}</h2>
        <p className="mt-2 leading-7">{privacyPolicyLanguageText.h4_2_p}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{privacyPolicyLanguageText.h4_3}</h2>
        <p className="mt-2 leading-7">{privacyPolicyLanguageText.h4_3_p}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{privacyPolicyLanguageText.h4_4}</h2>
        <p className="mt-2 leading-7">{privacyPolicyLanguageText.h4_4_p}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{privacyPolicyLanguageText.h4_5}</h2>
        <p className="mt-2 leading-7">{privacyPolicyLanguageText.h4_5_p}</p>
        <h2 className="mt-8 text-lg font-bold text-gray-900">{privacyPolicyLanguageText.h4_6}</h2>
        <p className="mt-2 leading-7">{privacyPolicyLanguageText.h4_6_p}</p>
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
