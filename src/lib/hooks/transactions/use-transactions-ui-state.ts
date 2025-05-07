import { useState } from 'react'
import type { TransactionWithRelations } from '@/lib/sdk-types'

export function useTransactionsUiState(
  transactions: TransactionWithRelations[],
) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editTransaction, setEditTransaction] =
    useState<TransactionWithRelations | null>(null)
  const [deleteTransaction, setDeleteTransaction] =
    useState<TransactionWithRelations | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    )
  }

  const toggleSelectAll = () => {
    setSelectedItems((prev) =>
      prev.length === transactions.length ? [] : transactions.map((t) => t.id),
    )
  }

  const clearSelection = () => {
    setSelectedItems([])
  }

  return {
    isCreateOpen,
    setIsCreateOpen,
    editTransaction,
    setEditTransaction,
    deleteTransaction,
    setDeleteTransaction,
    selectedItems,
    toggleSelectItem,
    toggleSelectAll,
    clearSelection,
  }
}
