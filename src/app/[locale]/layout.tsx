import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default async function LocaleLayout(props: Props) {
  const { children, params } = props
  const { locale } = await params
  let messages

  try {
    messages = (await import(`@/lib/intl/locales/${locale}.json`)).default
  } catch (error) {
    console.error(error)
    notFound()
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
