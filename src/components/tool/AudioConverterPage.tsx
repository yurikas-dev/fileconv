import { getMessages, getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { AudioConverterTool } from './AudioConverterTool'
import { HowItWorks } from './HowItWorks'
import { Faq } from './Faq'

type Props = { faqNamespace?: string }

export async function AudioConverterPage({ faqNamespace = 'faqAudio' }: Props) {
  const [messages, t] = await Promise.all([
    getMessages(),
    getTranslations('audioHero'),
  ])

  return (
    <NextIntlClientProvider messages={messages}>
      <AudioConverterTool />
      <div className="mt-10 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
        <h2 className="text-base font-semibold text-gray-800 mb-2">{t('noteTitle')}</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{t('noteBody')}</p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5">{t('usageTitle')}</h2>
        <ol className="space-y-3">
          {(t.raw('usageSteps') as string[]).map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-5">{t('useCasesTitle')}</h2>
        <ul className="space-y-2">
          {(t.raw('useCases') as string[]).map((useCase, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-brand-500 font-bold flex-shrink-0 mt-0.5">✓</span>
              <span className="leading-relaxed">{useCase}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14">
        <HowItWorks />
        <Faq namespace={faqNamespace} />
      </div>
    </NextIntlClientProvider>
  )
}
