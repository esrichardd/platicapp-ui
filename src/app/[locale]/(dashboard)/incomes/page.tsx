import { useTranslations } from 'next-intl'
import { TransactionsProvider } from '@/lib/context/transactions'
import { HeaderLayout } from '@/components/common/layouts'
import { IncomesTemplate } from '@/components/incomes'

export default function IncomesPage() {
  const t = useTranslations('incomes')

  return (
    <TransactionsProvider initialData={[]} label={t('label')} type='INCOME'>
      <HeaderLayout title={t('title')}>
        <IncomesTemplate />
      </HeaderLayout>
    </TransactionsProvider>
  )
}
