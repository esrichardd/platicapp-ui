import { Account } from '@/lib/sdk-types'

export type AccountTableProps = {
  selectedBank: { id: number; name: string; currency: string } | null
  accounts: Account[]
  onCreateAccount: () => void
  onEditAccount?: (account: Account) => void
  onDeleteAccount?: (account: Account) => void
  onViewTransactions?: (account: Account) => void
}
