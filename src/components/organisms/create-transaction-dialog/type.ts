import { TransactionInput } from '@/lib/sdk-types'

export type CreateTransactionDialogProps = {
  type: 'income' | 'expense'
  mode: 'create' | 'edit'
  onSubmit: (data: TransactionInput) => void
  initialData?: TransactionInput
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
