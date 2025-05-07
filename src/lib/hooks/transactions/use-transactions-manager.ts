'use client'

import type { TransactionInput } from '@/lib/sdk-types'
import { useTransactionFilters } from './use-transaction-filters'
import { useTransactionsData } from './use-transactions-data'
import { useTransactionsUiState } from './use-transactions-ui-state'

type Options = {
  type: 'INCOME' | 'EXPENSE'
}

export function useTransactionsManager({ type }: Options) {
  const {
    transactions,
    isLoadingTransactions,
    isErrorTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactionsData()

  const {
    filters,
    setFilters,
    filteredData,
    paginatedData,
    pagination,
    setPagination,
  } = useTransactionFilters(transactions)

  const uiState = useTransactionsUiState(transactions)

  const handleBulkAction = (
    action: 'delete' | 'duplicate' | 'transfer',
    ids: string[],
  ) => {
    if (action === 'delete') {
      ids.forEach((id) => deleteTransaction(id))
    }
    uiState.clearSelection()
  }

  const handleCreate = async (data: TransactionInput) => {
    await createTransaction(data)
    uiState.setIsCreateOpen(false)
  }

  const handleUpdate = async (id: string, data: TransactionInput) => {
    await updateTransaction(id, data)
    uiState.setEditTransaction(null)
  }

  const handleDelete = async () => {
    if (!uiState.deleteTransaction) return
    await deleteTransaction(uiState.deleteTransaction.id)
    uiState.setDeleteTransaction(null)
  }

  return {
    // Data
    transactions,
    isLoadingTransactions,
    isErrorTransactions,

    // Filters and pagination
    filters,
    setFilters,
    filteredData,
    paginatedData,
    pagination,
    setPagination,

    // UI State
    ...uiState,

    // Actions
    handleCreate,
    handleUpdate,
    handleDelete,
    handleBulkAction,

    // Options
    type,
  }
}
