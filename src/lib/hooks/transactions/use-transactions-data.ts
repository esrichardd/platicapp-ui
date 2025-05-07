import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useTransactionsQuery,
  useUpdateTransactionMutation,
} from '@/lib/queries/transactions'
import type { TransactionInput } from '@/lib/sdk-types'

export function useTransactionsData() {
  const {
    data: transactions = [],
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useTransactionsQuery()

  const createTransactionMutation = useCreateTransactionMutation()
  const updateTransactionMutation = useUpdateTransactionMutation()
  const deleteTransactionMutation = useDeleteTransactionMutation()

  const createTransaction = async (data: TransactionInput) => {
    return await createTransactionMutation.mutateAsync(data)
  }

  const updateTransaction = async (id: string, data: TransactionInput) => {
    return await updateTransactionMutation.mutateAsync({ id, data })
  }

  const deleteTransaction = async (id: string) => {
    return await deleteTransactionMutation.mutateAsync(id)
  }

  return {
    transactions,
    isLoadingTransactions,
    isErrorTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
