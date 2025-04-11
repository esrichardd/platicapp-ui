import { Bank } from '@/lib/sdk-types'

export type BankListProps = {
  banks: Bank[]
  selectedBankId: string | null
  onSelectBank: (id: string) => void
  onEditBank: (bank: Bank) => void
  onDeleteBank: (bank: Bank) => void
}
