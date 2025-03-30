import { Transaction, TransactionInput } from '@/lib/sdk-types'

export type TransactionTableProps = {
  transactions: Transaction[]
  selectedItems: number[]
  onToggleSelect: (id: number) => void
  onToggleSelectAll: () => void
  onBulkAction?: (
    action: 'delete' | 'duplicate' | 'transfer',
    ids: number[],
  ) => void
  onEdit?: (id: number, data: TransactionInput) => void
}
