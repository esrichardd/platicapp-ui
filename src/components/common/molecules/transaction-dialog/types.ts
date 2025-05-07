import { TransactionInput } from '@/lib/sdk-types'

export type TransactionDialogProps = {
  type: 'INCOME' | 'EXPENSE'
  mode: 'create' | 'edit'
  onSubmit: (data: TransactionInput) => void
  initialData?: TransactionInput
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
