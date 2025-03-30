import { Transaction } from './transaction'

export type FilterState = {
  searchTerm: string
  selectedCategory: string
  selectedAccount: string
  selectedStatus: string
  dateFrom?: Date
  dateTo?: Date
}

export type PaginationState = {
  currentPage: number
  entriesPerPage: number
}

export type UseTransactionFiltersResult = {
  filteredData: Transaction[]
  paginatedData: Transaction[]
  filters: FilterState
  setFilters: (filters: Partial<FilterState>) => void
  pagination: PaginationState & { totalPages: number }
  setPagination: (pagination: Partial<PaginationState>) => void
  selectedItems: number[]
  toggleSelectItem: (id: number) => void
  toggleSelectAll: () => void
  clearSelection: () => void
}
