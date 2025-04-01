import { Transaction, TransactionInput } from '@/lib/sdk-types'

type onBulkActionType = 'delete' | 'duplicate' | 'transfer'

export type TransactionTableProps = {
  transactions: Transaction[]
  selectedItems: number[]
  onToggleSelect: (id: number) => void
  onToggleSelectAll: () => void
  onBulkAction?: (action: onBulkActionType, ids: number[]) => void
  onEdit?: (id: number, data: TransactionInput) => void
}
