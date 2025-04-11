'use client'

import { createContext, useContext } from 'react'
import { useAccountsManager } from '@/lib/hooks/banks/useBanksManager'

const AccountsManagerContext = createContext<ReturnType<
  typeof useAccountsManager
> | null>(null)

export function AccountsManagerProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const value = useAccountsManager()
  return (
    <AccountsManagerContext.Provider value={value}>
      {children}
    </AccountsManagerContext.Provider>
  )
}

export function useBanksContext() {
  const context = useContext(AccountsManagerContext)
  if (!context) {
    throw new Error(
      'useAccountsManagerContext must be used within an AccountsManagerProvider',
    )
  }
  return context
}
