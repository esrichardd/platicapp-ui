import { AccountsTemplate } from '@/components/accounts'
import { HeaderLayout } from '@/components/common/layouts'

export default function AccountsPage() {
  return (
    <HeaderLayout title='Cuentas'>
      <AccountsTemplate />
    </HeaderLayout>
  )
}
