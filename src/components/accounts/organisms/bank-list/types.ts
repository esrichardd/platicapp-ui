import { Bank } from '@/lib/sdk-types'

export type BankListProps = {
  banks: Bank[]
  selectedBankId: number | null
  onSelectBank: (id: number) => void
  onEditBank: (bank: Bank) => void
  onDeleteBank: (bank: Bank) => void
}
