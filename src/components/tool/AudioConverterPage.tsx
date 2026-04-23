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
      <div className="mt-14">
        <HowItWorks />
        <Faq namespace={faqNamespace} />
      </div>
    </NextIntlClientProvider>
  )
}
