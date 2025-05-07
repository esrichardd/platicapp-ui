'use client'

import { PropsWithChildren, createContext, useContext } from 'react'
import { useTransactionsManager } from '@/lib/hooks/transactions'
import { TransactionWithRelations } from '@/lib/sdk-types'

type TransactionsContextValue = ReturnType<typeof useTransactionsManager>

interface TransactionsProviderProps extends PropsWithChildren {
  initialData: TransactionWithRelations[]
  label?: string
  type: 'INCOME' | 'EXPENSE'
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null)

export function TransactionsProvider({
  initialData,
  label,
  type,
  children,
}: TransactionsProviderProps) {
  const value = useTransactionsManager(initialData, { label, type })
  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactionsContext() {
  const ctx = useContext(TransactionsContext)
  if (!ctx)
    throw new Error(
      'useTransactionsContext debe usarse dentro de <TransactionsProvider>',
    )
  return ctx
}
