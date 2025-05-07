'use client'

import type { FilterState } from '@/lib/sdk-types'
import { TransactionFilterBar } from '@/components/common/molecules'

type IncomesFilterBarProps = {
  filters: FilterState
  setFilters: (filters: Partial<FilterState>) => void
}

export function IncomesFilterBar({
  filters,
  setFilters,
}: IncomesFilterBarProps) {
  return <TransactionFilterBar filters={filters} onFilterChange={setFilters} />
}
