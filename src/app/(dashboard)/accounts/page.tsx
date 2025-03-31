import { DashboardPageLayout } from '@/components/layouts'
import { AccountsTemplate } from '@/components/templates'

export default function AccountsPage() {
  return (
    <DashboardPageLayout title='Cuentas'>
      <AccountsTemplate />
    </DashboardPageLayout>
  )
}
