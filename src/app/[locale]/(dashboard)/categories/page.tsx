import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getAllCategories } from '@/services/categories'
import { CategoriesManagerProvider } from '@/lib/context/categories/context'
import { Providers } from '@/lib/providers'
import { CategoriesTemplate } from '@/components/categories'
import { HeaderLayout } from '@/components/common/layouts'

export default async function CategoriesPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <CategoriesManagerProvider>
      <Providers state={dehydratedState}>
        <HeaderLayout title='Categorías'>
          <CategoriesTemplate />
        </HeaderLayout>
      </Providers>
    </CategoriesManagerProvider>
  )
}
