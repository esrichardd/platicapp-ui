import type { Account } from '@/lib/sdk-types/account'
import type { Bank } from '@/lib/sdk-types/bank'

export type AccountTableProps = {
  selectedBank: Bank | null
  accounts: Account[]
  onCreateAccount: () => void
  onEditAccount?: (account: Account) => void
  onDeleteAccount?: (account: Account) => void
  onViewTransactions?: (account: Account) => void
}
