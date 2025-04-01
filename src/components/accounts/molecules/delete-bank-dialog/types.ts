import { Account, Bank } from '@/lib/sdk-types'

export type DeleteBankDialogProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  bank: Bank | null
  accounts: Account[]
  onDelete: () => void
}
