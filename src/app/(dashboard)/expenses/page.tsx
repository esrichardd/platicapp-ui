import { DashboardPageLayout } from '@/components/layouts'
import { ExpensesTemplate } from '@/components/templates'

export default function ExpensesPage() {
  return (
    <DashboardPageLayout title='Gestionar Gastos'>
      <ExpensesTemplate />
    </DashboardPageLayout>
  )
}
