import { HeaderLayout } from '@/components/common/layouts'
import { ExpensesTemplate } from '@/components/expenses'

export default function ExpensesPage() {
  return (
    <HeaderLayout title='Gestionar Gastos'>
      <ExpensesTemplate />
    </HeaderLayout>
  )
}
