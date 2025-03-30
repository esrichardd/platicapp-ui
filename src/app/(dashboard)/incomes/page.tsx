import { DashboardPageLayout } from '@/components/layouts'
import { IncomesTemplate } from '@/components/templates'

export default function IncomesPage() {
  return (
    <DashboardPageLayout title='Gestionar Ingresos'>
      <IncomesTemplate />
    </DashboardPageLayout>
  )
}
