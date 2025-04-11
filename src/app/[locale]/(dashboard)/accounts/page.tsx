import { QueryClient } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'
import { getAllBanks } from '@/services/banks'
import { AccountsManagerProvider } from '@/lib/context/banks'
import { Providers } from '@/lib/providers'
import { AccountsTemplate } from '@/components/accounts'
import { HeaderLayout } from '@/components/common/layouts'

export default async function AccountsPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['banks'],
    queryFn: getAllBanks,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <Providers state={dehydratedState}>
      <AccountsManagerProvider>
        <HeaderLayout title='Cuentas'>
          <AccountsTemplate />
        </HeaderLayout>
      </AccountsManagerProvider>
    </Providers>
  )
}
