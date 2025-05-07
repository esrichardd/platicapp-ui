import { TransactionWithRelations } from './transaction'

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
  filteredData: TransactionWithRelations[]
  paginatedData: TransactionWithRelations[]
  filters: FilterState
  setFilters: (filters: Partial<FilterState>) => void
  pagination: PaginationState & { totalPages: number }
  setPagination: (pagination: Partial<PaginationState>) => void
  selectedItems: string[]
  toggleSelectItem: (id: string) => void
  toggleSelectAll: () => void
  clearSelection: () => void
}
