import { HeaderLayout } from '@/components/common/layouts'
import { IncomesTemplate } from '@/components/incomes'

export default function IncomesPage() {
  return (
    <HeaderLayout title='Gestionar Ingresos'>
      <IncomesTemplate />
    </HeaderLayout>
  )
}
