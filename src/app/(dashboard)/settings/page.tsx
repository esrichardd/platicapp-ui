import { HeaderLayout } from '@/components/common/layouts'
import { SettingsTemplate } from '@/components/settings'

export default function SettingsPage() {
  return (
    <HeaderLayout title='Configuración'>
      <SettingsTemplate />
    </HeaderLayout>
  )
}
