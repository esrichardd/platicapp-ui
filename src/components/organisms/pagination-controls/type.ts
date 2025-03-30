export type PaginationControlsProps = {
  pagination: {
    currentPage: number
    totalPages: number
    entriesPerPage: number
    totalItems: number
  }
  onChangePage: (page: number) => void
  onChangeEntriesPerPage: (value: number) => void
}
