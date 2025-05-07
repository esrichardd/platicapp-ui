'use client'

import type {
  TransactionInput,
  TransactionWithRelations,
} from '@/lib/sdk-types'
import { TransactionTable } from '@/components/common/organisms'

type IncomesTableSectionProps = {
  transactions: TransactionWithRelations[]
  selectedItems: string[]
  toggleSelectItem: (id: string) => void
  toggleSelectAll: () => void
  onEdit: (id: string, data: TransactionInput & { id: string }) => void
  onBulkAction: (
    action: 'delete' | 'duplicate' | 'transfer',
    ids: string[],
  ) => void
}

export function IncomesTableSection({
  transactions,
  selectedItems,
  toggleSelectItem,
  toggleSelectAll,
  onEdit,
  onBulkAction,
}: IncomesTableSectionProps) {
  return (
    <TransactionTable
      transactions={transactions}
      selectedItems={selectedItems}
      onToggleSelect={toggleSelectItem}
      onToggleSelectAll={toggleSelectAll}
      onEdit={onEdit}
      onBulkAction={onBulkAction}
    />
  )
}
