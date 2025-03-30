export type Transaction = {
  id: number
  description: string
  category: string
  amount: number
  date: string
  account: string
  status: string
}

export type TransactionTableProps = {
  data: Transaction[]
  selectedItems: number[]
  onToggleSelect: (id: number) => void
  onToggleSelectAll: () => void
  onBulkAction?: (
    action: 'delete' | 'duplicate' | 'transfer',
    ids: number[],
  ) => void
}
