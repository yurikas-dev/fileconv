import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { AudioConverterTool } from './AudioConverterTool'

export async function AudioConverterPage() {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <AudioConverterTool />
    </NextIntlClientProvider>
  )
}
