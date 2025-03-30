type FilterState = {
  selectedCategory: string
  selectedAccount: string
  selectedStatus: string
  dateFrom?: Date
  dateTo?: Date
}

export type TransactionFilterBarProps = {
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
}
