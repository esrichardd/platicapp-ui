import { HeaderLayout } from '@/components/common/layouts'
import { DashboardTemplate } from '@/components/dashboard'

export default function DashboardPage() {
  return (
    <HeaderLayout title='Dashboard'>
      <DashboardTemplate />
    </HeaderLayout>
  )
}
