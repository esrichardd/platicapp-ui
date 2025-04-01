import { FilterState } from '@/lib/sdk-types'

export type TransactionFilterBarProps = {
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
}
