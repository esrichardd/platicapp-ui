import { DashboardPageLayout } from '@/components/layouts'
import { DashboardTemplate } from '@/components/templates'

export default function DashboardPage() {
  return (
    <DashboardPageLayout title='Dashboard'>
      <DashboardTemplate />
    </DashboardPageLayout>
  )
}
