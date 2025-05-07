import { TransactionInput, TransactionWithRelations } from '@/lib/sdk-types'

type onBulkActionType = 'delete' | 'duplicate' | 'transfer'

export type TransactionTableProps = {
  transactions: TransactionWithRelations[]
  selectedItems: string[]
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
  onBulkAction?: (action: onBulkActionType, ids: string[]) => void
  onEdit?: (id: string, data: TransactionInput & { id: string }) => void
}
