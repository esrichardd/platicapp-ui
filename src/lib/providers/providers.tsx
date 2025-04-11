'use client'

import { ReactNode, useState } from 'react'
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export function Providers({
  children,
  state,
}: {
  children: ReactNode
  state?: DehydratedState
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  )
}
